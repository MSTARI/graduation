const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();
const url = 'mongodb://localhost:27017/';

router.get('/', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        const dbo = db.db('graduation');
        dbo.collection('administrator').find().toArray((err, resp) => {
            if(err) throw err;
            res.send(resp);
            db.close();
        });
    });
});

module.exports = router;