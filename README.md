# Calculator

Lital Chaghbi. ID: 39691365


## Installation

    $ npm install mocha

    $ npm install chai

    $ npm install chai-json

    $ npm install supertest


## Test:

    $ npm test


## Run the server:
 
    $ PORT=3000 npm start


#### CURL Examples:

    curl  -X POST http://localhost:3000/calculate -H 'content-type: application/json' -d '{"calculatorState": null, "input": "1"}'

    curl  -X POST http://localhost:3000/calculate -H 'content-type: application/json' -d '{"calculatorState": {"display":"5","part1":"12","part2":"5","action":"+"}, "input": "="}'

