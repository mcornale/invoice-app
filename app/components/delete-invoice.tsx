import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';

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
          <AlertDialogAction asChild>
            <Button type='submit' variant='primary-destructive'>
              Delete
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <Button variant='secondary-gray'>Cancel</Button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
