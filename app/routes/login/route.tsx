import type { LinksFunction } from '@remix-run/node';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  Form,
  FormField,
  FormFieldset,
  FormLabel,
  FormLegend,
  links as formLinks,
} from '~/components/ui/form';
import { Button, links as buttonLinks } from '~/components/ui/button';
import styles from './styles.css';
import { Input, links as inputLinks } from '~/components/ui/input';

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...inputLinks(),
    ...formLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function LoginRoute() {
  return (
    <div className='login'>
      <header className='login-header'>
        <img src='/logo.svg' alt='logo' />
        <h1>Invoice App</h1>
      </header>
      <main className='login-main'>
        <Form>
          <FormFieldset>
            <VisuallyHidden.Root>
              <FormLegend>Login or Sign Up</FormLegend>
            </VisuallyHidden.Root>
            <FormField>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input id='email' name='email' type='email' required />
            </FormField>
            <FormField>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input id='password' name='password' type='password' required />
            </FormField>
          </FormFieldset>
          <div className='login-form-actions'>
            <Button variant='primary'>Login</Button>
            <Button variant='secondary-gray'>Sign Up</Button>
          </div>
        </Form>
      </main>
    </div>
  );
}
