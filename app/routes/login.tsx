import type { LinksFunction } from '@remix-run/node';
import loginStylesUrl from '~/styles/login.css';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: loginStylesUrl }];
};

export default function LoginRoute() {
  return (
    <div className='login'>
      <header className='login-header'>
        <img src='/logo.svg' alt='logo' />
        <h1 className='text--3xl text--semibold'>Invoice App</h1>
      </header>
      <main className='login-main'>
        <form className='form'>
          <fieldset className='fieldset'>
            <VisuallyHidden.Root>
              <legend className='legend'>Login or Sign Up</legend>
            </VisuallyHidden.Root>
            <div className='field'>
              <label className='label' htmlFor='email-input'>
                Email
              </label>
              <input
                className='input'
                type='email'
                name='email'
                id='email-input'
                required
              />
            </div>
            <div className='field'>
              <label className='label' htmlFor='password-input'>
                Password
              </label>
              <input
                className='input'
                type='password'
                name='password'
                id='password-input'
                required
              />
            </div>
          </fieldset>
          <div className='login-form-buttons'>
            <button type='submit' className='button button-md button-primary'>
              Login
            </button>
            <button
              type='submit'
              className='button button-md button-secondary-gray'
            >
              Sign Up
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
