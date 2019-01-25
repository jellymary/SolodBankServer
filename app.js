const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');

const database = require("./database/main");

const app = express();
// app.use(cors({"Access-Control-Allow-Origin": '*'}));
app.use(cors({origin: '*'}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.send('Hello, client!');
});

app.post('/forms/any-bank', function (request, response) {
    database.insertAnyBankFormTable(request.body);
    response.json({"success": true});
});

app.get('/forms/own-bank', function(req, res){
    res.setHeader('Content-disposition', 'attachment; filename="payment.pdf"');
    res.setHeader('Content-type', 'application/pdf');

    const {inn, bik, accountNumber, reason, nds, sum} = req.query;
    const doc = new PDFDocument();
    doc
        .fontSize(20)
        .text(`INN: ${inn}`)
        .text(`BIK: ${bik}`)
        .text(`Account Number: ${accountNumber}`)
        .text(`For: ${reason}`)
        .text(`NDS: ${nds}%`)
        .text(`Sum: ${sum}`);
    doc.pipe(res);
    doc.end();
});

app.listen(8000, function () {
    console.log('Server listening on port 8000!');
});