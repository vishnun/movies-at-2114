import React from 'react';
import { gapi } from "gapi-script";
const CreateSpreadsheetExample = () => {
    const handleCreateSpreadsheet = () => {
        // Load the Drive API
        gapi.load('client:auth2', () => {
            gapi.client?.init({
                apiKey: 'AIzaSyB61Y9gjCdnejgIDZ-AG4oVT9LCvrHGojU', // Your API key
                clientId: '742371489419-9ueaesa8q5q7gnjumikkds0ah4o1fuu5.apps.googleusercontent.com', // Your OAuth 2.0 client ID
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                scope: 'https://www.googleapis.com/auth/drive.file', // Required scope for creating files in Drive
            }).then(() => {
                // API is ready, you can now call the function to create the spreadsheet
                createSpreadsheet();
            });
        });
    };

    const createSpreadsheet = () => {
        debugger;
        // Use the Drive API to create a new spreadsheet
        // @ts-ignore
        gapi.client.drive.files.create({
            resource: {
                name: 'My New Spreadsheet', // Specify the name of the spreadsheet
                mimeType: 'application/vnd.google-apps.spreadsheet', // MIME type for Google Sheets
            },
        }).then((response: any) => {
            console.log('Created spreadsheet:', response.result);
            // Handle the response or perform other actions
        }).catch((error: any) => {
            console.error('Error creating spreadsheet:', error);
        });
    };

    return (
        <div>
            <h2>Create a Spreadsheet</h2>
            <button onClick={handleCreateSpreadsheet}>Create Spreadsheet</button>
        </div>
    );
};

export default CreateSpreadsheetExample
