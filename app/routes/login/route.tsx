import type { ActionFunctionArgs, LinksFunction, LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';
import styles from './styles.css?url';
import {
  getFieldErrors,
  getLoginFormData,
  getPasswordHash,
  verifyPassword,
} from '~/helpers/user';
import { badRequest } from '~/utils/request.server';
import type { LoginFormFieldErrors } from '~/components/login-form';
import { LoginForm, links as loginFormLinks } from '~/components/login-form';
import { useActionData } from 'react-router';
import {
  createUserSession,
  getUserIdFromSession,
} from '~/utils/session.server';
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromSession(request);
  if (userId) return redirect('/invoices');
  return {};
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent');

  const typedFormData = getLoginFormData(formData);
  if (!typedFormData)
    return badRequest<ActionData>({
      fieldErrors: undefined,
      formErrors: ['form not submitted correctly'],
    });

  const redirectTo = formData.get('redirectTo') as string;
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

      return createUserSession(retrievedUser.id, redirectTo);
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
      return createUserSession(createdUser.id, redirectTo);
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
