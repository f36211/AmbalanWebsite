import connectDB from './utils/mongodb.js';
import Admin from '../../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;
const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    await connectDB();
    const { username, password } = JSON.parse(event.body);

    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return { statusCode: 401, body: JSON.stringify({ message: 'Invalid credentials' }) };
    }

    if (admin.status !== 'active') {
        return { statusCode: 403, body: JSON.stringify({ message: 'Account is suspended' }) };
    }

    const token = jwt.sign({ userId: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '1d' });

    const cookie = serialize('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    await Admin.updateOne({ _id: admin._id }, { lastLogin: new Date() });

    return {
      statusCode: 200,
      headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: admin.name, username: admin.username, role: admin.role }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Server Error' }) };
  }
};

export { handler };
