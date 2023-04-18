import type { ActionArgs, LinksFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  links as alertDialogLinks,
} from '~/components/ui/alert-dialog';
import { Button, links as buttonLinks } from '~/components/ui/button';
import styles from './styles.css';
import {
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import type { Invoice } from '@prisma/client';
import { Form } from '~/components/ui/form';
import { db } from '~/utils/db.server';

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...alertDialogLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const action = async ({ params }: ActionArgs) => {
  await db.invoice.delete({ where: { id: params.id } });
  return redirect('/invoices');
};

export default function DeleteInvoiceRoute() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useRouteLoaderData('routes/_app.invoices_.$id') as {
    invoice: Invoice;
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    setDialogOpen(true);
  }, []);

  function handleOpenChange(open: boolean) {
    if (!open) navigate(-1);
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent
        title='Confirm Deletion'
        description={`Are you sure you want to delete invoice #${data.invoice.displayId}? This action cannot be undone.`}
      >
        <div className='delete-invoice-actions'>
          <AlertDialogCancel asChild>
            <Button variant='secondary-gray'>Cancel</Button>
          </AlertDialogCancel>
          <Form method='delete'>
            <Button
              type='submit'
              variant='primary-destructive'
              showSpinner={isSubmitting}
            >
              Delete
            </Button>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
