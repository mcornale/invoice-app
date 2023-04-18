import bcrypt from 'bcryptjs';
import type { LoginFormFields } from '~/components/login-form';
import { db } from '~/utils/db.server';
import { getUserIdFromSession, logoutUser } from '~/utils/session.server';

export async function loginUser({ password, username }: LoginFormFields) {
  const user = await db.user.findUnique({
    where: { username },
  });
  if (!user) {
    return;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    return;
  }

  return { id: user.id, username };
}

export async function signUpUser({ password, username }: LoginFormFields) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { passwordHash, username },
  });
  return { id: user.id, username };
}

export async function getUser(request: Request) {
  const userId = await getUserIdFromSession(request);
  if (!userId) {
    return;
  }

  try {
    const user = await db.user.findUnique({
      select: { id: true, username: true },
      where: { id: userId },
    });
    return user;
  } catch {
    throw logoutUser(request);
  }
}
