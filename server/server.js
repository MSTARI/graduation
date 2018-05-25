const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const laboratory = require('./API/laboratory');
const notice = require('./API/notice');
const personInfo = require('./API/personInfo');

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.send(200); // options请求快速返回
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.use('/laboratory_api', laboratory);
app.use('/notice_api', notice);
app.use('/personInfo_api', personInfo);

app.listen(8080, () => {
    console.log('Success Connect');
});