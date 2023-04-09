import type { LinksFunction } from '@remix-run/node';
import loginStylesUrl from '~/styles/login.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: loginStylesUrl }];
};

export default function LoginRoute() {
  return (
    <div className='container'>
      <header className='header'>
        <img src='/logo.svg' alt='logo' />
        <h1 className='text--3xl text--semibold'>Invoice App</h1>
      </header>
      <main className='main'>
        <form className='form'>
          <div className='input-field'>
            <label className='input-field__label'>
              Email
              <input
                className='input-field__input'
                type='email'
                name='email'
                placeholder='Enter your email'
                required
              />
            </label>
          </div>
          <div className='input-field'>
            <label className='input-field__label'>
              Password
              <input
                className='input-field__input'
                type='password'
                name='password'
                placeholder='••••••••'
                required
              />
            </label>
          </div>
          <div className='form__button-group'>
            <button type='submit' className='button button--md button--primary'>
              Login
            </button>
            <button
              type='submit'
              className='button button--md button--secondary-gray'
            >
              Sign Up
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
