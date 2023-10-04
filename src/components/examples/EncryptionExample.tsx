import React, {useState} from 'react';
import {Container, Grid, ThemeProvider, Typography} from "@mui/material";
import CryptoJS from "crypto-js";

const EncryptionExample = () => {

    const [plainText, setPlainText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [secretKey, setSecretKey] = useState('magic-masala');

    const handleEncrypt = () => {
        const ciphertext = CryptoJS.AES.encrypt(plainText, secretKey).toString();
        setEncryptedText(ciphertext);
    };

    const handleDecrypt = () => {
        const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        setDecryptedText(decryptedData);
    };
    return (
        <div>
            <Grid item>
                <div>
                    <h2>Encryption using Crypto-JS Example</h2>
                    <div>
                        <label>Enter SecretKey: </label>
                        <input type="text" value={secretKey} onChange={(e) => setSecretKey(e.target.value)}/>
                        <br/>
                    </div>
                    <br/>
                    <div>
                        <label>Enter Text: </label>
                        <input type="text" value={plainText} onChange={(e) => setPlainText(e.target.value)}/>
                        <br/>
                        <button onClick={handleEncrypt}>Encrypt</button>
                    </div>
                    <br/>
                    <div>
                        <div>
                            <label>Enter Encrypted Text: </label>
                            <input type="text" value={encryptedText} onChange={(e) => setEncryptedText(e.target.value)}/>
                        </div>
                        <br/>
                        <button onClick={handleDecrypt}>Decrypt</button>
                    </div>
                    <div>
                        <p>Encrypted Text: {encryptedText}</p>
                        <p>Decrypted Text: {decryptedText}</p>
                    </div>
                </div>
            </Grid>
        </div>
    );
};

export default EncryptionExample;
