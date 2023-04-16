import { PrismaClient, Status } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getInvoices().map((invoice) => {
      return db.invoice.create({ data: invoice });
    })
  );
}

seed();

function getInvoices() {
  return [
    {
      displayId: 'RT3080',
      createdAt: new Date('2021-08-18').toISOString(),
      paymentDue: new Date('2021-08-19').toISOString(),
      description: 'Re-branding',
      paymentTerms: 1,
      clientName: 'Jensen Huang',
      clientEmail: 'jensenh@mail.com',
      status: Status.PAID,
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
      displayId: 'XM9141',
      createdAt: new Date('2021-08-21').toISOString(),
      paymentDue: new Date('2021-09-20').toISOString(),
      description: 'Graphic Design',
      paymentTerms: 30,
      clientName: 'Alex Grim',
      clientEmail: 'alexgrim@mail.com',
      status: Status.PENDING,
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '84 Church Way',
        city: 'Bradford',
        postCode: 'BD1 9PB',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'Banner Design',
          quantity: 1,
          price: 156,
          total: 156,
        },
        {
          name: 'Email Design',
          quantity: 2,
          price: 200,
          total: 400,
        },
      ],
      total: 556,
    },
    {
      displayId: 'RG0314',
      createdAt: new Date('2021-09-24').toISOString(),
      paymentDue: new Date('2021-10-01').toISOString(),
      description: 'Website Redesign',
      paymentTerms: 7,
      clientName: 'John Morrison',
      clientEmail: 'jm@myco.com',
      status: Status.PAID,
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
      createdAt: new Date('2021-10-11').toISOString(),
      paymentDue: new Date('2021-10-12').toISOString(),
      description: 'Logo Concept',
      paymentTerms: 1,
      clientName: 'Alysa Werner',
      clientEmail: 'alysa@email.co.uk',
      status: Status.PENDING,
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
      createdAt: new Date('2021-10-7').toISOString(),
      paymentDue: new Date('2021-10-14').toISOString(),
      description: 'Re-branding',
      paymentTerms: 7,
      clientName: 'Mellisa Clarke',
      clientEmail: 'mellisa.clarke@example.com',
      status: Status.PENDING,
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
      displayId: 'TY9141',
      createdAt: new Date('2021-10-01').toISOString(),
      paymentDue: new Date('2021-10-31').toISOString(),
      description: 'Landing Page Design',
      paymentTerms: 30,
      clientName: 'Thomas Wayne',
      clientEmail: 'thomas@dc.com',
      status: Status.PENDING,
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '3964  Queens Lane',
        city: 'Gotham',
        postCode: '60457',
        country: 'United States of America',
      },
      items: [
        {
          name: 'Web Design',
          quantity: 1,
          price: 6155.91,
          total: 6155.91,
        },
      ],
      total: 6155.91,
    },
    {
      displayId: 'FV2353',
      createdAt: new Date('2021-11-05').toISOString(),
      paymentDue: new Date('2021-11-12').toISOString(),
      description: 'Logo Re-design',
      paymentTerms: 7,
      clientName: 'Anita Wainwright',
      clientEmail: '',
      status: Status.DRAFT,
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
}