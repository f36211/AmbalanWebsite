import { serialize } from 'cookie';

const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const cookie = serialize('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0), // Set expiry to past date
    path: '/',
  });

  return {
    statusCode: 200,
    headers: { 'Set-Cookie': cookie },
    body: JSON.stringify({ message: 'Logged out' }),
  };
};

export { handler };
