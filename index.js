require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const moment = require('moment');

const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = `${process.env.CONFIG_PATH}/${process.env.TOKEN_FILE_NAME}`;

// 1. Load client secrets from a local file.
fs.readFile(`${process.env.CONFIG_PATH}/${process.env.CREDENTIAL_FILE_NAME}`, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), uploadFile);
});

/**
 * 2. Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function uploadFile(auth) {
    const path = `${process.env.CONFIG_PATH}/${process.env.BACKUP_FILE_NAME}`;
    const MimeType = `${process.env.BACKUP_FILE_MIMETYPE}`;
    //application/octet-stream for sql
    //application/x-tar for .tar
    //application/gzip for .gz
    const drive = google.drive({ version: 'v3', auth });
    const date = moment().format('DD-MM-YYYY-HH-mm-ss');
    const FileName = (date + '-' + path.substring(path.lastIndexOf('/') + 1)).toString()
    try {
        var fileMetadata = {
            name: FileName,
            //parents: ['Drive Folder ID where you want to upload the file']
            parents: [`${process.env.DRIVE_FOLDER_ID}`]
        };

        var media = {
            mimeType: MimeType,
            body: fs.createReadStream(path)
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, file) {
            if (err) {
                //rename the file
                fs.renameSync(path, `${process.env.CONFIG_PATH}/${FileName}`)
                // Handle error
                console.error('error while uplaoding file', err);
            } else {
                console.log('Success File : ', file.data.id);
                //delete the local file after upload
                fs.unlinkSync(path)
            }
        });
    } catch (e) {
        //filed file store on this dir.
        fs.renameSync(path, `${process.env.CONFIG_PATH}/${FileName}`)
        // log the error
        console.error('error while uplaoding file try/catch-> ', e);
    }

}

