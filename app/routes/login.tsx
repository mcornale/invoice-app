import type { LinksFunction } from '@remix-run/node';
import loginStylesUrl from '~/styles/login.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: loginStylesUrl }];
};

export default function LoginRoute() {
  return (
    <main className='main'>
      <header className='header'>
        <img src='logo.svg' alt='logo' />
        <h1 className='text--3xl text--semibold'>Invoice App</h1>
      </header>
      <form className='form'>
        <div className='input-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='••••••••'
            required
          />
        </div>
        <div className='form__button-group'>
          <button className='button--lg button--primary'>Login</button>
          <button className='button--lg button--secondary-gray'>Sign Up</button>
        </div>
      </form>
    </main>
  );
}
