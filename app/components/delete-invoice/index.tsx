import type { LinksFunction } from '@remix-run/node';
import { useNavigation } from '@remix-run/react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  links as alertDialogLinks,
} from '../ui/alert-dialog';
import { Button, links as buttonLinks } from '../ui/button';
import { Form, links as formLinks } from '../ui/form';
import styles from './styles.css';

export interface DeleteInvoiceProps {
  invoiceDisplayId: string;
}

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...formLinks(),
    ...alertDialogLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function DeleteInvoice({ invoiceDisplayId }: DeleteInvoiceProps) {
  const navigation = useNavigation();

  const isMarkingAsPaid =
    navigation.state === 'submitting' &&
    navigation.formData.get('intent') === 'delete';

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='primary-destructive'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        title='Confirm Deletion'
        description={`Are you sure you want to delete invoice #${invoiceDisplayId}? This action cannot be undone.`}
      >
        <div className='delete-invoice-actions'>
          <AlertDialogCancel asChild>
            <Button variant='secondary-gray'>Cancel</Button>
          </AlertDialogCancel>
          <Form method='delete'>
            <Button
              type='submit'
              variant='primary-destructive'
              showSpinner={isMarkingAsPaid}
              name='intent'
              value='delete'
            >
              Delete
            </Button>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
