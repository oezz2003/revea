'use server';

import {cookies} from 'next/headers';

const FAKE_USER_ID = 'user123';
const SESSION_COOKIE_NAME = 'app_session';

export async function createSession() {
  cookies().set(SESSION_COOKIE_NAME, FAKE_USER_ID, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
}

export async function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
  const session = cookies().get(SESSION_COOKIE_NAME);
  if (!session) {
    return null;
  }
  return {
    userId: session.value,
  };
}
