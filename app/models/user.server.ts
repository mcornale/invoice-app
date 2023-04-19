import type { User } from '@prisma/client';
import { db } from '~/utils/db.server';

export type UserWithoutId = Omit<User, 'id'>;

export async function getUserByUsername(username: User['username']) {
  return db.user.findUnique({
    where: { username },
  });
}

export async function getUserById(userId: User['id']) {
  return db.user.findUnique({
    where: { id: userId },
  });
}

export async function createUser(data: UserWithoutId) {
  return db.user.create({
    data: { username: data.username, passwordHash: data.passwordHash },
  });
}
