const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = mongoose.connection;

const Todo = require('../models/todos');



router.post('/todos', (req, res, next) => {

    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        completed: false 
    })
    
    todo.save().then( re => {
        console.log(re);
    }).catch(err => {
        console.log(err)
    })

})


router.get('/todos', (req, res, next) => {
    Todo.find({}).then(todo => {
        res.send(todo)
        console.log(todo)
    }).catch(err => {
        console.log(err)
    })
})


module.exports = router;



