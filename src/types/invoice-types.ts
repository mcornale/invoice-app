export type Invoice = {
  id: string;
  senderAddress: InvoiceAddress;
  clientAddress: InvoiceAddress;
  clientEmail: string;
  clientName: string;
  createdAt: string;
  paymentDue: string;
  paymentTerms: number;
  description: string;
  items: InvoiceItems;
  status: string;
  total: number;
};

export type InvoiceAddress = {
  city: string;
  country: string;
  postCode: string;
  street: string;
};

export type InvoiceItems = InvoiceItem[];

export type InvoiceItem = {
  name: string;
  price: number;
  quantity: number;
  total: number;
};
