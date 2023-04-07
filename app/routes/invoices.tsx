import { Outlet } from '@remix-run/react';

export default function InvoicesRoute() {
  return (
    <div>
      Hello from Invoices route
      <Outlet />
    </div>
  );
}
