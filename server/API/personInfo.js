const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();
const url = 'mongodb://localhost:27017/';

router.post('/', (req, res) => { // 获取用户表信息
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        const dbo = db.db('graduation');
        dbo.collection('personInfo').find(result).toArray((err, resp) => {
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
        dbo.collection('personInfo').updateOne(where, update, (err, resp) => {
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
        dbo.collection("personInfo").updateOne(where, update, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/deleteOrder', (req, res) => { // 删除用户预约实验室
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        const where = {id: result.id},
            update = {$pull: {order: result.order}};
        dbo.collection("personInfo").updateOne(where, update, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/add', (req, res) => { // 添加用户信息
    let result = req.body;
    result.password = '1234';
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        dbo.collection("personInfo").insertOne(result, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/modify', (req, res) => { // 修改用户信息
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        const where = {id: result.id},
            update = {$set: result.info};
        dbo.collection("personInfo").updateOne(where, update, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/delete', (req, res) => { // 删除用户信息
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        dbo.collection("personInfo").deleteOne(result, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

module.exports = router;