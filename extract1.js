import fs from 'fs/promises';
import readline from 'readline';
import { google } from 'googleapis';

const credentialsFile = 'C:/Users/hirin/Downloads/phonic-agility-426104-k8-f2fdc4beee33.json'; // Replace with your credentials file path
const spreadsheetId = '1JX0fPSfcn-b9mQWS-8HadKYSr54_ta4rK-lIkMl9YCI'; // Replace with your actual spreadsheet ID
const inputJsonFile = 'input.json'; // Replace with your input JSON file path



async function createNewSheet(auth) {
    const sheets = google.sheets({ version: "v4", auth });

    const request = {
        spreadsheetId: spreadsheetId,
        resource: {
            requests: [{
                addSheet: {
                    properties: {
                        title: `New Sheet ${new Date().toLocaleDateString()}`,
                    }
                }
            }]
        }
    };

    try {
        const response = await sheets.spreadsheets.batchUpdate(request);
        const newSheetId = response.data.replies[0].addSheet.properties.sheetId;
        console.log("New sheet created with ID:", newSheetId);
        return newSheetId;
    } catch (error) {
        console.error("Error creating new sheet:", error);
        throw error;
    }
}

async function saveDataToGoogleSheet(auth, sheetId, inputData) {
    const sheets = google.sheets({ version: "v4", auth });

    // Prepare data rows
    const rows = inputData.map(item => [
        item.question_id,
        item.question_type,
        item.short_text,
        item.question_text,
        item.question_key,
        item.content_type,
        item.multimedia_count,
        item.multimedia_format.join(", "),
        item.multimedia_url.join(", "),
        item.thumbnail_url.join(", "),
        item.tag_names.join(", "),
        item.c_options.join(", "),
        item.w_options.join(", "),
        item.options_content_type,
        item.code_data,
        item.code_language,
        item.explanation,
        item.explanation_content_type,
        item.toughness
    ]);

    // Append the headers
    const headers = [
        "question_id", "question_type", "short_text", "question_text", "question_key",
        "content_type", "multimedia_count", "multimedia_format", "multimedia_url",
        "thumbnail_url", "tag_names", "c_options", "w_options", "options_content_type",
        "code_data", "code_language", "explanation", "explanation_content_type", "toughness"
    ];

    const resource = {
        values: [headers, ...rows],  // Include headers in the values array
    };

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: `New Sheet ${new Date().toLocaleDateString()}!A1`,
            valueInputOption: "USER_ENTERED",
            resource: resource,
        });

        console.log("Data saved to Google Sheet successfully.");
    } catch (error) {
        console.error("Error saving data to Google Sheets:", error);
        throw error;
    }
}

async function start() {
    try {
        // Load credentials and authorize
        const credentials = await fs.readFile(credentialsFile);
        const auth = await authorize(JSON.parse(credentials));

        // Create a new sheet
        const authClient = await auth.getClient();
        const newSheetId = await createNewSheet(authClient);

        // Load input data from JSON file
        const inputData = JSON.parse(await fs.readFile(inputJsonFile));

        // Save data to the newly created sheet
        await saveDataToGoogleSheet(authClient, newSheetId, inputData);

        console.log("Process completed successfully.");
    } catch (error) {
        console.error("Error during processing:", error);
    }
}

async function authorize(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    try {
        const token = await fs.readFile('token.json');
        oAuth2Client.setCredentials(JSON.parse(token));
    } catch (err) {
        await getNewToken(oAuth2Client);
    }

    return oAuth2Client;
}

async function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/spreadsheets']
    });

    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the code from that page here: ', async (code) => {
        rl.close();
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        await fs.writeFile('token.json', JSON.stringify(tokens));
    });
}

// Start the process
start();
