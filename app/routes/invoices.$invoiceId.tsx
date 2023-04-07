import { Outlet } from '@remix-run/react';

export default function InvoiceRoute() {
  return (
    <div>
      <p>Some invoice details</p>
      <Outlet />
    </div>
  );
}
