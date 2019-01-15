const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Todo = require('../models/todos');



router.post('/', (req, res, next) => {

    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        completed: false 
    })

    todo.save()
    .then( re => {
        res.send('task added successfully');
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;