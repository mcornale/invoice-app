import type {
  LoginFormFields,
  LoginFormFieldErrors,
} from '~/components/login-form';
import { hasSomeTruthyValues, isString } from '~/utils/checkers';
import { ERROR_MESSAGES } from '~/constants/error-messages';
import { isEmpty } from '~/utils/validators';
import bcrypt from 'bcryptjs';
import type { User } from '@prisma/client';

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
    return 'must be at least 6 characters long';
  }
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

export async function verifyPassword(
  password: LoginFormFields['password'],
  passwordHash: User['passwordHash']
) {
  const isPasswordOk = await bcrypt.compare(password, passwordHash);

  return isPasswordOk;
}

export async function getPasswordHash(password: LoginFormFields['password']) {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
}
