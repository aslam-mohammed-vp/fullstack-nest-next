'use server';

export async function signOutServer() {
  const response = await fetch(`http://localhost:3002/api/user/logout`, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
}

export async function signUp(
  fullname: string,
  email: string,
  password: string,
) {
  const response = await fetch(`http://localhost:3002/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ fullname, email, password }),
  });

  const result = await response.json();
  return result;
}
