import { CaretDownIcon } from '@radix-ui/react-icons';
import type { LinksFunction } from '@remix-run/node';
import { Button, links as buttonLinks } from '~/components/ui/button';
import { Form, links as formLinks } from '~/components/ui/form';
import styles from './styles.css';
import {
  CheckboxField,
  links as checkboxFieldLinks,
} from '../ui/checkbox-field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  links as popoverLinks,
} from '../ui/popover';

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...popoverLinks(),
    ...checkboxFieldLinks(),
    ...formLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function InvoicesFilter() {
  return (
    <Popover>
      <PopoverTrigger className='invoices-filter-trigger' asChild>
        <Button variant='secondary-gray'>
          Filter by status <CaretDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='invoices-filter-content'>
        <Form className='invoices-filter-form'>
          <CheckboxField label='Draft' name='status' value='draft' />
          <CheckboxField label='Pending' name='status' value='pending' />
          <CheckboxField label='Paid' name='status' value='paid' />
        </Form>
      </PopoverContent>
    </Popover>
  );
}
