import type { ActionArgs, LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import {
  getFieldErrors,
  getLoginFormData,
  validateRedirectTo,
} from '~/helpers/login';
import { badRequest } from '~/utils/request.server';
import { db } from '~/utils/db.server';
import type { LoginFormFieldErrors } from '~/components/login-form';
import { LoginForm, links as loginFormLinks } from '~/components/login-form';
import { useActionData } from '@remix-run/react';

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

  switch (intent) {
    case 'login':
      return badRequest({
        fieldErrors: null,
        formError: `Not implemented ${intent}`,
      });
    case 'sign-up':
      const userExists = await db.user.findUnique({
        where: { username },
      });

      if (userExists) {
        return badRequest<ActionData>({
          fieldErrors: undefined,
          formErrors: [`User with username ${username} already exists`],
        });
      }

      return badRequest({
        fieldErrors: null,
        formError: `Not implemented ${intent}`,
      });
    default:
      return badRequest({
        fieldErrors: null,
        formError: `Unhandled intent ${intent}`,
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
