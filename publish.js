import { publish } from 'libnpmpublish';
import { readFileSync } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const pkg = JSON.parse(readFileSync('./dist/apstorylogger/package.json', 'utf8'));
const tarball = readFileSync('./dist/apstorylogger/apstory-logger-angular-22.0.0.tgz');

rl.question('OTP: ', async (otp) => {
  try {
    const result = await publish(pkg, tarball, { 
      forceAuth: { otp: otp.trim() },
      access: 'public'
    });
    console.log('Published successfully!');
  } catch (err) {
    console.error('Publish failed:', err.message);
  }
  rl.close();
});
