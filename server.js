const express = require('express')
const path = require('path')
const app = express()
const port = 9090 
const cors = require('cors')

// not going to reinvent the wheel
var fibonacci = require('fibonacci-fast');

const isvalid = (num) => {
	// server side validation
	// hardware reqs not yet defined
	return (num<=8192 && Math.sign(num)>=0)
}

app.use(express.static(path.join(__dirname, 'build')));

// Serve react dist
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors())

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*")
   res.header('Access-Control-Allow-Methods', 'GET')
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
   next()
})

// single endpoint
app.get('/:in', (req, res, next) => {
	// middleware
	// validate input
	let num = req.params.in

	if (isvalid(num)) next()
	else next('route') 
	
}, (req, res) => {
	// calculate sequence
	let seq = fibonacci.array(0, req.params.in).map(x => x.number);
	res.status(200).json({sequence:seq})
})

// alternative route for invalid input
app.get('/:in', (req, res, next) => {
	res.status(200).json({error: 'Input is invalid: ' + req.params.in})
})

app.listen(port, () => console.log(`Fibonacci server is now listening on port ${port}.`))

