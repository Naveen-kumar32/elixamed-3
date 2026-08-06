// Product catalogue. Category slugs are the single source of truth used by
// nav.js (mega menu), Products page (filters), and company.js (category share).

export const categories = [
  {
    slug: 'oral-solids',
    label: 'Oral Solids',
    hint: 'Tablets & capsules',
    description:
      'Analgesics, antibiotics and chronic-care tablets and capsules, sourced from certified manufacturers and stocked for immediate supply.',
  },
  {
    slug: 'oral-liquids',
    label: 'Oral Liquids',
    hint: 'Syrups & suspensions',
    description:
      'Syrups, suspensions and oral rehydration formulations, warehoused and verified against manufacturer certification.',
  },
  {
    slug: 'topical',
    label: 'Topical',
    hint: 'Ointments, creams & gels',
    description:
      'Dermatological creams, gels and ointments, distributed from our verified manufacturer network.',
  },
  {
    slug: 'sterile-injectables',
    label: 'Sterile Injectables',
    hint: 'IV infusions & injections',
    description:
      'Small-volume injections and large-volume IV infusions, held and moved under validated cold-chain conditions.',
  },
  {
    slug: 'nutraceuticals',
    label: 'Nutraceuticals',
    hint: 'Supplements & wellness',
    description:
      'Vitamin, mineral and wellness formulations, sourced to the same compliance standard as our pharmaceutical lines.',
  },
]

export const products = [
  // ---- Oral Solids (10) ----
  { id: 'elixapara-500', name: 'ElixaPara 500', generic: 'Paracetamol Tablets 500mg', category: 'oral-solids', form: 'Tablet', packSizes: ['10×10 blister', '1000s HDPE'] },
  { id: 'elixapara-650', name: 'ElixaPara 650', generic: 'Paracetamol Tablets 650mg', category: 'oral-solids', form: 'Tablet', packSizes: ['10×10 blister', '500s HDPE'] },
  { id: 'amoxicare-250', name: 'Amoxicare 250', generic: 'Amoxicillin Capsules 250mg', category: 'oral-solids', form: 'Capsule', packSizes: ['10×10 blister'] },
  { id: 'amoxicare-500', name: 'Amoxicare 500', generic: 'Amoxicillin Capsules 500mg', category: 'oral-solids', form: 'Capsule', packSizes: ['10×10 blister'] },
  { id: 'ibuflex-400', name: 'Ibuflex 400', generic: 'Ibuprofen Tablets 400mg', category: 'oral-solids', form: 'Tablet', packSizes: ['10×15 blister'] },
  { id: 'cetrizex-10', name: 'Cetrizex 10', generic: 'Cetirizine Tablets 10mg', category: 'oral-solids', form: 'Tablet', packSizes: ['10×10 blister'] },
  { id: 'panzogel-40', name: 'Panzogel 40', generic: 'Pantoprazole Tablets 40mg', category: 'oral-solids', form: 'Tablet', packSizes: ['10×10 blister'] },
  { id: 'metformax-500', name: 'MetforMax 500', generic: 'Metformin Tablets 500mg', category: 'oral-solids', form: 'Tablet', packSizes: ['10×10 blister', '1000s HDPE'] },
  { id: 'vitazyme-c', name: 'Vitazyme-C', generic: 'Vitamin C Chewable Tablets 500mg', category: 'oral-solids', form: 'Chewable Tablet', packSizes: ['15s strip'] },
  { id: 'calcimax-d3', name: 'Calcimax-D3', generic: 'Calcium + Vitamin D3 Tablets', category: 'oral-solids', form: 'Tablet', packSizes: ['15s strip'] },

  // ---- Oral Liquids (9) ----
  { id: 'elixapara-syrup', name: 'ElixaPara Syrup', generic: 'Paracetamol Oral Suspension 125mg/5ml', category: 'oral-liquids', form: 'Suspension', packSizes: ['60ml bottle', '100ml bottle'] },
  { id: 'amoxicare-syrup', name: 'Amoxicare Syrup', generic: 'Amoxicillin Oral Suspension 125mg/5ml', category: 'oral-liquids', form: 'Suspension', packSizes: ['30ml bottle', '60ml bottle'] },
  { id: 'coldenz-dx', name: 'Coldenz-DX', generic: 'Cough Suppressant Syrup', category: 'oral-liquids', form: 'Syrup', packSizes: ['100ml bottle'] },
  { id: 'broncoclear', name: 'Broncoclear', generic: 'Expectorant Syrup', category: 'oral-liquids', form: 'Syrup', packSizes: ['100ml bottle'] },
  { id: 'ferrizex', name: 'Ferrizex', generic: 'Iron & Folic Acid Syrup', category: 'oral-liquids', form: 'Syrup', packSizes: ['200ml bottle'] },
  { id: 'orsalt-plus', name: 'ORSalt Plus', generic: 'Oral Rehydration Solution', category: 'oral-liquids', form: 'Sachet', packSizes: ['21g sachet ×50'] },
  { id: 'lactocare', name: 'Lactocare', generic: 'Lactulose Solution', category: 'oral-liquids', form: 'Solution', packSizes: ['100ml bottle'] },
  { id: 'gastroease', name: 'GastroEase', generic: 'Antacid Suspension', category: 'oral-liquids', form: 'Suspension', packSizes: ['170ml bottle'] },
  { id: 'multivita-kids', name: 'Multivita Kids', generic: 'Multivitamin Syrup', category: 'oral-liquids', form: 'Syrup', packSizes: ['100ml bottle'] },

  // ---- Topical (9) ----
  { id: 'dermacalm-cream', name: 'DermaCalm Cream', generic: 'Clotrimazole Cream 1%', category: 'topical', form: 'Cream', packSizes: ['15g tube', '30g tube'] },
  { id: 'fungisoothe', name: 'Fungisoothe', generic: 'Antifungal Ointment', category: 'topical', form: 'Ointment', packSizes: ['15g tube'] },
  { id: 'silverburn-gel', name: 'Silverburn Gel', generic: 'Silver Sulfadiazine Cream 1%', category: 'topical', form: 'Cream', packSizes: ['20g tube', '50g jar'] },
  { id: 'mupiroheal', name: 'MupiroHeal', generic: 'Mupirocin Ointment 2%', category: 'topical', form: 'Ointment', packSizes: ['5g tube', '10g tube'] },
  { id: 'diclonex-gel', name: 'Diclonex Gel', generic: 'Diclofenac Gel 1%', category: 'topical', form: 'Gel', packSizes: ['30g tube'] },
  { id: 'betasoft-cream', name: 'Betasoft Cream', generic: 'Betamethasone Cream 0.05%', category: 'topical', form: 'Cream', packSizes: ['20g tube'] },
  { id: 'antisepx-solution', name: 'AntisepX Solution', generic: 'Povidone-Iodine Solution 10%', category: 'topical', form: 'Solution', packSizes: ['100ml bottle'] },
  { id: 'zinctopic-paste', name: 'Zinctopic Paste', generic: 'Zinc Oxide Paste', category: 'topical', form: 'Paste', packSizes: ['50g jar'] },
  { id: 'calaminex-lotion', name: 'Calaminex Lotion', generic: 'Calamine Lotion', category: 'topical', form: 'Lotion', packSizes: ['100ml bottle'] },

  // ---- Sterile Injectables (10) ----
  { id: 'elixapara-injection', name: 'ElixaPara Injection', generic: 'Paracetamol IV Infusion 1g/100ml', category: 'sterile-injectables', form: 'IV Infusion', packSizes: ['100ml vial'] },
  { id: 'ceftrizone-1g', name: 'Ceftrizone-1g', generic: 'Ceftriaxone Injection 1g', category: 'sterile-injectables', form: 'Injection', packSizes: ['1g vial'] },
  { id: 'metrozole-iv', name: 'Metrozole-IV', generic: 'Metronidazole Infusion 500mg/100ml', category: 'sterile-injectables', form: 'IV Infusion', packSizes: ['100ml bottle'] },
  { id: 'ondanex-4', name: 'Ondanex-4', generic: 'Ondansetron Injection 4mg/2ml', category: 'sterile-injectables', form: 'Injection', packSizes: ['2ml ampoule ×5'] },
  { id: 'dexazone-injection', name: 'Dexazone Injection', generic: 'Dexamethasone Injection 4mg/ml', category: 'sterile-injectables', form: 'Injection', packSizes: ['2ml ampoule ×5'] },
  { id: 'panzogel-injection', name: 'Panzogel Injection', generic: 'Pantoprazole Injection 40mg', category: 'sterile-injectables', form: 'Injection', packSizes: ['40mg vial'] },
  { id: 'tranexid-injection', name: 'Tranexid Injection', generic: 'Tranexamic Acid Injection 500mg/5ml', category: 'sterile-injectables', form: 'Injection', packSizes: ['5ml ampoule ×5'] },
  { id: 'normosaline', name: 'NormoSaline', generic: 'Sodium Chloride 0.9% IV Infusion', category: 'sterile-injectables', form: 'IV Infusion', packSizes: ['500ml bottle', '1000ml bottle'] },
  { id: 'dextrozex-5', name: 'Dextrozex-5', generic: 'Dextrose 5% IV Infusion', category: 'sterile-injectables', form: 'IV Infusion', packSizes: ['500ml bottle'] },
  { id: 'hepazex', name: 'Hepazex', generic: 'Heparin Sodium Injection 5000IU/ml', category: 'sterile-injectables', form: 'Injection', packSizes: ['5ml vial'] },

  // ---- Nutraceuticals (10) ----
  { id: 'omegazex-1000', name: 'Omegazex-1000', generic: 'Omega-3 Fish Oil Softgels', category: 'nutraceuticals', form: 'Softgel', packSizes: ['30s bottle', '60s bottle'] },
  { id: 'immunoboost-c', name: 'Immunoboost-C', generic: 'Vitamin C + Zinc Tablets', category: 'nutraceuticals', form: 'Tablet', packSizes: ['30s bottle'] },
  { id: 'proteinamino-sachet', name: 'ProteinAmino Sachet', generic: 'Protein & Amino Acid Sachet', category: 'nutraceuticals', form: 'Sachet', packSizes: ['10g sachet ×30'] },
  { id: 'biotivit-h', name: 'Biotivit-H', generic: 'Biotin Hair & Skin Tablets', category: 'nutraceuticals', form: 'Tablet', packSizes: ['30s bottle'] },
  { id: 'probiozex', name: 'Probiozex', generic: 'Probiotic Capsules', category: 'nutraceuticals', form: 'Capsule', packSizes: ['10×10 blister'] },
  { id: 'folimax-plus', name: 'FolimaxPlus', generic: 'Folic Acid + Iron + B12 Tablets', category: 'nutraceuticals', form: 'Tablet', packSizes: ['30s bottle'] },
  { id: 'jointflex-glucosamine', name: 'JointFlex Glucosamine', generic: 'Glucosamine + Chondroitin Tablets', category: 'nutraceuticals', form: 'Tablet', packSizes: ['60s bottle'] },
  { id: 'calmag-zinc', name: 'CalMag-Zinc', generic: 'Calcium Magnesium Zinc Tablets', category: 'nutraceuticals', form: 'Tablet', packSizes: ['60s bottle'] },
  { id: 'energex-effervescent', name: 'Energex Effervescent', generic: 'Multivitamin Effervescent Tablets', category: 'nutraceuticals', form: 'Effervescent Tablet', packSizes: ['15 tube'] },
  { id: 'sleepease-melatonin', name: 'SleepEase Melatonin', generic: 'Melatonin Tablets 3mg', category: 'nutraceuticals', form: 'Tablet', packSizes: ['30s bottle'] },
]

// Feature-comparison matrix: categories × attributes (Products section 5).
export const comparisonAttributes = [
  { key: 'forms', label: 'Dosage forms' },
  { key: 'packSizes', label: 'Typical pack sizes' },
  { key: 'shelfLife', label: 'Shelf life' },
  { key: 'storage', label: 'Storage condition' },
  { key: 'regulatory', label: 'Regulatory status' },
]

export const comparisonData = {
  'oral-solids': {
    forms: 'Tablets, capsules, chewables',
    packSizes: 'Blister 10×10, HDPE 500–1000s',
    shelfLife: '24 months',
    storage: 'Below 25°C, dry place',
    regulatory: 'Wholesale Licensed · GDP',
  },
  'oral-liquids': {
    forms: 'Syrups, suspensions, sachets',
    packSizes: '60–200ml bottles, sachets',
    shelfLife: '18 months',
    storage: 'Below 25°C, protect from light',
    regulatory: 'Wholesale Licensed · GDP',
  },
  topical: {
    forms: 'Creams, gels, ointments, lotions',
    packSizes: '5–50g tubes/jars, 100ml bottles',
    shelfLife: '24 months',
    storage: 'Below 30°C',
    regulatory: 'Wholesale Licensed · GDP',
  },
  'sterile-injectables': {
    forms: 'Injections, IV infusions',
    packSizes: 'Ampoules, vials, 100–1000ml infusions',
    shelfLife: '24 months',
    storage: '2–8°C or below 25°C (product-specific)',
    regulatory: 'Wholesale Licensed · GDP · Cold-Chain Compliant',
  },
  nutraceuticals: {
    forms: 'Tablets, softgels, sachets, effervescent',
    packSizes: '30–60s bottles, sachets',
    shelfLife: '24 months',
    storage: 'Below 25°C, dry place',
    regulatory: 'FSSAI · ISO 9001:2015',
  },
}
