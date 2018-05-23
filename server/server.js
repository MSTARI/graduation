const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const laboratory = require('./API/laboratory');
const notice = require('./API/notice');
const personInfo = require('./API/personInfo');

app.use(bodyParser.json());
app.use('/laboratory_api', laboratory);
app.use('/notice_api', notice);
app.use('/personInfo_api', personInfo);

app.listen(8080, () => {
    console.log('Success Connect');
});