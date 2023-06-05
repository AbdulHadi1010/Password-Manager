import crypto from "crypto";

const secret = '8w5Hd7U9t2jP4A6y1q3R0s5E7g2H3f6G'


export const encrypt = (password) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-ctr", secret, iv);

  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);
  return { iv: iv.toString("hex"), password: encryptedPassword.toString("hex") };
};

export const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    secret,
    Buffer.from(encryption.iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};
