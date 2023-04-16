import type { LinksFunction } from '@remix-run/node';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Form, links as formLinks } from '~/components/ui/form';
import { Button, links as buttonLinks } from '~/components/ui/button';
import styles from './styles.css';
import { Fieldset, links as fieldsetLinks } from '~/components/ui/fieldset';
import { Legend, links as legendLinks } from '~/components/ui/legend';
import {
  InputField,
  links as inputFieldLinks,
} from '~/components/ui/input-field';

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...fieldsetLinks(),
    ...legendLinks(),
    ...inputFieldLinks(),
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
          <Fieldset className='fieldset'>
            <VisuallyHidden.Root>
              <Legend>Login or Sign Up</Legend>
            </VisuallyHidden.Root>
            <InputField label='Email' name='email' type='email' required />
            <InputField
              label='Password'
              name='password'
              type='password'
              required
            />
          </Fieldset>
          <div className='login-form-actions'>
            <Button variant='primary'>Login</Button>
            <Button variant='secondary-gray'>Sign Up</Button>
          </div>
        </Form>
      </main>
    </div>
  );
}
