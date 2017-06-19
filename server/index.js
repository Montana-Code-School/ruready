const express = require('express')

const users = {
	cian: 'ready',
	kelsey: 'ready',
	tim: 'not ready'
}

let task = ""

const app = express()

app.get('/status', (req, res) => {
	res.json({task, users})
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
	users[req.params.user] = req.params.status;
	res.json(users)
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