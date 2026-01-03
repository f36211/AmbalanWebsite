// scripts/hash-password.js
// This script generates a secure password hash for you to add to your database.
import bcrypt from 'bcryptjs';

const plainPassword = process.argv[2];

if (!plainPassword) {
  console.error('Usage: node scripts/hash-password.js "your_password_here"');
  process.exit(1);
}

const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

console.log('Copy this hash into the "passwordHash" field of your admin user document in MongoDB:');
console.log(hashedPassword);
