const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'pureload.myshopify.com';
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

// ─── Selling Plan IDs (Shopify Subscriptions app) ──────────────────────────
// Maps interval-in-days → Shopify Selling Plan ID
// These IDs come from Apps → Subscriptions → Plans → click each plan.
// Update these if you ever recreate the plans.
export const SELLING_PLAN_IDS: Record<number, string> = {
  30: 'gid://shopify/SellingPlan/9824600350',  // 30-day, 15% off
  60: 'gid://shopify/SellingPlan/9824633118',  // 60-day, 12% off
  90: 'gid://shopify/SellingPlan/9824665886',  // 90-day, 10% off
};

/** Convert a numeric ID or raw gid:// to the canonical gid:// form for Shopify. */
function toShopifyGid(prefix: 'ProductVariant' | 'SellingPlan', id: string): string {
  if (id.startsWith('gid://')) return id;
  return `gid://shopify/${prefix}/${id}`;
}

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

// ─── Cart-based checkout (with selling plan support) ───────────────────────
// We use Shopify's modern Cart API instead of the deprecated Checkout API
// because Cart API supports sellingPlanId on line items, which is required
// for subscription pricing to apply at checkout.

export interface CheckoutLineItem {
  variantId: string;
  quantity: number;
  /** Optional Shopify Selling Plan ID. When set, the line item subscribes. */
  sellingPlanId?: string;
}

export async function createCheckout(lineItems: CheckoutLineItem[]) {
  const formattedLines = lineItems.map(item => ({
    merchandiseId: toShopifyGid('ProductVariant', item.variantId),
    quantity: item.quantity,
    ...(item.sellingPlanId
      ? { sellingPlanId: toShopifyGid('SellingPlan', item.sellingPlanId) }
      : {}),
  }));

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      input: { lines: formattedLines },
    });

    const errors = data?.data?.cartCreate?.userErrors;
    if (errors?.length) {
      console.error('Cart create errors:', errors);
    }

    const url = data?.data?.cartCreate?.cart?.checkoutUrl;
    if (url) return url;

    // Fallback: direct cart URL (no selling plan support but works without API token)
    return createDirectCheckoutUrl(lineItems);
  } catch (err) {
    console.error('Cart create failed:', err);
    return createDirectCheckoutUrl(lineItems);
  }
}

function createDirectCheckoutUrl(lineItems: CheckoutLineItem[]) {
  // Two-stage approach for the URL fallback:
  //
  // 1. If we only have one line item, use the /cart/add endpoint with form
  //    parameters. This is Shopify's documented way to add a single item with
  //    a selling plan via URL — it handles the plan attachment server-side
  //    rather than as a hint, so the discount actually applies at checkout.
  //
  // 2. For multi-item carts (rare in our flow), fall back to /cart/{permalink}
  //    syntax. Selling plans are best-effort here and may not persist.
  //
  // Note: For full reliability (especially mixed subscription+one-time carts),
  // configure VITE_SHOPIFY_STOREFRONT_TOKEN so the modern Cart API runs.

  if (lineItems.length === 1) {
    const item = lineItems[0];
    const variantId = item.variantId.replace('gid://shopify/ProductVariant/', '');
    const sellingPlanId = item.sellingPlanId?.replace('gid://shopify/SellingPlan/', '');

    const params = new URLSearchParams();
    params.set('id', variantId);
    params.set('quantity', String(item.quantity));
    if (sellingPlanId) {
      params.set('selling_plan', sellingPlanId);
    }
    // /cart/add immediately processes the line item server-side then redirects
    // to /cart, which means the selling plan is committed before the redirect.
    return `https://${SHOPIFY_DOMAIN}/cart/add?${params.toString()}&return_to=/checkout`;
  }

  // Multi-item permalink (selling plans best-effort)
  const items = lineItems.map(item => {
    const variantId = item.variantId.replace('gid://shopify/ProductVariant/', '');
    return `${variantId}:${item.quantity}`;
  }).join(',');

  const sellingPlans = Array.from(new Set(
    lineItems
      .map(i => i.sellingPlanId?.replace('gid://shopify/SellingPlan/', ''))
      .filter(Boolean)
  ));

  let url = `https://${SHOPIFY_DOMAIN}/cart/${items}`;
  if (sellingPlans.length === 1) {
    url += `?selling_plan=${sellingPlans[0]}`;
  } else if (sellingPlans.length > 1) {
    console.warn(
      'Multiple subscription intervals in one cart cannot be applied via URL ' +
      'fallback. Configure VITE_SHOPIFY_STOREFRONT_TOKEN for full support.'
    );
  }
  return url;
}

// ─── Customer auth (unchanged) ─────────────────────────────────────────────

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

// ─── Subscription contract management (customer-facing) ────────────────────

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
// Add to shopify.ts

export interface VariantInventory {
  variantId: string;
  quantity: number;
}

export async function fetchInventoryByVariantIds(
  variantIds: string[]
): Promise<Record<string, number>> {
  const query = `
    query getInventory($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on ProductVariant {
          id
          quantityAvailable
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch(query, { ids: variantIds });
    const result: Record<string, number> = {};
    for (const node of data?.data?.nodes ?? []) {
      if (node?.id && node.quantityAvailable != null) {
        result[node.id] = node.quantityAvailable;
      }
    }
    return result;
  } catch (err) {
    console.error('Failed to fetch inventory:', err);
    return {};
  }
}

export { SHOPIFY_DOMAIN };