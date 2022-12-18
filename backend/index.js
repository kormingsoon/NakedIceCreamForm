require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const PersonInfo = require("./model/personInfo");
const PORT = process.env.PORT || 8080;

// ---- TWILIO API --------
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 

// ---- GOOGLE API --------
const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
    keyFile: "keys.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets", 
});
const authClientObject = auth.getClient();
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const contactIndex = "Sheet1!D:D";
app.use(express.json());
app.use(cors());

app.post('/api/sms', (req, res) => {
    res.header('Content-Type', 'application/json');
    const personInfo = new PersonInfo(req.body);
    console.log(personInfo);
    googleSheetsInstance.spreadsheets.values.batchGet({
        spreadsheetId, 
        ranges: contactIndex,
        auth
    }).then(data => data.data.valueRanges[0].values)
    .then(data => data.flat())
    .then(existingPhoneNum => {
        if (existingPhoneNum.includes(personInfo.phoneNum.slice(1))) {
            console.log("Duplicate Number Detected.");
            res.send(JSON.stringify({ response: "duplicate" }));
        } else {
            client.messages
            .create({
            from: process.env.TWILIO_ALPHANUM,
            to: personInfo.phoneNum,
            messagingServiceSid: process.env.TWILIO_MESSAGE_SID,
            body: `\nWelcome to Naked Ice Cream, ${personInfo.name}! 
               \nShow this message to our staff to get a $2 discount off when you spend min. $10 in store.`
            })
            .then(() => {
                googleSheetsInstance.spreadsheets.values.append({
                    auth, 
                    spreadsheetId, 
                    range: "Sheet1!A:I", //sheet name and range of cells
                    valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
                    resource: {
                        values: [[
                            new Date(), personInfo.name, personInfo.age, personInfo.phoneNum,
                            personInfo.first, personInfo.second, personInfo.third, personInfo.goal
                        ]],
                    },
                });
                res.send(JSON.stringify({ response: "valid" }));
            })
            .catch(err => {
                console.log(err);
                res.send(JSON.stringify({ response: "error" }));
            });
        } 
    });    
});

app.listen(PORT, () =>
  console.log(`Express server is running on localhost:${PORT}`)
);