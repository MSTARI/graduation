const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const notice = require('./API/notice');
const administrator = require('./API/administrator');
const userInfo = require('./API/userInfo');
const laboratory = require('./API/laboratory');

app.use(bodyParser.json());
app.use('/notice_api', notice);
app.use('/administrator_api', administrator);
app.use('/userInfo_api', userInfo);
app.use('/laboratory_api', laboratory);

app.listen(8080, () => {
    console.log('Success Connect');
});