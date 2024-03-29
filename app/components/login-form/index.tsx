import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { LinksFunction } from '@remix-run/node';
import type { FormProps } from '~/components/ui/form';
import {
  FormError,
  Form,
  FormField,
  FormFieldset,
  FormLabel,
  FormLegend,
  links as formLinks,
} from '~/components/ui/form';
import styles from './styles.css';
import { Input, links as inputLinks } from '../ui/input';
import { Button, links as buttonLinks } from '../ui/button';
import { useNavigation, useSearchParams } from '@remix-run/react';
import { upperFirst } from '~/utils/formatters';

export interface LoginFormFields {
  username: string;
  password: string;
}

export interface LoginFormFieldErrors {
  username?: string;
  password?: string;
}

export interface LoginFormProps extends FormProps {
  fields?: LoginFormFields;
  fieldErrors?: LoginFormFieldErrors;
  formErrors?: string[];
}

export const links: LinksFunction = () => {
  return [
    ...formLinks(),
    ...inputLinks(),
    ...buttonLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function LoginForm({
  fieldErrors,
  formErrors,
  ...props
}: LoginFormProps) {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const redirectTo = searchParams.get('redirectTo') ?? undefined;
  const isSubmitting = navigation.state === 'submitting';
  const isLoggingIn =
    isSubmitting && navigation.formData?.get('intent') === 'login';
  const isSigningUp =
    isSubmitting && navigation.formData?.get('intent') === 'sign-up';

  return (
    <Form className='login-form' {...props}>
      <FormFieldset>
        <VisuallyHidden.Root>
          <FormLegend>Login or Sign Up</FormLegend>
        </VisuallyHidden.Root>
        <FormField>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input id='username' name='username' type='text' />
          {fieldErrors?.username && (
            <FormError>{fieldErrors.username}</FormError>
          )}
        </FormField>
        <FormField>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input id='password' name='password' type='password' />
          {fieldErrors?.password && (
            <FormError>{fieldErrors.password}</FormError>
          )}
        </FormField>
      </FormFieldset>
      <Input type='hidden' name='redirectTo' value={redirectTo} />
      <div className='login-form-actions'>
        <Button
          name='intent'
          value='login'
          variant='primary'
          showSpinner={isLoggingIn}
        >
          Login
        </Button>
        <Button
          name='intent'
          value='sign-up'
          variant='secondary-gray'
          showSpinner={isSigningUp}
        >
          Sign Up
        </Button>
      </div>
      <FormField>
        <div className='login-form-errors'>
          {formErrors && (
            <FormField>
              {formErrors?.map((formError, index) => (
                <FormError key={index}>{upperFirst(formError)}</FormError>
              ))}
            </FormField>
          )}
        </div>
      </FormField>
    </Form>
  );
}
