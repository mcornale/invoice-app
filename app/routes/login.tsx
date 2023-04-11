import type { LinksFunction } from '@remix-run/node';
import loginStylesUrl from '~/styles/login.css';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Form, InputField } from '~/components/fom';
import { Button } from '~/components/button';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: loginStylesUrl }];
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
          <fieldset>
            <VisuallyHidden.Root>
              <legend>Login or Sign Up</legend>
            </VisuallyHidden.Root>
            <InputField label='Email' name='email' type='email' required />
            <InputField
              label='Password'
              name='password'
              type='password'
              required
            />
          </fieldset>
          <div className='login-form-buttons'>
            <Button variant='primary'>Login</Button>
            <Button variant='secondary-gray'>Sign Up</Button>
          </div>
        </Form>
      </main>
    </div>
  );
}
