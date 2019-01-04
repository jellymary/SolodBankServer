const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require("./database/main");
const file = require("./paymentFile");

const app = express();
app.use(cors({"Access-Control-Allow-Origin": '*'}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.send('Hello, client!');
});

app.post('/forms/any-bank', function (request, response) {
    database.insertAnyBankFormTable(request.body);
    response.json({"success": true});
});

app.post('/forms/own-bank', function (request, response) {
    file.createPDF(request.body);
    response.json({"success": true});
});

app.listen(8000, function () {
    console.log('Server listening on port 8000!');
});