import { createCipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";


export const encrypt = async (data: string) => {
    const iv = randomBytes(16);
    const password = process.env.ENCRYPTION_KEY;
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    return Buffer.concat([cipher.update(data), cipher.final()]).toString()
}