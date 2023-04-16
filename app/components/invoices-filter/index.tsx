import { CaretDownIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import type { LinksFunction } from '@remix-run/node';
import { Button, links as buttonLinks } from '~/components/ui/button';
import { Form, links as formLinks } from '~/components/ui/form';
import styles from './styles.css';
import {
  CheckboxField,
  links as checkboxFieldLinks,
} from '../ui/checkbox-field';

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
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
    <Popover.Root>
      <Popover.Trigger className='invoices-filter-trigger' asChild>
        <Button variant='secondary-gray'>
          Filter by status <CaretDownIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className='invoices-filter-content'
          sideOffset={8}
          align='start'
        >
          <Form className='invoices-filter-form'>
            <CheckboxField label='Draft' name='status' value='draft' />
            <CheckboxField label='Pending' name='status' value='pending' />
            <CheckboxField label='Paid' name='status' value='paid' />
          </Form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
