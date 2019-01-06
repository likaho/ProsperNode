const express = require('express');
const bodyParser = require('body-parser');

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');


let app = express();
app.use(bodyParser.json());

app.get('/', function (request, response) {
    var employees = [
        {
            FirstName: "Jalpesh",
            LastName: "Vadgama"
        }
    ];

    response.json(employees);
});

app.post('/submit', function (request, response) {

    //console.log(request.body);      // your JSON
    const provider = new HDWalletProvider(
        'bracket differ until trim .....',
        'https://rinkeby.infura.io/CMbQSe.....'
    );
    const web3 = new Web3(provider);

    let message;
    const callFunction = async () => {
        let accounts = await web3.eth.getAccounts();
        const jsonContent = '[{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getSubmissionDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getLenderLegalEntityId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getIndexAmountCatagory","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getHashedContent","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllIndex","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"companyRegIdInsertDateTime","type":"uint256"},{"name":"submissionDate","type":"uint256"},{"name":"lenderLegalEntityId","type":"uint256"},{"name":"indexAmountCatagory","type":"uint256"},{"name":"hashContent","type":"string"}],"name":"insertJournal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getIndexCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';

        let companyRegIdInsertDateTime = request.body.CompanyRegIdInsertDateTime;
        let submissionDate = request.body.SubmissionDate;
        let lenderLegalEntityId = request.body.LenderLegalEntityId;
        let amountCatagory = request.body.AmountCatagory;
        let hashContent = request.body.HashContent;

        var contract = new web3.eth.Contract(JSON.parse(jsonContent), '0x91944db7ba387878acb355e9941792af311af93c');
        var transactionId = await contract.methods.insertJournal(companyRegIdInsertDateTime, submissionDate, lenderLegalEntityId, amountCatagory, hashContent).send({ from: accounts[0], gas: '144487' });
        //var transactionId = await contract.methods.insertJournal(125, 1802161225, 23, 3, '4D47B1A133053FCE2F86A85A89EB').send({ from: accounts[0], gas: '144487' });
        //console.log(transactionId);
        message = await contract.methods.getIndexCount().call();
        response.json({ count: message, trxId: transactionId  });
        //console.log('Contract getIndexCount: ' + message);
    };

    callFunction();


});

//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

// production error handler
// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

app.set('port', process.env.PORT || 3000);

//var server = app.listen(app.get('port'), function () {
//    //debug('Express server listening on port ' + server.address().port);
//});
var server = app.listen(app.get('port'));


