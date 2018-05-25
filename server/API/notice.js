const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();
const url = 'mongodb://localhost:27017/';

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

router.get('/', (req, res) => { // 获取公告栏数据
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        const dbo = db.db('graduation');
        dbo.collection('notice').find().sort({_id: -1}).toArray((err, resp) => {
            if(err) throw err;
            res.send(resp);
            db.close();
        });
    });
});

router.post('/add', (req, res) => { // 添加公告
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        dbo.collection("notice").insertOne(result, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/delete', (req, res) => { // 删除公告
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        dbo.collection("notice").deleteOne(result, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

module.exports = router;