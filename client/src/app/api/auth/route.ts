'use server';

export async function signOutServer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/api/user/logout`,
    {
      method: 'GET',
    },
  );
  const result = await response.json();
  return { ...result, status: response.status };
}

export async function signUp(
  fullname: string,
  email: string,
  password: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/api/user/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ fullname, email, password }),
    },
  );

  const result = await response.json();
  return result;
}
