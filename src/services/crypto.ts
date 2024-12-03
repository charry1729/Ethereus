import { AES, enc } from 'crypto-js';

const SECRET_KEY = process.env.VITE_ENCRYPTION_KEY || 'default-key';

export const encrypt = (data: string): string => {
  return AES.encrypt(data, SECRET_KEY).toString();
};

export const decrypt = (encryptedData: string): string => {
  const bytes = AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(enc.Utf8);
};