const express = require('express');
const bodyParser = require('body-parser');
const app = express()

var calculator = require('./models/calculator');
let counter = 0

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(__dirname + '/public'))
app.get('/counter', function(req, res) {
  console.log(req.method)

  res.json({value: counter})
})

app.post('/counter', function(req, res) {
  const increment = parseInt(req.query['increment'] || '1')
console.log(req.query);
  counter += increment

  res.json({value: counter})
})

app.get('/foo', (req, res) => {
  const text = readFile('foo.html')

  res.send(text)
})
app.post('/calculate',(req, res) => {
 // var text = calculator.calculateNextState();
//let s = null;

/*s = calculator.calculateNextState(s,"1");
s = calculator.calculateNextState(s,"2");
s = calculator.calculateNextState(s,"+");
s = calculator.calculateNextState(s,"4");
s = calculator.calculateNextState(s,"3");
s = calculator.calculateNextState(s,"=");
s = calculator.calculateNextState(s,"+");
s = calculator.calculateNextState(s,"1");
s = calculator.calculateNextState(s,"=");
//s = calculator.calculateNextState(s,"5");
*/
console.log(req.body)

const state = req.body.calculatorState || null;
const input = req.body.input || "";
console.log(state);
console.log(input);
  let nextState = calculator.calculateNextState(state,input);

  res.json(nextState);
  
});

app.listen(process.env.PORT, () => console.log('listening...'))
