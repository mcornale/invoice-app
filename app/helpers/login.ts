import type {
  LoginFormFields,
  LoginFormFieldErrors,
} from '~/components/login-form';
import { hasSomeTruthyValues, isString } from '~/utils/checkers';
import { ERROR_MESSAGES } from '~/utils/error-messages';
import { isEmpty } from '~/utils/validators';

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

export function validateUsername(val: string) {
  if (isEmpty(val)) {
    return ERROR_MESSAGES.EMPTY;
  }
}

export function validatePassword(val: string) {
  if (val.length < 6) {
    return 'must be at least 6 chars long';
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
