
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors=require('cors')
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken')

var app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
mongoose.connect('mongodb://localhost:27017/ReactProject')

const userRouter = require('./routes/users');



app.use('/', userRouter);



app.listen(4000,()=>console.log("server started at post 4000"))
module.exports = app;
