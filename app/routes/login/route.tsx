import type { ActionArgs, LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import {
  getFieldErrors,
  getLoginFormData,
  getPasswordHash,
  validateRedirectTo,
  verifyPassword,
} from '~/helpers/user';
import { badRequest } from '~/utils/request.server';
import type { LoginFormFieldErrors } from '~/components/login-form';
import { LoginForm, links as loginFormLinks } from '~/components/login-form';
import { useActionData } from '@remix-run/react';
import { createUserSession } from '~/utils/session.server';
import { createUser, getUserByUsername } from '~/models/user.server';

export interface ActionData {
  fieldErrors?: LoginFormFieldErrors;
  formErrors?: string[];
}

export const links: LinksFunction = () => {
  return [
    ...loginFormLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent');

  const typedFormData = getLoginFormData(formData);
  if (!typedFormData)
    return badRequest({
      fieldErrors: null,
      formError: 'Form not submitted correctly',
    });

  const redirectTo = formData.get('redirectTo') as string;
  const validRedirectTo = validateRedirectTo(redirectTo);
  const { username, password } = typedFormData;

  const fieldErrors = getFieldErrors(typedFormData);
  if (fieldErrors) {
    return badRequest<ActionData>({
      fieldErrors,
      formErrors: undefined,
    });
  }

  const retrievedUser = await getUserByUsername(username);

  switch (intent) {
    case 'login':
      if (!retrievedUser)
        return badRequest<ActionData>({
          fieldErrors: undefined,
          formErrors: [
            `User with username '${username}' doesn't exist. You must sign up`,
          ],
        });

      const canLogin = await verifyPassword(
        password,
        retrievedUser.passwordHash
      );
      if (!canLogin)
        return badRequest<ActionData>({
          fieldErrors: undefined,
          formErrors: ['username/password combination is incorrect'],
        });

      return createUserSession(retrievedUser.id, validRedirectTo);
    case 'sign-up':
      if (retrievedUser) {
        return badRequest<ActionData>({
          fieldErrors: undefined,
          formErrors: [
            `User with username '${username}' already exists. You must login`,
          ],
        });
      }
      const passwordHash = await getPasswordHash(password);
      const createdUser = await createUser({ username, passwordHash });
      return createUserSession(createdUser.id, validRedirectTo);
    default:
      return badRequest<ActionData>({
        fieldErrors: undefined,
        formErrors: [`unhandled intent: ${intent}`],
      });
  }
};

export default function LoginRoute() {
  const actionData = useActionData<ActionData>();

  return (
    <div className='login'>
      <header className='login-header'>
        <img src='/logo.svg' alt='logo' />
        <h1>Invoice App</h1>
      </header>
      <main className='login-main'>
        <LoginForm
          method='post'
          fieldErrors={actionData?.fieldErrors}
          formErrors={actionData?.formErrors}
        />
      </main>
    </div>
  );
}
