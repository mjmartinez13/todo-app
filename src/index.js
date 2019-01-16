const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/todos')

mongoose.connect("mongodb://marlonjmf13:"+ process.env.MLAB_PW +"@ds157574.mlab.com:57574/todo_express", { useNewUrlParser: true });

const app = express();


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);


// app.use(function(err, req, res, next) {
//     console.log()
// })

const port = process.env.PORT || 3000

app.listen(port, () => console.log('API up an runing!'))
