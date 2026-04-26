const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'pureload.myshopify.com';
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export async function createCheckout(lineItems: { variantId: string; quantity: number }[]) {
  // Format variant IDs for Shopify
  const formattedItems = lineItems.map(item => ({
    variantId: item.variantId.startsWith('gid://') 
      ? item.variantId 
      : `gid://shopify/ProductVariant/${item.variantId}`,
    quantity: item.quantity,
  }));

  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      input: { lineItems: formattedItems },
    });
    
    if (data?.data?.checkoutCreate?.checkout?.webUrl) {
      return data.data.checkoutCreate.checkout.webUrl;
    }
    
    // Fallback: direct URL checkout
    return createDirectCheckoutUrl(lineItems);
  } catch {
    return createDirectCheckoutUrl(lineItems);
  }
}

function createDirectCheckoutUrl(lineItems: { variantId: string; quantity: number }[]) {
  const items = lineItems.map(item => {
    const id = item.variantId.replace('gid://shopify/ProductVariant/', '');
    return `${id}:${item.quantity}`;
  }).join(',');
  
  return `https://${SHOPIFY_DOMAIN}/cart/${items}`;
}

export async function createCustomerAccount(email: string, password: string, firstName: string, lastName: string) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      input: { email, password, firstName, lastName },
    });
    return data?.data?.customerCreate;
  } catch (error) {
    console.error('Failed to create customer:', error);
    return null;
  }
}

export async function customerLogin(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      input: { email, password },
    });
    return data?.data?.customerAccessTokenCreate;
  } catch (error) {
    console.error('Failed to login:', error);
    return null;
  }
}

export async function getCustomerOrders(accessToken: string) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              name
              processedAt
              financialStatus
              fulfillmentStatus
              totalPriceV2 {
                amount
                currencyCode
              }
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch(query, { customerAccessToken: accessToken });
    return data?.data?.customer;
  } catch (error) {
    console.error('Failed to fetch customer:', error);
    return null;
  }
}

export async function customerLogout(accessToken: string) {
  const query = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors {
          field
          message
        }
      }
    }
  `;
  try {
    await shopifyFetch(query, { customerAccessToken: accessToken });
    return true;
  } catch {
    return false;
  }
}

// ─── Subscription helpers ───────────────────────────────────────────────────
// Shopify's native Subscriptions app exposes subscription contracts via the
// Storefront API under the customer object. Customers can pause/resume their
// own contracts using the customerSubscriptionContractPause /
// customerSubscriptionContractResume mutations (available since API 2022-10).

export interface SubscriptionContract {
  id: string;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'FAILED' | 'EXPIRED';
  nextBillingDate: string | null;
  lines: { edges: { node: { title: string; quantity: number; currentPrice: { amount: string; currencyCode: string } } }[] };
}

export async function getCustomerSubscriptions(accessToken: string): Promise<SubscriptionContract[]> {
  const query = `
    query getSubscriptions($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        subscriptionContracts(first: 10) {
          edges {
            node {
              id
              status
              nextBillingDate
              lines(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    currentPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch(query, { customerAccessToken: accessToken });
    const edges = data?.data?.customer?.subscriptionContracts?.edges || [];
    return edges.map((e: { node: SubscriptionContract }) => e.node);
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error);
    return [];
  }
}

export async function pauseSubscription(accessToken: string, contractId: string): Promise<boolean> {
  const query = `
    mutation pauseSubscription($customerAccessToken: String!, $subscriptionContractId: ID!) {
      customerSubscriptionContractPause(
        customerAccessToken: $customerAccessToken
        subscriptionContractId: $subscriptionContractId
      ) {
        contract {
          id
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch(query, { customerAccessToken: accessToken, subscriptionContractId: contractId });
    const errors = data?.data?.customerSubscriptionContractPause?.userErrors;
    if (errors?.length) {
      console.error('Pause errors:', errors);
      return false;
    }
    return data?.data?.customerSubscriptionContractPause?.contract?.status === 'PAUSED';
  } catch (error) {
    console.error('Failed to pause subscription:', error);
    return false;
  }
}

export async function resumeSubscription(accessToken: string, contractId: string): Promise<boolean> {
  const query = `
    mutation resumeSubscription($customerAccessToken: String!, $subscriptionContractId: ID!) {
      customerSubscriptionContractResume(
        customerAccessToken: $customerAccessToken
        subscriptionContractId: $subscriptionContractId
      ) {
        contract {
          id
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch(query, { customerAccessToken: accessToken, subscriptionContractId: contractId });
    const errors = data?.data?.customerSubscriptionContractResume?.userErrors;
    if (errors?.length) {
      console.error('Resume errors:', errors);
      return false;
    }
    return data?.data?.customerSubscriptionContractResume?.contract?.status === 'ACTIVE';
  } catch (error) {
    console.error('Failed to resume subscription:', error);
    return false;
  }
}

export { SHOPIFY_DOMAIN };
