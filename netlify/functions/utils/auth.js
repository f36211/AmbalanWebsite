import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import Admin from '../../../models/adminModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyAuth(event, { requiredRole = 'admin' } = {}) {
    const cookies = parse(event.headers.cookie || '');
    const token = cookies.jwt;

    if (!token) {
        return { authorized: false, error: 'Not authorized, no token' };
    }

    try {
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables.');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const admin = await Admin.findById(decoded.userId).select('-passwordHash');

        if (!admin || admin.status !== 'active') {
            return { authorized: false, error: 'Admin not found or is not active' };
        }

        if (requiredRole === 'super_admin' && admin.role !== 'super_admin') {
             return { authorized: false, error: 'Super admin access required' };
        }
        
        return { authorized: true, admin };

    } catch (error) {
        console.error("Auth verification error:", error.message);
        return { authorized: false, error: 'Not authorized, token failed' };
    }
}
