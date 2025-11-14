// studio.js
require('dotenv').config();
require('child_process').execSync('npx prisma studio', { stdio: 'inherit' });