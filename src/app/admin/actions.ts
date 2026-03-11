'use server';

export async function verifyAdmin(username?: string, password?: string) {
  const envUsername = process.env.ADMIN_USERNAME;
  const envPassword = process.env.ADMIN_PASSWORD;

  if (
    username &&
    password &&
    envUsername &&
    envPassword &&
    username === envUsername &&
    password === envPassword
  ) {
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}
