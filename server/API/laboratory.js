const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();
const url = 'mongodb://localhost:27017/';

router.get('/', (req, res) => { // 获取实验室数据
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        const dbo = db.db('graduation');
        dbo.collection('laboratory').find().toArray((err, resp) => {
            if(err) throw err;
            res.send(resp);
            db.close();
        });
    });
});

router.get('/search', (req, res) => { // 根据实验室名称对应查找
    const result = req.query;
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        const dbo = db.db('graduation');
        dbo.collection('laboratory').find(result).toArray((err, resp) => {
            if(err) throw err;
            res.send(resp);
            db.close();
        });
    });
});

router.post('/update', (req, res) => { // 预约实验室
    const result = req.body;
    const {date, dateIndex, num, address, course} = result.order;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        const where = {name: result.classroom},
            update = {$set: {[`plan.${dateIndex}.status.${num}`]: {address, course}}};
        dbo.collection("laboratory").updateOne(where, update, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

module.exports = router;