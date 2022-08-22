import crypto from 'crypto';

const encrypt = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return `${salt}:${hash}`;
};

const compare = (password: string, hashed: string) => {
  const [salt, hash] = hashed.split(':');
  const hashNew = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash === hashNew;
};
export default { encrypt, compare };
