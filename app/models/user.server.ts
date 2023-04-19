import type { User } from '@prisma/client';
import { db } from '~/utils/db.server';

export type UserWithoutId = Omit<User, 'id'>;

export async function getUserByUsername(username: User['username']) {
  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    return;
  }

  return user;
}

export async function getUserById(userId: User['id']) {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return;
  }

  return user;
}

export async function createUser(data: UserWithoutId) {
  const user = await db.user.create({
    data: { username: data.username, passwordHash: data.passwordHash },
  });
  return user;
}
