import pureloadLemonFront from '@/assets/pureload-lemon-front.png';
import pureloadLemonBack from '@/assets/pureload-lemon-back.png';
import pureloadLemonNutrition from '@/assets/lemmon-gummies-2.png';
import pureloadMaleFront from '@/assets/pureload-male-front.png';
import pureloadMaleBack from '@/assets/pureload-male-back.png';
import pureloadMaleNutrition from '@/assets/male-enhancement-2.png';
import pureloadWomenFront from '@/assets/pureload-women-front.png';
import pureloadWomenBack from '@/assets/pureload-women-back.png';
import pureloadWomenNutrition from '@/assets/women-support-2.png';

// Ingredient images - Creatine Gummies
import ingredientCreatineGummy from '@/assets/CreatineGummies/Creatine_1.jpg';
import ingredientLemonFlavor from '@/assets/CreatineGummies/Creatine_2.jpg';
import ingredientCalciumLactate from '@/assets/CreatineGummies/Creatine_3.jpg';

// Ingredient images - Male Enhancement
import ingredientTongkatAli from '@/assets/MaleEnhancement/Male_1.jpg';
import ingredientMaca from '@/assets/MaleEnhancement/Male_2.jpg';
import ingredientLArginine from '@/assets/MaleEnhancement/Male_3.jpg';
import ingredientGinseng from '@/assets/MaleEnhancement/Male_4.jpg';
import ingredientZincMale from '@/assets/MaleEnhancement/Male_1.jpg';
import ingredientVitaminDMale from '@/assets/MaleEnhancement/Male_2.jpg';
import ingredientVitaminB12Male from '@/assets/MaleEnhancement/Male_3.jpg';

// Ingredient images - Women's Gummies
import ingredientCranberry from '@/assets/WomensGummies/WomensGummies_1.jpg';
import ingredientDongQuai from '@/assets/WomensGummies/WomensGummies_2.jpg';
import ingredientChasteberry from '@/assets/WomensGummies/WomensGummies_3.jpg';
import ingredientSodiumCitrate from '@/assets/WomensGummies/WomensGummies_4.jpg';

// Ingredient images - Pre-Workout
import ingredientCitrullineMalate from '@/assets/PreworkOut/PreworkOut_1.png';
import ingredientBetaAlanine from '@/assets/PreworkOut/PreworkOut_2.png';
import ingredientCaffeine from '@/assets/PreworkOut/PreworkOut_3.png';
import ingredientLTyrosine from '@/assets/PreworkOut/PreworkOut_4.png';
import ingredientBCAA from '@/assets/PreworkOut/PreworkOut_5.png';

// Ingredient images - Multi Gummies
import ingredientPomegranate from '@/assets/MutiGummies/MutiGummies_1.png';
import ingredientVitaminB12Multi from '@/assets/MutiGummies/MutiGummies_2.png';
import ingredientFolate from '@/assets/MutiGummies/MutiGummies_3.png';
import ingredientVitaminCMulti from '@/assets/MutiGummies/MutiGummies_4.png';
import ingredientZincMulti from '@/assets/MutiGummies/MutiGummies_5.png';

// Ingredient images - Sleep Gummies
import ingredientPassiflora from '@/assets/SleepGummies/SleepGummies_1.png';
import ingredientMelatonin from '@/assets/SleepGummies/SleepGummies_2.png';
import ingredientVitaminB6 from '@/assets/SleepGummies/SleepGummies_3.png';

// Ingredient images - Ashwagandha Gummies
import ingredientAshwa1 from '@/assets/AshwagandhaGummies/Ashwagandha_1.png';
import ingredientAshwa2 from '@/assets/AshwagandhaGummies/Ashwagandha_2.png';

// Ingredient images - Debloat ACV Gummies
import ingredientDebloat1 from '@/assets/DebloatGummies/Debloat_1.png';
import ingredientDebloat2 from '@/assets/DebloatGummies/Debloat_2.png';
import ingredientDebloat3 from '@/assets/DebloatGummies/Debloat_3.png';
import ingredientDebloat4 from '@/assets/DebloatGummies/Debloat_4.png';
import ingredientDebloat5 from '@/assets/DebloatGummies/Debloat_5.png';

// New product images (Pre-workout, Multivitamin, Sleep, Ashwagandha, Debloat)
import pureloadPreworkoutFront from '@/assets/pureload-preworkout-front.png';
import pureloadPreworkoutLeft from '@/assets/pureload-preworkout-left.png';
import pureloadPreworkoutRight from '@/assets/pureload-preworkout-right.png';
import pureloadMultiFront from '@/assets/pureload-multi-front.png';
import pureloadMultiLeft from '@/assets/pureload-multi-left.png';
import pureloadMultiRight from '@/assets/pureload-multi-right.png';
import pureloadSleepFront from '@/assets/pureload-sleep-front.png';
import pureloadSleepLeft from '@/assets/pureload-sleep-left.png';
import pureloadSleepRight from '@/assets/pureload-sleep-right.png';
import pureloadAshwaFront from '@/assets/pureload-ashwa-front.png';
import pureloadAshwaLeft from '@/assets/pureload-ashwa-left.png';
import pureloadAshwaRight from '@/assets/pureload-ashwa-right.png';
import pureloadDebloatFront from '@/assets/pureload-debloat-front.png';
import pureloadDebloatLeft from '@/assets/pureload-debloat-left.png';
import pureloadDebloatRight from '@/assets/pureload-debloat-right.png';

export interface ProductImage {
  front: string;
  back: string;
  nutrition: string;
}

export interface IngredientImage {
  name: string;
  image: string;
}

export interface BundlePricing {
  single: number;
  singleVariantId: string;
  twoPack: number;
  twoPackOriginal: number;
  twoPackVariantId: string;
  threePack: number;
  threePackOriginal: number;
  threePackVariantId: string;
}

export interface Product {
  name: string;
  slug: string;
  category: string;
  bg: string;
  price: number;
  av: boolean;
  img: string;
  images: ProductImage;
  description: string;
  shopifyHandle: string;
  shopifyVariantId: string;
  servingSize: string;
  servingsPerContainer: number;
  benefits: string[];
  stats: { label: string; value: string }[];
  ingredientImages?: IngredientImage[];
  ingredientTitle?: string;
  ingredientSubtitle?: string;
  benefitsTitle?: string;
  reviews?: Review[];
  /** Short benefit sentence used on cards/lists */
  shortBenefit?: string;
  /** Badge shown on cards: "Best Seller", "Most Popular", "Trending" */
  badge?: string;
  /** Bundle pricing for single / 2-pack / 3-pack with Shopify variant IDs */
  bundlePricing?: BundlePricing;
}

export interface Review {
  n: string;
  i: string;
  t: string;
  s: number;
}

export const PRODUCTS: Product[] = [
  {
    name: 'Lemon Creatine Gummies',
    slug: 'pureload',
    category: 'Creatine',
    bg: 'linear-gradient(135deg,#2a1e00,#1a1200)',
    price: 42.99,
    av: true,
    img: pureloadLemonFront,
    shortBenefit: 'Boost strength and recovery without powders',
    badge: 'Best Seller',
    bundlePricing: {
      single: 42.99,
      singleVariantId: 'gid://shopify/ProductVariant/51797145682206',
      twoPack: 74.99,
      twoPackOriginal: 85.98,
      twoPackVariantId: 'gid://shopify/ProductVariant/51797145714974',
      threePack: 99.99,
      threePackOriginal: 128.97,
      threePackVariantId: 'gid://shopify/ProductVariant/51797145747742',
    },
    images: {
      front: pureloadLemonFront,
      back: pureloadLemonBack,
      nutrition: pureloadLemonNutrition,
    },
    description: 'No powder. No mess. 1000mg of pure creatine monohydrate in every delicious lemon gummy. The easiest way to fuel your gains.',
    shopifyHandle: 'pureload',
    shopifyVariantId: 'gid://shopify/ProductVariant/51797145682206',
    servingSize: '1 Gummy',
    servingsPerContainer: 60,
    benefits: [
      'Builds lean muscle mass',
      'Boosts athletic performance',
      'Supports brain function',
      'Faster recovery between workouts',
      'Zero sugar, 10 calories per serving',
      'No powder, no mixing required',
    ],
    stats: [
      { label: 'CREATINE', value: '1000g' },
      { label: 'COUNT', value: '60' },
      { label: 'CALS', value: '10' },
      { label: 'SUGAR', value: '0g' },
    ],
    ingredientImages: [
      { name: 'Creatine Monohydrate', image: ingredientCreatineGummy },
      { name: 'Calcium Lactate', image: ingredientLemonFlavor },
      { name: 'Natural Lemon Flavor', image: ingredientCalciumLactate },
    ],
    ingredientTitle: 'Powered By Science-Backed Ingredients',
    ingredientSubtitle: 'Each ingredient is carefully selected to maximize muscle growth, recovery, and cognitive performance.',
    reviews: [
      { n: 'Marcus T.', i: 'M', t: 'Bro these gummies are INSANE. Finally a creatine I actually look forward to taking. Lemon flavor goes crazy.', s: 5 },
      { n: 'Sarah K.', i: 'S', t: 'Been on creatine for years. Switching to PURELOAD changed everything — no scooping, no clumping. 10/10.', s: 5 },
      { n: 'James R.', i: 'J', t: "PR'd my deadlift 3 weeks in. Tastes like candy, hits like real creatine.", s: 5 },
      { n: 'Alex P.', i: 'A', t: 'Perfect for travel. Just throw the bottle in your bag. No measuring, no mess. Exactly what I needed.', s: 5 },
      { n: 'Derek W.', i: 'D', t: 'My gym buddies noticed before I even told them I started creatine. Results speak for themselves.', s: 5 },
      { n: 'Priya N.', i: 'P', t: "Finally a supplement brand that doesn't feel like medicine. PURELOAD is the move.", s: 5 },
    ],
  },
  {
    name: 'Male Enhancement',
    slug: 'pureload-male-enhancement-pills',
    category: 'Male Enhancement',
    bg: 'linear-gradient(135deg,#2a0500,#1a0300)',
    price: 39.99,
    av: true,
    img: pureloadMaleFront,
    shortBenefit: 'Energy, drive, and endurance — daily support',
    badge: 'Most Popular',
    bundlePricing: {
      single: 39.99,
      singleVariantId: 'gid://shopify/ProductVariant/51797145813278',
      twoPack: 69.99,
      twoPackOriginal: 79.98,
      twoPackVariantId: 'gid://shopify/ProductVariant/51797145846046',
      threePack: 89.99,
      threePackOriginal: 119.97,
      threePackVariantId: 'gid://shopify/ProductVariant/51797145878814',
    },
    images: {
      front: pureloadMaleFront,
      back: pureloadMaleBack,
      nutrition: pureloadMaleNutrition,
    },
    description: 'Mood enhancement, helps increase drive, and boosts endurance. 60 powerful tablets with Tongkat Ali, Maca, L-Arginine and more.',
    shopifyHandle: 'pureload-male-enhancement-pills',
    shopifyVariantId: 'gid://shopify/ProductVariant/51797145813278',
    servingSize: '1 Tablet',
    servingsPerContainer: 30,
    benefits: [
      'Mood enhancement support',
      'Helps increase drive and energy',
      'Boosts endurance and stamina',
      'Tongkat Ali 400mg per serving',
      'L-Arginine & Maca blend',
      'Lab tested, GMP certified',
    ],
    stats: [
      { label: 'TABLETS', value: '60' },
      { label: 'ZINC', value: '50mg' },
      { label: 'TONGKAT', value: '400mg' },
      { label: 'MACA', value: '250mg' },
    ],
    ingredientImages: [
  { name: 'Ginseng', image: ingredientTongkatAli },
  { name: 'Tongkat Ali', image: ingredientMaca },
  { name: 'Maca Root', image: ingredientLArginine },
  { name: 'L-Arginines', image: ingredientGinseng },
],
    ingredientTitle: 'Powered By Premium Ingredients',
    ingredientSubtitle: 'Each ingredient is carefully selected to maximize energy, endurance, and overall male performance.',
    benefitsTitle: 'Why Men Choose PURELOAD',
    reviews: [
      { n: 'Chris B.', i: 'C', t: "The male enhancement pills are legit. Noticed a difference within a week. Energy levels through the roof.", s: 5 },
      { n: 'Mike D.', i: 'M', t: "Was skeptical at first but my wife noticed the difference before I did. Definitely reordering.", s: 5 },
      { n: 'Ryan L.', i: 'R', t: "Tongkat Ali + Maca combo is no joke. Feel like I'm in my 20s again. PURELOAD delivers.", s: 5 },
      { n: 'Jordan K.', i: 'J', t: "Tried 3 other brands before this. PURELOAD is the only one that actually works. Period.", s: 5 },
      { n: 'David H.', i: 'D', t: "More energy at the gym and at home. This stuff is a game changer for real.", s: 5 },
      { n: 'Brandon S.', i: 'B', t: "Clean ingredients, no jitters, just steady performance all day. Exactly what I was looking for.", s: 5 },
    ],
  },
  {
    name: "Women's Hormonal Support",
    slug: 'pureload-womens-hormonal-support-gummies',
    category: 'Hormonal Support',
    bg: 'linear-gradient(135deg,#2a0028,#1a0018)',
    price: 39.99,
    av: true,
    img: pureloadWomenFront,
    shortBenefit: 'Hormone support, mood balance, and daily wellness',
    badge: 'Trending',
    bundlePricing: {
      single: 39.99,
      singleVariantId: 'gid://shopify/ProductVariant/51797145977118',
      twoPack: 69.99,
      twoPackOriginal: 79.98,
      twoPackVariantId: 'gid://shopify/ProductVariant/51797146009886',
      threePack: 89.99,
      threePackOriginal: 119.97,
      threePackVariantId: 'gid://shopify/ProductVariant/51797146042654',
    },
    images: {
      front: pureloadWomenFront,
      back: pureloadWomenBack,
      nutrition: pureloadWomenNutrition,
    },
    description: "Women's hormonal support gummies with Vitamin B6, Cranberry Extract, Chasteberry, and Dong Quai. Delicious and effective daily support.",
    shopifyHandle: 'pureload-womens-hormonal-support-gummies',
    shopifyVariantId: 'gid://shopify/ProductVariant/51797145977118',
    servingSize: '2 Gummies',
    servingsPerContainer: 30,
    benefits: [
      'Supports Hormonal Balance',
      'Helps Reduce Mood Swings',
      'Supports Menstrual Cycle Regularity',
      'Supports Energy & Daily Performance',
      'Supports Overall Women\'s Wellness',
      'No Artificial Colors or Flavors',
    ],
    benefitsTitle: 'Why Women Choose PURELOAD',
    stats: [
      { label: 'GUMMIES', value: '60' },
      { label: 'B6', value: '30mg' },
      { label: 'CALS', value: '20' },
      { label: 'SUGAR', value: '3g' },
    ],
    ingredientImages: [
      { name: 'Cranberry Extract', image: ingredientCranberry },
      { name: 'Dong Quai', image: ingredientDongQuai },
      { name: 'Chasteberry', image: ingredientChasteberry },
      { name: 'Sodium Citrate', image: ingredientSodiumCitrate },
    ],
    ingredientTitle: 'Powered By Targeted Ingredients',
    ingredientSubtitle: 'Each ingredient is selected to support hormonal balance, mood stability, and overall wellness.',
    reviews: [
      { n: 'Layla M.', i: 'L', t: "The women's hormonal support has been a game changer for me. I feel more balanced and energized.", s: 5 },
      { n: 'Jessica T.', i: 'J', t: "Finally something that actually helps with my mood swings. These gummies taste amazing too!", s: 5 },
      { n: 'Amanda R.', i: 'A', t: "My cycle has been so much more regular since I started taking these. Can't recommend enough.", s: 5 },
      { n: 'Nina P.', i: 'N', t: "Love that it's all natural ingredients. No more bloating and my energy is way up.", s: 5 },
      { n: 'Sophie W.', i: 'S', t: "Been taking these for 2 months now. PMS symptoms have reduced significantly. Thank you PURELOAD!", s: 5 },
      { n: 'Rachel G.', i: 'R', t: "These gummies are delicious and they actually work. My skin has cleared up too which is a bonus.", s: 5 },
    ],
  },
  {
    name: 'Wake-Up Pre-Workout',
    slug: 'pureload-wake-up-preworkout',
    category: 'Pre-Workout',
    bg: 'linear-gradient(135deg,#001a2a,#000814)',
    price: 49.99,
    av: true,
    img: pureloadPreworkoutFront,
    shortBenefit: 'Explosive energy, focus and pumps — Honeydew Watermelon Rage',
    badge: 'New',
    bundlePricing: {
      single: 49.99,
      singleVariantId: 'gid://shopify/ProductVariant/51797117993246',
      twoPack: 84.99,
      twoPackOriginal: 99.98,
      twoPackVariantId: 'gid://shopify/ProductVariant/51797118026014',
      threePack: 119.99,
      threePackOriginal: 149.97,
      threePackVariantId: 'gid://shopify/ProductVariant/51797118058782',
    },
    images: {
      front: pureloadPreworkoutFront,
      back: pureloadPreworkoutRight,
      nutrition: pureloadPreworkoutLeft,
    },
    description: 'PURELOAD Wake-Up Pre-Workout in Honeydew Watermelon Rage. Energy support, assists gains & strength, supports muscular pumps. 300g (10.58 oz) of explosive performance fuel.',
    shopifyHandle: 'pureload-wake-up-preworkout',
    shopifyVariantId: 'gid://shopify/ProductVariant/51797117993246',
    servingSize: '1 Scoop (10g)',
    servingsPerContainer: 30,
    benefits: [
      'Clean, sustained energy boost',
      'Supports muscular pumps',
      'Assists strength & gains',
      'Sharper focus and drive',
      'Honeydew Watermelon Rage flavor',
      '30 powerful servings per tub',
    ],
    benefitsTitle: 'Why Lifters Choose Wake-Up',
    stats: [
      { label: 'WEIGHT', value: '300g' },
      { label: 'SERVINGS', value: '30' },
      { label: 'CAFFEINE', value: '300mg' },
      { label: 'PUMP', value: 'YES' },
    ],
    ingredientImages: [
      { name: 'L-Citrulline Malate', image: ingredientCitrullineMalate },
      { name: 'Beta-Alanine', image: ingredientBetaAlanine },
      { name: 'Caffeine', image: ingredientCaffeine },
      { name: 'L-Tyrosine', image: ingredientLTyrosine },
      { name: 'BCAA', image: ingredientBCAA },
    ],
    ingredientTitle: 'Powered By High-Performance Ingredients',
    ingredientSubtitle: 'Each ingredient is selected to maximize energy, pump, and focus during your hardest training sessions.',
    reviews: [
      { n: 'Tyler J.', i: 'T', t: 'Wake-Up hits hard. Clean energy, no crash, pumps for days. New favorite pre.', s: 5 },
      { n: 'Mason R.', i: 'M', t: 'Honeydew Watermelon Rage tastes insane. PRs every session this week.', s: 5 },
      { n: 'Ethan K.', i: 'E', t: 'Smooth focus, real strength gains. PURELOAD nailed this formula.', s: 5 },
    ],
  },
  {
    name: 'Multi Gummies',
    slug: 'pureload-multi-gummies',
    category: 'Multivitamin',
    bg: 'linear-gradient(135deg,#1a0028,#0f0014)',
    price: 34.99,
    av: true,
    img: pureloadMultiFront,
    shortBenefit: 'Daily nutrition, immune & focus — Strawberry Surge',
    badge: 'New',
    bundlePricing: {
      single: 34.99,
      singleVariantId: 'gid://shopify/ProductVariant/51797118157086',
      twoPack: 59.99,
      twoPackOriginal: 69.98,
      twoPackVariantId: 'gid://shopify/ProductVariant/51797118189854',
      threePack: 79.99,
      threePackOriginal: 104.97,
      threePackVariantId: 'gid://shopify/ProductVariant/51797118222622',
    },
    images: {
      front: pureloadMultiFront,
      back: pureloadMultiRight,
      nutrition: pureloadMultiLeft,
    },
    description: 'PURELOAD Multi Gummies in Strawberry Surge. Daily nutrition & immune support with Pomegranate Extract, Vitamin B12, Folate, Vitamin C and Zinc. 60 delicious gummies.',
    shopifyHandle: 'pureload-multi-gummies',
    shopifyVariantId: 'gid://shopify/ProductVariant/51797118157086',
    servingSize: '2 Gummies',
    servingsPerContainer: 30,
    benefits: [
      'Full daily multivitamin coverage',
      'Supports immune system',
      'Energy & focus support',
      'Vitamin C, B12, Folate & Zinc',
      'Pomegranate Extract antioxidants',
      'Delicious Strawberry Surge flavor',
    ],
    benefitsTitle: 'Why People Choose Multi Gummies',
    stats: [
      { label: 'GUMMIES', value: '60' },
      { label: 'VITAMINS', value: '6+' },
      { label: 'CALS', value: '15' },
      { label: 'FLAVOR', value: 'BERRY' },
    ],
    ingredientImages: [
      { name: 'Vitamin B12', image: ingredientPomegranate },
      { name: 'Vitamin B9', image: ingredientVitaminB12Multi },
      { name: 'Vitamin 8', image: ingredientFolate },
      { name: 'Vitamin C', image: ingredientVitaminCMulti },
      { name: 'Zinc', image: ingredientZincMulti },
    ],
    ingredientTitle: 'Powered By Essential Vitamins',
    ingredientSubtitle: 'Each ingredient is selected to cover your daily nutritional needs, support immunity, and boost energy.',
    reviews: [
      { n: 'Alyssa M.', i: 'A', t: 'Easiest multivitamin I\'ve ever taken. Tastes like candy and I actually remember to take them.', s: 5 },
      { n: 'Brian F.', i: 'B', t: 'Energy noticeably better within a week. Strawberry flavor is on point.', s: 5 },
      { n: 'Kayla N.', i: 'K', t: 'Great daily base. Pairs perfectly with the rest of my PURELOAD stack.', s: 5 },
    ],
  },
  {
    name: 'Sleep Gummies',
    slug: 'pureload-sleep-gummies',
    category: 'Sleep & Recovery',
    bg: 'linear-gradient(135deg,#0a0028,#020014)',
    price: 34.99,
    av: true,
    img: pureloadSleepFront,
    shortBenefit: 'Sleep deeper. Wake stronger. — Passion Fruit',
    badge: 'New',
    bundlePricing: {
      single: 34.99,
      singleVariantId: 'gid://shopify/ProductVariant/51797118419230',
      twoPack: 59.99,
      twoPackOriginal: 69.98,
      twoPackVariantId: 'gid://shopify/ProductVariant/51797118451998',
      threePack: 79.99,
      threePackOriginal: 104.97,
      threePackVariantId: 'gid://shopify/ProductVariant/51797118484766',
    },
    images: {
      front: pureloadSleepFront,
      back: pureloadSleepRight,
      nutrition: pureloadSleepLeft,
    },
    description: 'PURELOAD Sleep System Recovery Gummies — Passion Fruit. Designed to help you fall asleep faster, sleep deeper and wake up recharged. 60 gummies.',
    shopifyHandle: 'pureload-sleep-gummies',
    shopifyVariantId: 'gid://shopify/ProductVariant/51797118419230',
    servingSize: '2 Gummies',
    servingsPerContainer: 30,
    benefits: [
      'Helps you fall asleep faster',
      'Supports deeper, restorative sleep',
      'Wake up refreshed, no grogginess',
      'Melatonin + calming botanicals',
      'Non-habit forming',
      'Delicious Passion Fruit flavor',
    ],
    benefitsTitle: 'Why People Choose Sleep Gummies',
    stats: [
      { label: 'GUMMIES', value: '60' },
      { label: 'MELATONIN', value: '5mg' },
      { label: 'CALS', value: '15' },
      { label: 'FLAVOR', value: 'PASSION' },
    ],
    ingredientImages: [
      { name: 'Passiflora Extract', image: ingredientPassiflora },
      { name: 'Melatonin', image: ingredientMelatonin },
      { name: 'Vitamin B6', image: ingredientVitaminB6 },
    ],
    ingredientTitle: 'Powered By Sleep Science',
    ingredientSubtitle: 'Each ingredient is selected to help you fall asleep faster, stay asleep longer, and wake up fully restored.',
    reviews: [
      { n: 'Hannah B.', i: 'H', t: 'Out cold in 20 minutes. Wake up actually rested for once.', s: 5 },
      { n: 'Marcus L.', i: 'M', t: 'Best sleep gummy I\'ve tried. No grogginess in the morning.', s: 5 },
      { n: 'Olivia P.', i: 'O', t: 'Passion fruit flavor + real deep sleep. PURELOAD wins again.', s: 5 },
    ],
  },
  {
    name: 'Ashwagandha Gummies',
    slug: 'pureload-ashwagandha-gummies',
    category: 'Stress & Calm',
    bg: 'linear-gradient(135deg,#1a2a00,#0a1400)',
    price: 34.99,
    av: true,
    img: pureloadAshwaFront,
    shortBenefit: 'Anxiety: muted. Mood: balanced. — Berry Fusion',
    badge: 'New',
    bundlePricing: {
      single: 34.99,
      singleVariantId: 'gid://shopify/ProductVariant/51797118517534',
      twoPack: 69.99,
      twoPackOriginal: 69.98,
      twoPackVariantId: 'gid://shopify/ProductVariant/51797118550302',
      threePack: 89.99,
      threePackOriginal: 104.97,
      threePackVariantId: 'gid://shopify/ProductVariant/51797118583070',
    },
    images: {
      front: pureloadAshwaFront,
      back: pureloadAshwaRight,
      nutrition: pureloadAshwaLeft,
    },
    description: 'PURELOAD Ashwagandha Gummies — Berry Fusion. Root extract adaptogen at 150mg per serving. Helps mute anxiety, balance mood and support recovery.',
    shopifyHandle: 'pureload-ashwagandha-gummies',
    shopifyVariantId: 'gid://shopify/ProductVariant/51797118517534',
    servingSize: '2 Gummies',
    servingsPerContainer: 30,
    benefits: [
      'Helps reduce stress & anxiety',
      'Supports balanced mood',
      'Aids recovery and resilience',
      '150mg ashwagandha root extract',
      'Adaptogenic support',
      'Berry Fusion flavor',
    ],
    benefitsTitle: 'Why People Choose Ashwagandha',
    stats: [
      { label: 'GUMMIES', value: '60' },
      { label: 'ASHWA', value: '150mg' },
      { label: 'CALS', value: '15' },
      { label: 'FLAVOR', value: 'BERRY' },
    ],
    ingredientImages: [
      { name: 'Ashwagandha Root', image: ingredientAshwa1 },
      { name: 'KSM-66 Extract', image: ingredientAshwa2 },
    ],
    ingredientTitle: 'Powered By Ancient Adaptogens',
    ingredientSubtitle: 'Clinically studied ashwagandha root extract to help your body adapt to stress and restore balance naturally.',
    reviews: [
      { n: 'Jenna S.', i: 'J', t: 'Noticeably calmer after 5 days. Sleep is better too. Game changer.', s: 5 },
      { n: 'Devin C.', i: 'D', t: 'Stress at work used to wreck me. Ashwagandha gummies help me stay level.', s: 5 },
      { n: 'Priya R.', i: 'P', t: 'Tastes great, actually works. Don\'t feel anxious mid-day anymore.', s: 5 },
    ],
  },
  {
    name: 'Debloat ACV Gummies',
    slug: 'pureload-debloat-acv-gummies',
    category: 'Digestion & Detox',
    bg: 'linear-gradient(135deg,#001a08,#000a04)',
    price: 39.99,
    av: true,
    img: pureloadDebloatFront,
    shortBenefit: 'Detox, digest, burn, cleanse — Apple Crisp ACV',
    badge: 'New',
    bundlePricing: {
      single: 39.99,
      singleVariantId: 'gid://shopify/ProductVariant/51797118648606',
      twoPack: 69.99,
      twoPackOriginal: 79.98,
      twoPackVariantId: 'gid://shopify/ProductVariant/51797118681374',
      threePack: 89.99,
      threePackOriginal: 119.97,
      threePackVariantId: 'gid://shopify/ProductVariant/51797118714142',
    },
    images: {
      front: pureloadDebloatFront,
      back: pureloadDebloatRight,
      nutrition: pureloadDebloatLeft,
    },
    description: 'PURELOAD Debloat ACV Gummies — Apple Crisp. Apple Cider Vinegar gummies that help detox, digest, burn and cleanse. Reset your system.',
    shopifyHandle: 'pureload-debloat-acv-gummies',
    shopifyVariantId: 'gid://shopify/ProductVariant/51797118648606',
    servingSize: '2 Gummies',
    servingsPerContainer: 30,
    benefits: [
      'Helps reduce bloating',
      'Supports digestion & gut health',
      'Aids natural detox & cleanse',
      'Apple Cider Vinegar based',
      'Supports metabolism',
      'Apple Crisp flavor — no vinegar burn',
    ],
    benefitsTitle: 'Why People Choose Debloat',
    stats: [
      { label: 'GUMMIES', value: '60' },
      { label: 'ACV', value: '500mg' },
      { label: 'CALS', value: '15' },
      { label: 'FLAVOR', value: 'APPLE' },
    ],
    ingredientImages: [
      { name: 'Pomegranate Extract', image: ingredientDebloat1 },
      { name: 'L-Arginine', image: ingredientDebloat2 },
      { name: 'Dandelion Extract', image: ingredientDebloat3 },
      { name: 'Vitamin B12', image: ingredientDebloat4 },
      { name: 'Apple Cider Vinegar', image: ingredientDebloat5 },
    ],
    ingredientTitle: 'Powered By Digestive Science',
    ingredientSubtitle: 'Each ingredient is selected to support gut health, reduce bloating, and help your body naturally cleanse and reset.',
    reviews: [
      { n: 'Sienna W.', i: 'S', t: 'Bloat gone in 3 days. Tastes way better than drinking ACV. Obsessed.', s: 5 },
      { n: 'Carlos M.', i: 'C', t: 'Digestion finally feels right. PURELOAD does it again.', s: 5 },
      { n: 'Aria T.', i: 'A', t: 'Apple Crisp flavor is unreal. Stomach feels flat all day.', s: 5 },
    ],
  },
];

export const FLAVORS = PRODUCTS;

// Combined reviews for homepage
export const REVIEWS: Review[] = PRODUCTS.flatMap(p => p.reviews || []);

export const BUNDLES = [
  { id: 'starter', name: '1 BOTTLE', items: 1, price: 42.99, originalPrice: 42.99, save: 0, tag: '', description: 'Single bottle — try the PURELOAD experience' },
  { id: 'popular', name: '2 PACK', items: 2, price: 74.99, originalPrice: 85.98, save: 13, tag: 'SAVE MORE', description: '2 bottles — one month of gains' },
  { id: 'beast', name: '3 PACK', items: 3, price: 99.99, originalPrice: 128.97, save: 22, tag: 'BEST VALUE', description: '3 bottles — maximum results · FREE SHIPPING' },
  { id: 'squad', name: '6 PACK', items: 6, price: 189.99, originalPrice: 257.94, save: 26, tag: 'BIGGEST SAVINGS', description: '6 bottles — share with the crew · FREE SHIPPING' },
];

export interface CartItem {
  label: string;
  price: number;
  qty: number;
  variantId?: string;
  isSubscription?: boolean;
  subscriptionInterval?: number;
  img?: string;
}