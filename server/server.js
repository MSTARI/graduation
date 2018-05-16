const express = require('express');

const app = express();
const notice = require('./API/notice');
const administrator = require('./API/administrator');
const userInfo = require('./API/userInfo');

app.use('/notice_api', notice);
app.use('/administrator_api', administrator);
app.use('/userInfo_api', userInfo);

app.listen(8080, () => {
    console.log('Success Connect');
});