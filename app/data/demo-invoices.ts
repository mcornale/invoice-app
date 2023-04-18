import { InvoiceStatus } from '@prisma/client';

export const DEMO_INVOICES = [
  {
    displayId: 'RT3080',
    createdAt: new Date('2021-08-18'),
    paymentDue: new Date('2021-08-19'),
    description: 'Re-branding',
    paymentTerms: 1,
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    status: InvoiceStatus.PAID,
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '106 Kendell Street',
      city: 'Sharrington',
      postCode: 'NR24 5WQ',
      country: 'United Kingdom',
    },
    items: [
      {
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.9,
        total: 1800.9,
      },
    ],
    total: 1800.9,
  },
  {
    displayId: 'RG0314',
    createdAt: new Date('2021-09-24'),
    paymentDue: new Date('2021-10-01'),
    description: 'Website Redesign',
    paymentTerms: 7,
    clientName: 'John Morrison',
    clientEmail: 'jm@myco.com',
    status: InvoiceStatus.PAID,
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '79 Dover Road',
      city: 'Westhall',
      postCode: 'IP19 3PF',
      country: 'United Kingdom',
    },
    items: [
      {
        name: 'Website Redesign',
        quantity: 1,
        price: 14002.33,
        total: 14002.33,
      },
    ],
    total: 14002.33,
  },
  {
    displayId: 'RT2080',
    createdAt: new Date('2021-10-11'),
    paymentDue: new Date('2021-10-12'),
    description: 'Logo Concept',
    paymentTerms: 1,
    clientName: 'Alysa Werner',
    clientEmail: 'alysa@email.co.uk',
    status: InvoiceStatus.PENDING,
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '63 Warwick Road',
      city: 'Carlisle',
      postCode: 'CA20 2TG',
      country: 'United Kingdom',
    },
    items: [
      {
        name: 'Logo Sketches',
        quantity: 1,
        price: 102.04,
        total: 102.04,
      },
    ],
    total: 102.04,
  },
  {
    displayId: 'AA1449',
    createdAt: new Date('2021-10-7'),
    paymentDue: new Date('2021-10-14'),
    description: 'Re-branding',
    paymentTerms: 7,
    clientName: 'Mellisa Clarke',
    clientEmail: 'mellisa.clarke@example.com',
    status: InvoiceStatus.PENDING,
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '46 Abbey Row',
      city: 'Cambridge',
      postCode: 'CB5 6EG',
      country: 'United Kingdom',
    },
    items: [
      {
        name: 'New Logo',
        quantity: 1,
        price: 1532.33,
        total: 1532.33,
      },
      {
        name: 'Brand Guidelines',
        quantity: 1,
        price: 2500,
        total: 2500,
      },
    ],
    total: 4032.33,
  },
  {
    displayId: 'FV2353',
    createdAt: new Date('2021-11-05'),
    paymentDue: new Date('2021-11-12'),
    description: 'Logo Re-design',
    paymentTerms: 7,
    clientName: 'Anita Wainwright',
    clientEmail: '',
    status: InvoiceStatus.DRAFT,
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    items: [
      {
        name: 'Logo Re-design',
        quantity: 1,
        price: 3102.04,
        total: 3102.04,
      },
    ],
    total: 3102.04,
  },
];
