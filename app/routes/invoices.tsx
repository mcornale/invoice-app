import { Outlet } from '@remix-run/react';

export default function InvoicesRoute() {
  return (
    <div>
      <header>logo, mode switch, profile icon</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
