const express = require('express');
const router = express();
const req = require('request');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const weather = require('yahoo-weather')
const morgan = require('morgan')

// process.env.PORT 
const port = process.env.PORT || 8081;

// simple morgan logger in file

var logFile = fs.createWriteStream('./myLogFile.log', { flags: 'a' });
router.use(morgan("combined", { stream: logFile }))

// make express look in the public directory for assets (css/js/img)

router.use(express.static(__dirname + '/public'));

router.get('/display', (request, response) => {

    response.sendFile(__dirname + '/public/display.html');
});

router.get('/lezioni', (request, response) => {
    response.json(lezioni);
})

router.get('/news', (request, response) => {
    var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=it&' +
        'apiKey=5ab86827db7244ac9b0bd0a944b8395d';
    req(url, function(error, news, body) {
        response.json(news)
    })

})


router.get('/weather', (request, response) => {
    var city = "fisciano";
    var temperature = 'f';
    weather(city, temperature).then(tempo => {
        response.json(tempo)
            // second arg is the weather unit. you can pass 'c' or 'f'. defaults to 'c'.
            // Do what you want with `info`!
    }).catch(err => {
        // Oops! Errors! :(
    });
})

router.post("/login"), (request, response) => {
    console.log(request.body)
}
router.get('/messages', (request, response) => {
        // If modifying these scopes, delete token.json.
        const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
        const TOKEN_PATH = 'token.json';
        var messagesArr = [];
        // Load client secrets from a local file.
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Gmail API.
            authorize(JSON.parse(content), getRecentEmail)
        });

        /**
         * Create an OAuth2 client with the given credentials, and then execute the
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
                if (err) return getNewToken(oAuth2Client, callback);
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
        function getNewToken(oAuth2Client, callback) {
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

        /**
         * Get the recent email from your Gmail account
         *
         * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
         */
        function getRecentEmail(auth) {
            var gmail = google.gmail('v1');
            // Only get the recent email - 'maxResults' parameter
            gmail.users.messages.list({ auth: auth, userId: 'me', maxResults: 10, }, function(err, info) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                }

                // Retreive the actual message using the message id
                gmail.users.messages.get({ auth: auth, userId: 'me', 'id': info.data.messages[0]['id'] }, function(err, message) {
                    if (err) {

                        console.log('The API returned an error: ' + err);
                        return;
                    }
                    // Thanks to https://www.codediesel.com/nodejs/how-to-access-gmail-using-nodejs-and-the-gmail-api/
                    message_raw = message.data.payload.parts[0].body.data;
                    data = message_raw;
                    buff = new Buffer(data, 'base64');
                    text = buff.toString();

                    messagesArr.push(text)

                    response.json(messagesArr)
                });



            });
            //response.send(messagesArr[0]) // NON FUNZIONA
        }

    })
    //Express error handling middleware
router.use((request, response) => {
    response.type('text/plain');
    response.status(505);
    response.send('Error page');
});


router.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});