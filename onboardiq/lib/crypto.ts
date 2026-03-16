import crypto from 'crypto';

const ALGO = 'aes-256-gcm';

export function encryptSensitive(plaintext: string) {
  const key = Buffer.from((process.env.ENCRYPTION_KEY || 'change-me-32-char-key').padEnd(32, '0')).subarray(0, 32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString('base64');
}

export function decryptSensitive(payload: string) {
  const input = Buffer.from(payload, 'base64');
  const iv = input.subarray(0, 12);
  const tag = input.subarray(12, 28);
  const data = input.subarray(28);
  const key = Buffer.from((process.env.ENCRYPTION_KEY || 'change-me-32-char-key').padEnd(32, '0')).subarray(0, 32);
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  return decipher.update(data, undefined, 'utf8') + decipher.final('utf8');
}
