import type {
  LoginFormFields,
  LoginFormFieldErrors,
} from '~/components/login-form';
import { hasSomeTruthyValues, isString } from '~/utils/checkers';

export function getLoginFormData(
  formData: FormData
): LoginFormFields | undefined {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!isString(username) || !isString(password)) {
    return;
  }

  return {
    username,
    password,
  };
}

export function validateUsername(username: string) {
  if (username.length < 3) {
    return 'Usernames must be at least 3 characters long';
  }
}

export function validatePassword(password: string) {
  if (password.length < 6) {
    return 'Passwords must be at least 6 characters long';
  }
}

export function validateRedirectTo(redirectTo: string) {
  const urls = ['/invoices'];
  if (urls.includes(redirectTo)) {
    return redirectTo;
  }
  return '/invoices';
}

export function getFieldErrors(
  fields: LoginFormFields
): LoginFormFieldErrors | undefined {
  const fieldErrors = {
    username: validateUsername(fields.username),
    password: validatePassword(fields.password),
  };

  return hasSomeTruthyValues(fieldErrors) ? fieldErrors : undefined;
}
