// Single source of truth for company facts. Every page (About numbers,
// Home stats, Services SLA, Quality ledger, Contact card, Footer) reads
// from here so a fact only ever needs to change in one place.
//
// ElixaMed is a pharmaceutical WHOLESALE DISTRIBUTOR — it buys in bulk from
// certified manufacturers and super-stockists, and supplies retail
// pharmacies and medical stores. It does not manufacture: no production
// lines, no in-house batch testing. Every field below is written from that
// distributor's-side vocabulary (sourcing, verification, warehousing,
// dispatch) rather than a manufacturer's (formulation, production, in-house
// QC release) — keep new content consistent with that distinction.

export const company = {
  name: 'ElixaMed',
  legalName: 'ElixaMed Pharma Distributors Pvt. Ltd.',
  tagline: 'Wholesale pharmaceutical distribution, delivered with trust.',
  founded: 2010,
  hq: 'Chennai, India',
  eyebrow: 'EST. 2010 — CHENNAI',

  address: {
    line1: 'Thy Grace, Dr. Johnson, 110, 1st Avenue',
    line2: 'Royal Metro City, Adayalampattu, Tamil Nadu 600095',
    mapQuery: 'Adayalampattu, Tamil Nadu 600095',
    mapHref: 'https://maps.app.goo.gl/fQx3RuxsKQcyU5766',
  },
  phone: { display: '+91 44 4567 8900', href: '+914445678900' },
  mobile: { display: '+91 98765 43210', href: '+919876543210' },
  email: { display: 'hello@elixamed.com', href: 'hello@elixamed.com' },
  qualityEmail: { display: 'quality@elixamed.com', href: 'quality@elixamed.com' },
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 6:00 PM IST' },
    { days: 'Saturday', time: '9:00 AM – 1:00 PM IST' },
    { days: 'Sunday', time: 'Closed' },
  ],
  responseTime: 'We respond within 1 business day.',

  certifications: [
    {
      id: 'wholesale-license',
      name: 'Wholesale Drug License',
      body: 'State Drugs Control Department (Forms 20B & 21B)',
      detail: 'Licensed for wholesale trade of pharmaceutical drugs across all distributed categories.',
    },
    {
      id: 'gdp',
      name: 'GDP Certified',
      body: 'Good Distribution Practice',
      detail: 'Storage, handling and transport audited against WHO Good Distribution Practice guidelines.',
    },
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015',
      body: 'International Organization for Standardization',
      detail: 'Quality management systems, audited annually.',
    },
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      body: 'International Organization for Standardization',
      detail: 'Environmental management across warehousing operations.',
    },
    {
      id: 'iso-45001',
      name: 'ISO 45001:2018',
      body: 'International Organization for Standardization',
      detail: 'Occupational health & safety management systems.',
    },
    {
      id: 'cold-chain',
      name: 'Cold Chain Compliant',
      body: 'WHO Temperature-Control Guidelines',
      detail: 'Temperature-controlled storage and transport validated for cold-chain-sensitive formulations.',
    },
  ],

  // Trust ticker: certifications + network reach.
  trustTicker: [
    'Wholesale Licensed',
    'GDP Certified',
    'ISO 9001:2015',
    'ISO 14001:2015',
    'ISO 45001:2018',
    'Cold-Chain Compliant',
    '40+ Retail Partners',
    'Verified Manufacturer Network',
  ],

  stats: {
    home: [
      { value: 48, suffix: '+', label: 'Products distributed' },
      { value: 12, suffix: '', label: 'Years in operation' },
      { value: 99.4, suffix: '%', label: 'Verified batch compliance', decimals: 1 },
      { value: 40, suffix: '+', label: 'Retail partners' },
    ],
    about: [
      { value: 220, suffix: '+', label: 'Team members' },
      { value: 5, suffix: '', label: 'Product categories' },
      { value: 15, suffix: '+', label: 'Cities served' },
    ],
    services: [
      { value: 99.4, suffix: '%', label: 'Verified batch compliance', decimals: 1 },
      { value: 96, suffix: '%', label: 'On-time dispatch' },
      { value: 72, suffix: 'hrs', label: 'Avg. quote turnaround' },
    ],
  },

  // Category share of distribution volume — feeds the Services data-viz
  // band (donut + bar chart), drawn only from this real, shared dataset.
  categoryShare: [
    { label: 'Oral Solids', value: 34, categorySlug: 'oral-solids' },
    { label: 'Sterile Injectables', value: 24, categorySlug: 'sterile-injectables' },
    { label: 'Oral Liquids', value: 18, categorySlug: 'oral-liquids' },
    { label: 'Nutraceuticals', value: 16, categorySlug: 'nutraceuticals' },
    { label: 'Topical', value: 8, categorySlug: 'topical' },
  ],

  values: [
    {
      icon: 'ShieldCheck',
      title: 'Quality without compromise',
      description: 'Every batch is verified against its manufacturer’s certification before it reaches our shelves — no exceptions.',
    },
    {
      icon: 'Handshake',
      title: 'Sourcing over shortcuts',
      description: 'We source only from verified, licensed manufacturers and super-stockists — never grey-market supply.',
    },
    {
      icon: 'Clock4',
      title: 'Reliability as a habit',
      description: '96% on-time dispatch, tracked and reported internally every month.',
    },
    {
      icon: 'HeartHandshake',
      title: 'Partnership over transactions',
      description: 'Long-term supply relationships, not one-off orders — many partners since year one.',
    },
  ],

  // "Our expertise" replaces a leadership section — no invented names/faces.
  expertise: [
    {
      icon: 'ShoppingCart',
      title: 'Sourcing & Procurement',
      description: 'Verified bulk sourcing from certified manufacturers and super-stockists across all five categories.',
    },
    {
      icon: 'ClipboardCheck',
      title: 'Regulatory & Licensing',
      description: 'Wholesale drug licensing and GDP compliance managed end-to-end for every consignment.',
    },
    {
      icon: 'Warehouse',
      title: 'Warehousing & Cold-Chain',
      description: 'Temperature-controlled storage and validated cold-chain handling for sensitive formulations.',
    },
    {
      icon: 'Truck',
      title: 'Distribution & Retailer Support',
      description: 'Reliable dispatch and dedicated account support across 40+ retail partners.',
    },
  ],

  timeline: [
    { year: '2010', title: 'Founded in Chennai', description: 'Started distributing oral-solid formulations sourced from certified manufacturers.' },
    { year: '2014', title: 'Wholesale license secured', description: 'Statewide wholesale drug license granted; retail distribution network began.' },
    { year: '2017', title: 'Cold-chain network launched', description: 'Temperature-controlled storage and logistics introduced for injectable formulations.' },
    { year: '2020', title: 'GDP certification achieved', description: 'Good Distribution Practice formalized across all warehousing operations.' },
    { year: '2023', title: '40+ retail partners', description: 'Retail network reached 40+ pharmacies and medical stores across 15+ cities.' },
  ],

  processSteps: [
    {
      number: '01',
      title: 'Enquiry & Requirement',
      description: 'Share what you need — product, quantity and timeline — and our team reviews availability.',
    },
    {
      number: '02',
      title: 'Sourcing & Quotation',
      description: 'We source from verified manufacturers and share formal pricing and lead times.',
    },
    {
      number: '03',
      title: 'Verification & Documentation',
      description: 'Certificates of Analysis and licensing documents are verified before confirmation.',
    },
    {
      number: '04',
      title: 'Order Confirmation',
      description: 'Purchase order confirmed and stock reserved against verified supply.',
    },
    {
      number: '05',
      title: 'Warehousing & Dispatch',
      description: 'Stock is picked, packed and dispatched — cold-chain handling where required.',
    },
    {
      number: '06',
      title: 'Delivery & Ongoing Supply',
      description: 'Delivered to your location, with standing-order support for repeat supply.',
    },
  ],

  slaRows: [
    { label: 'Enquiry response', commitment: '1 business day' },
    { label: 'Formal quotation', commitment: '3 business days' },
    { label: 'Sample dispatch', commitment: '10 business days' },
    { label: 'New account onboarding', commitment: '3–5 business days' },
    { label: 'Standing order fulfilment', commitment: '3–5 business days' },
    { label: 'Batch documentation (CoA)', commitment: 'Shipped with every batch' },
  ],

  // Verification & handling standards — what we check sourced products
  // against, and how we store/move them. Not in-house lab testing methods.
  testingStandards: [
    { acronym: 'IP', name: 'Indian Pharmacopoeia', description: 'Primary compendial standard, verified via every manufacturer’s Certificate of Analysis.' },
    { acronym: 'BP', name: 'British Pharmacopoeia', description: 'Applied for BP-referenced formulations sourced from compliant manufacturers.' },
    { acronym: 'USP', name: 'United States Pharmacopeia', description: 'Verified for USP-referenced formulations carried in our catalogue.' },
    { acronym: 'GDP', name: 'Good Distribution Practice', description: 'Governs storage, handling and transport across our entire warehousing network.' },
    { acronym: 'WHO', name: 'WHO Cold Chain Guidelines', description: 'Temperature-control standards for injectables and sensitive formulations.' },
    { acronym: 'T&T', name: 'Track & Trace', description: 'Every consignment traceable from manufacturer batch to retailer delivery.' },
  ],

  documentation: [
    'Certificate of Analysis (CoA) — every batch',
    'Manufacturer’s license verification — every source',
    'Cold-chain & storage compliance log',
    'Material Safety Data Sheet (MSDS)',
    'Wholesale invoice & delivery challan',
  ],

  policyStatement:
    'Every batch we distribute carries its manufacturer’s Certificate of Analysis. If it isn’t verified, it isn’t shipped — that is the one policy we never revise.',
}
