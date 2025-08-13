'use server';

import {
  getProductRecommendations,
  type ProductRecommendationsInput,
} from '@/ai/flows/product-recommendations';
import {createSession, deleteSession} from '@/lib/session';
import {redirect} from 'next/navigation';

export async function getRecommendationsAction(
  input: ProductRecommendationsInput
) {
  try {
    const result = await getProductRecommendations(input);
    return {success: true, data: result.products};
  } catch (error) {
    console.error(error);
    return {success: false, error: 'Failed to get recommendations.'};
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // For demonstration, we'll use a mock user.
  // In a real app, you'd look up the user in a database.
  if (email === 'm@example.com' && password === 'password') {
    await createSession();
    redirect('/');
  }

  return {error: 'Invalid email or password'};
}

export async function logoutAction() {
  await deleteSession();
  redirect('/login');
}

export async function searchAction(formData: FormData) {
  // Redirect to product page
  const query = formData.get('query') as string;
  redirect('/product');
}
