const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const calculator = require('./models/calculator');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/'+env)
const port = config.port;//process.env.PORT || 3000;

console.log(env)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate',(req, res) => {

const state = req.body.calculatorState || null;
const input = req.body.input || "";
let nextState = {};
if(state != null || input != "")
   nextState = calculator.calculateNextState(state,input);


 res.json(nextState);
  
});

module.exports = app.listen(port, () => console.log('listening...' + port))



