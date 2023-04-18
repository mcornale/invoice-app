import { CaretDownIcon } from '@radix-ui/react-icons';
import type { LinksFunction } from '@remix-run/node';
import { Button, links as buttonLinks } from '~/components/ui/button';
import {
  Form,
  FormField,
  FormLabel,
  links as formLinks,
} from '~/components/ui/form';
import styles from './styles.css';
import { InputCheckbox, links as inputLinks } from '../ui/input';
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
    ...inputLinks(),
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
          <FormField>
            <FormLabel htmlFor='draft'>Draft</FormLabel>
            <InputCheckbox id='draft' name='status' value='draft' />
          </FormField>
          <FormField>
            <FormLabel htmlFor='pending'>Pending</FormLabel>
            <InputCheckbox id='pending' name='status' value='pending' />
          </FormField>
          <FormField>
            <FormLabel htmlFor='paid'>Paid</FormLabel>
            <InputCheckbox id='paid' name='status' value='paid' />
          </FormField>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
