import CryptoJS from "crypto-js";

export const decrypt = (encryptedText: string, secretKey: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const encrypt = (plainText: string, secretKey: string) => {
    return CryptoJS.AES.encrypt(plainText, secretKey).toString();
}