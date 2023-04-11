import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

export default function IndexRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('invoices', { replace: true });
  }, [navigate]);
}
