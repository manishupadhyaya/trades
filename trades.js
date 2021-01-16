const express = require('express');
const router = express.Router();
const moment = require('moment')


const Trade = require('../models/trades')

router.post('/', (req, res, next)=>{
    const {type, user_id, symbol, shares, price, timestamp} = req.body;
    // const prevTimestamp = req.body.timestamp;
    // const dateObject = new Date(req.body.timestamp)

    // const timestamp = dateObject.toLocaleString()
    Trade.create({type, user_id, symbol, shares, price, timestamp})
    .then((data)=>{
        // data.timestamp = prevTimestamp
        res.status(201).send(data)
    })
    .catch((err)=>{
        res.status(500).send("Error");
    })
})

router.get('/', (req, res, next)=>{
    var type = req.query.type || null
    var user_id = req.query.user_id || null

    if(type && user_id)
    {
        Trade.findAll({
            where:{
                type: type,
                user_id: user_id
            },
            order:[
                ['id', 'ASC']
            ]
        })
        .then((data)=>{
            res.status(200).send(data);
        })
    }
    else if(type)
    {
        Trade.findAll({
            where:{
                type: type,
            },
            order:[
                ['id', 'ASC']
            ]
        })
        .then((data)=>{
            res.status(200).send(data);
        })
    }
    else if(user_id)
    {
        Trade.findAll({
            where:{
                user_id: user_id
            },
            order:[
                ['id', 'ASC']
            ]
        })
        .then((data)=>{
            res.status(200).send(data);
        })
    }
    else
    {
        Trade.findAll({
            order:[
                ['id', 'ASC']
            ]
        })
        .then((data)=>{
            res.status(200).send(data);
        })
    }
})

router.get('/:id', (req, res, next)=>{
    Trade.findAll({
        where:{
            id: req.params.id
        },
        order:[
            ['id', 'ASC']
        ]
    })
    .then((data)=>{
        if(data.length==0)
        {
            return res.status(404).send("ID not found")
        }
        res.status(200).send(data[0]);
    })
})
router.put('/:id', (req, res, next)=>{
    res.status(405).send();
})
router.patch('/:id', (req, res, next)=>{
    res.status(405).send();
})
router.delete('/:id', (req, res, next)=>{
    res.status(405).send();
})
module.exports = router;


//timestamp
//sort //done
//query //done
//delete //done