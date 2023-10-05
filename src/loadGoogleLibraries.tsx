import credentialsEncrypted from './credentialsEncrypted.json';
import {decrypt} from "./components/modules/Encryption";
import {getUserEnteredPasscode} from "./components/modules/LocalStorageManager";

export let tokenClient: any = null;

// src/loadLibrary.ts
const loadLibrary = (path: string, callback: () => void) => {
    const script = document.createElement('script');
    script.src = path; // Replace with the library's URL
    script.onload = callback; // Callback to execute when the library is loaded
    document.head.appendChild(script);
};

type Credentials = {
    clientId?: string;
    clientSecret?: string;
    apiKey?: string;
    // Add other profile properties if needed
};

const credentials = () => {
    // Key to store authentication info in localStorage
    let client_id,
        api_key,
        client_secret,
        savedUserEnteredSecret = getUserEnteredPasscode();

    if (savedUserEnteredSecret) {
        client_id = decrypt(credentialsEncrypted.client_id, savedUserEnteredSecret);
        api_key = decrypt(credentialsEncrypted.api_key, savedUserEnteredSecret);
        client_secret = decrypt(credentialsEncrypted.client_secret, savedUserEnteredSecret);
        return {clientId: client_id, apiKey: api_key, clientSecret: client_secret} as Credentials
    } else {
        return {} as Credentials
    }
}

async function initializeGapiClient() {
    const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4'
    await gapi.client.init({
        apiKey: credentials()?.apiKey,
        discoveryDocs: [DISCOVERY_DOC],
    });
}

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

function gisLoaded() {
    const SCOPES = [
        'openid',
        'profile',
        'email',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets.readonly'
    ].join(' ');

    let emptyCallback = () => void 0;
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: credentials()?.clientId || '',
        scope: SCOPES,
        callback: emptyCallback // defined later
    });

    // Set it on Window for testing.
    (window as any).tokenClient = tokenClient;
}

export const loadGoogleLibraries = () => {
    const googleApiLibraryPath = 'https://apis.google.com/js/api.js';
    loadLibrary(googleApiLibraryPath, gapiLoaded);

    const googleGsiClientLibraryPath = 'https://accounts.google.com/gsi/client';
    loadLibrary(googleGsiClientLibraryPath, gisLoaded);
}
