import type { LinksFunction } from '@remix-run/node';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  links as alertDialogLinks,
} from '../ui/alert-dialog';
import { Button, links as buttonLinks } from '../ui/button';
import styles from './styles.css';

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

export function DeleteInvoice() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='primary-destructive'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        title='Confirm Deletion'
        description='Are you sure you want to delete invoice #XM9141? This action cannot be undone.'
      >
        <div className='delete-invoice-actions'>
          <AlertDialogCancel asChild>
            <Button variant='secondary-gray'>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type='submit' variant='primary-destructive'>
              Delete
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
