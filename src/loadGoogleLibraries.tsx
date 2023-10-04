import credentials from './credentials.json';

export let tokenClient: any = null;

// src/loadLibrary.ts
const loadLibrary = (path: string, callback: () => void) => {
    const script = document.createElement('script');
    script.src = path; // Replace with the library's URL
    script.onload = callback; // Callback to execute when the library is loaded
    document.head.appendChild(script);
};

async function initializeGapiClient() {
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    await gapi.client.init({
        apiKey: credentials.api_key,
        discoveryDocs: [DISCOVERY_DOC],
    });
    // gapiInited = true;
    // maybeEnableButtons();
}

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

const googleApiLibraryPath = 'https://apis.google.com/js/api.js';
loadLibrary(googleApiLibraryPath, gapiLoaded);

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
        client_id: credentials.client_id,
        scope: SCOPES,
        callback: emptyCallback // defined later
    });

    // Set it on Window for testing.
    (window as any).tokenClient = tokenClient;
    // gisInited = true;
    // maybeEnableButtons();
}


const googleGsiClientLibraryPath = 'https://accounts.google.com/gsi/client';
loadLibrary(googleGsiClientLibraryPath, gisLoaded);