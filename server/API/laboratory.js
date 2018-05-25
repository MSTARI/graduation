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
    let data = null;
    if(address && course) {
        data = {
            address,
            course
        };
    }
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        const where = {name: result.classroom},
            update = {$set: {[`plan.${dateIndex}.status.${num}`]: data}};
        dbo.collection("laboratory").updateOne(where, update, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/cancel', (req, res) => { // 用户取消预约实验室
    const result = req.body;
    const {classroom, dateIndex, num} = result.order;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        const where = {name: classroom},
            update = {$set: {[`plan.${dateIndex}.status.${num}`]: null}};
        dbo.collection("laboratory").updateOne(where, update, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/add', (req, res) => { // 添加实验室信息
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        dbo.collection("laboratory").insertOne(result, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/modify', (req, res) => { // 修改实验室信息
    const result = req.body;
    const info = {
        startTime: result.start,
        endTime: result.end,
        plan: result.plan
    };
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        const where = {name: result.name},
            update = {$set: info};
        dbo.collection("laboratory").updateOne(where, update, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/delete', (req, res) => { // 删除实验室信息
    const result = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("graduation");
        dbo.collection("laboratory").deleteOne(result, (err, resp) => {
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

module.exports = router;