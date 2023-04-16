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
import { useMediaQuery } from '~/hooks/use-media-query';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

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
  const matches = useMediaQuery('(max-width: 40em)');
  return (
    <Popover>
      <PopoverTrigger className='invoices-filter-trigger' asChild>
        <Button variant='secondary-gray'>
          {matches ? (
            <>
              Filter <VisuallyHidden.Root>by status</VisuallyHidden.Root>
            </>
          ) : (
            'Filter by status'
          )}
          <CaretDownIcon />
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
