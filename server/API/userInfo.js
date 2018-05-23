const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();
const url = 'mongodb://localhost:27017/';

router.post('/', (req, res) => { // 获取用户表信息
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        const dbo = db.db('graduation');
        dbo.collection('userInfo').find(result).toArray((err, resp) => {
            if(err) throw err;
            res.send(resp);
            db.close();
        });
    });
});

router.post('/update', (req, res) => { // 修改用户密码
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        const dbo = db.db('graduation');
        const where = {id: result.id},
            update = {$set: {password: result.password}};
        dbo.collection('userInfo').updateOne(where, update, (err, resp) => {
            if(err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/addOrder', (req, res) => { // 添加用户预约实验室
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        const where = {id: result.id},
            update = {$push: {order: result.order}};
        dbo.collection("userInfo").updateOne(where, update, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

module.exports = router;