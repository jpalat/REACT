process.env.HTTP_PROXY = "http://127.0.0.1:1087";
process.env.HTTPS_PROXY = "http://127.0.0.1:1087";

const { google } = require("googleapis");
const auth = require("./credentials-load");
const fs = require('fs');

async function run() {
    //create sheets client
    const sheets = google.sheets({ version: "v4", auth });
    //get a range of values
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: "1WkTpMruPBlfsJM_jsyGhGr8TZalgKAug_eq5DHIqAgU",
        range: "Sheet1!A1:F"
    });
    //print results
    console.log(JSON.stringify(res.data, null, 2));
    console.log(typeof(res.data))
    fs.writeFile('data.csv',JSON.stringify(res.data, null, 2), (err) => {
        if (err) throw err;
    });
}

run().catch(err => console.error("ERR", err));