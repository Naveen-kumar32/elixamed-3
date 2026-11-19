// Legal page content — Terms & Conditions and Privacy Policy.
//
// The three order terms come verbatim from the company's product list
// (src/data/products.js `orderTerms`); everything else is standard wording
// for an Indian pharmaceutical wholesale business (Drugs and Cosmetics Act
// 1940, CGST Act 2017, Digital Personal Data Protection Act 2023). It is a
// sensible starting point, not legal advice — have it reviewed before launch.
//
// Each section: { heading, paragraphs?: string[], points?: string[] }.

import { company } from './company'
import { orderTerms } from './products'

export const LEGAL_UPDATED = '19 November 2026'

const contactLine = `${company.email.display} · ${company.phone.display} / ${company.mobile.display}`

export const terms = {
  title: 'Terms & Conditions',
  intro: `These terms apply to every quotation, order and supply made by ${company.legalName} ("Elixamed", "we", "us"). By placing an order with us you agree to them.`,
  sections: [
    {
      heading: 'Order terms',
      paragraphs: ['As printed on our product list, every order is subject to the following:'],
      points: orderTerms,
      highlight: true,
    },
    {
      heading: 'Who we supply',
      paragraphs: [
        'We are a licensed pharmaceutical wholesaler and supply only to businesses legally entitled to purchase medicines — retail pharmacies, hospitals, clinics, nursing homes and other licensed distributors.',
        'Before your first order we will ask for a copy of your valid drug licence and GST registration. Prescription medicines are supplied strictly in accordance with the Drugs and Cosmetics Act, 1940 and the Drugs Rules, 1945. We may decline any order that does not meet these requirements.',
      ],
    },
    {
      heading: 'Quotations and orders',
      points: [
        'Prices on this website and in our product list are indicative. The price on our written quotation or invoice is the one that applies.',
        'An order is accepted only once we confirm it in writing. Your order confirmation must be shared on our official mail ID, ' + company.email.display + '.',
        'All orders are subject to stock availability. If an item is unavailable we will tell you before dispatch and will not substitute a product without your agreement.',
      ],
    },
    {
      heading: 'Prices, GST and payment',
      points: [
        'All prices are in Indian Rupees. Offer prices exclude GST, which is charged at the applicable rate on the tax invoice.',
        'MRP and offer prices may change without notice, in line with manufacturer price revisions and applicable price-control orders.',
        'Advance payment must be made. Goods are dispatched once payment has been received in our account.',
      ],
    },
    {
      heading: 'Delivery',
      points: [
        'Delivery will be done within a day if the location is nearby. For other locations we will give you an expected delivery date when we confirm the order.',
        'Please check the consignment against the invoice when you receive it — quantity, batch number, expiry date and the condition of the packs.',
        'Once delivered, the products must be stored as stated on the manufacturer’s label, including any temperature requirements.',
      ],
    },
    {
      heading: 'Damaged, short or incorrect supplies',
      paragraphs: [
        'If anything arrives damaged, short or different from what you ordered, tell us as soon as possible, quoting the invoice number and, where possible, with photographs. Returns, replacements and credit notes are handled only with our written agreement and in line with the manufacturer’s return policy. Products that have been stored or handled outside their label conditions after delivery cannot be accepted back.',
      ],
    },
    {
      heading: 'Product information',
      paragraphs: [
        'Product details on this website are provided for licensed trade buyers as a reference. They are not medical advice. Always refer to the manufacturer’s label and package insert, which take precedence over anything shown here. Product images are representative; packaging may vary between batches.',
      ],
    },
    {
      heading: 'Liability',
      paragraphs: [
        'We source products only from licensed manufacturers and distributors and pass on the manufacturer’s quality assurances. To the extent permitted by law, our liability for any order is limited to the invoice value of the products concerned, and we are not liable for indirect or consequential losses.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: ['These terms are governed by the laws of India. Courts in Chennai, Tamil Nadu, have exclusive jurisdiction over any dispute.'],
    },
    {
      heading: 'Changes and contact',
      paragraphs: [
        'We may update these terms from time to time; the version on this page applies to orders placed after the date shown above.',
        `Questions about these terms: ${contactLine}.`,
      ],
    },
  ],
}

export const privacy = {
  title: 'Privacy Policy',
  intro: `This policy explains how ${company.legalName} collects, uses and protects personal data, in line with the Digital Personal Data Protection Act, 2023.`,
  sections: [
    {
      heading: 'What we collect',
      points: [
        'Enquiries: your name, organisation, email address, phone number and message when you use our contact form, email or call us.',
        'Orders: business details needed to supply you lawfully — drug licence and GST numbers, billing and delivery addresses, and the name and contact details of the person ordering.',
        'Newsletter: your email address, if you choose to subscribe.',
        'Technical: like any website, our hosting provider receives basic request data (such as IP address and browser type) needed to deliver the pages.',
      ],
    },
    {
      heading: 'How we use it',
      points: [
        'To reply to enquiries and prepare quotations.',
        'To process, invoice, deliver and follow up on orders.',
        'To meet legal obligations — GST invoicing and the sale records we must keep under the Drugs and Cosmetics Act and Rules.',
        'To send occasional updates, only if you have subscribed. Every email lets you unsubscribe.',
      ],
      paragraphs: ['We do not sell or rent personal data, and we do not use it for advertising.'],
    },
    {
      heading: 'Cookies',
      paragraphs: [
        'This website does not use advertising or analytics cookies and does not track you across other sites. Our fonts are served by Google Fonts, which receives your IP address when the page loads.',
      ],
    },
    {
      heading: 'Who we share it with',
      paragraphs: ['Only where needed to serve you or required by law:'],
      points: [
        'Courier and logistics partners, to deliver your order.',
        'Banks and payment providers, to process payments.',
        'Our email, IT and accounting service providers, under confidentiality obligations.',
        'Government, tax or drug-regulatory authorities, when the law requires it.',
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'Enquiry data is kept for as long as needed to respond and follow up. Order, invoice and licence records are kept for the periods required by tax and drug-regulation law. After that, data is deleted or anonymised.',
      ],
    },
    {
      heading: 'Security',
      paragraphs: [
        'We use reasonable technical and organisational safeguards to protect personal data against loss, misuse and unauthorised access. Access is limited to staff who need it to do their work.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'You can ask us to access, correct, update or erase your personal data, withdraw consent (for example, to unsubscribe), or raise a grievance about how your data is handled. Write to us and we will respond within a reasonable time. If you are not satisfied with our response, you may approach the Data Protection Board of India.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: ['This website is intended for businesses. We do not knowingly collect personal data from anyone under 18.'],
    },
    {
      heading: 'Contact and grievances',
      paragraphs: [
        `${company.legalName}, ${company.address.line1}, ${company.address.line2}.`,
        `Email ${company.email.display} · Phone ${company.phone.display} / ${company.mobile.display}.`,
        'We may update this policy from time to time; the date at the top shows the latest version.',
      ],
    },
  ],
}
