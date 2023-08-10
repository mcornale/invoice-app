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
import { useSubmit } from '@remix-run/react';
import type { FormEvent } from 'react';
import { InvoiceStatus } from '@prisma/client';

export interface InvoicesFilterProps {
  activeStatus: InvoiceStatus[];
}

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

export function InvoiceListFilter({ activeStatus }: InvoicesFilterProps) {
  const submit = useSubmit();
  const matches = useMediaQuery('(max-width: 40em)');

  const filterByStatusText = matches ? (
    <>
      Filter <VisuallyHidden.Root>by status</VisuallyHidden.Root>
    </>
  ) : (
    'Filter by status'
  );

  function handleChange(event: FormEvent<HTMLFormElement>) {
    event.stopPropagation();
    submit(event.currentTarget, { replace: true });
  }

  return (
    <Popover>
      <PopoverTrigger className='invoice-list-filter-trigger' asChild>
        <Button variant='secondary-gray'>
          {filterByStatusText} <CaretDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='invoice-list-filter-content'>
        <Form
          method='get'
          className='invoice-list-filter-form'
          onChange={handleChange}
        >
          <FormField>
            <FormLabel htmlFor='draft'>Draft</FormLabel>
            <InputCheckbox
              id='draft'
              name='status'
              defaultChecked={activeStatus.includes(InvoiceStatus.DRAFT)}
              value={InvoiceStatus.DRAFT}
            />
          </FormField>
          <FormField>
            <FormLabel htmlFor='pending'>Pending</FormLabel>
            <InputCheckbox
              id='pending'
              name='status'
              defaultChecked={activeStatus.includes(InvoiceStatus.PENDING)}
              value={InvoiceStatus.PENDING}
            />
          </FormField>
          <FormField>
            <FormLabel htmlFor='paid'>Paid</FormLabel>
            <InputCheckbox
              id='paid'
              name='status'
              defaultChecked={activeStatus.includes(InvoiceStatus.PAID)}
              value={InvoiceStatus.PAID}
            />
          </FormField>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
