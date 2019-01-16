const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = mongoose.connection;

const Todo = require('../models/todos');



router.post('/todos', (req, res) => {
    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        completed: false 
    })
   
    todo.save().then( re => {
       res.send(re)
    }).catch(err => {
        console.log(err)
    })
})


router.get('/todos', (req, res) => {
    Todo.find({}).then(todo => {
        res.send(todo)
    }).catch(err => {
        console.log(err)
    })
})


router.put('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    Todo.updateOne(
        { _id: Object(todoId)}, {$set: { completed: true }}
        ).then(res => {
        res.send(res)
    }).catch(err => {
        res.send(err)
    })
})




module.exports = router;



