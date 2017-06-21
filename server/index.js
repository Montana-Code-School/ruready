const express = require('express');
const User = require('./UserModel');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ruready');

let task = ""

const app = express()
const users = {}

app.get('/status', (req, res) => {
	User.find({$or : [{status: 'Ready'}, {status: 'Not Ready'}]}, (err, users) =>{
		res.json({task, users})
	})
	
})

app.get('/test',(req, res) => {
	res.json({
		test: "Hello World"
	})
})

app.get('/reset/:newTask', (req, res) => {
	task = req.params.newTask
	Object.keys(users).forEach(user => users[user] = 'not ready')
	res.json({task, users})
})

app.get('/setStatus/:user/:status', (req, res) => {
	const {user, status} = req.params
	User.findOneAndUpdate({name: user}, 
		                  {name: user, status: status}, 
		                  {upsert: true},
		                  (err, result) => res.json(result) )
	// const userObj = new User({name: user, status: status})
	// userObj.save((err, result) => res.json(result))
})

app.get('/removeStatus/:user', (req, res) => {
	users[req.params.user] = undefined;
	res.json(users)
})

app.get('/numberConnected', (req, res) => {
	res.json(Object.keys(users).length)
})

app.listen(3001)
console.log("server is running!")