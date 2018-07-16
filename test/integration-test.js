'use strict';

const app = require('../app'),
  chai = require('chai'),
  request = require('supertest');

const expect = chai.expect;

describe('Calculator API Integration Tests', function() {
  describe('#POST / calculate', function() { 
    

	it('should get status 200 ok', function(done) { 
      request(app).post('/calculate')
        .expect('Content-Type', /json/)
        .expect(200, done);
        
  	  });
    
	it('should get header content-type: json', function(done) { 
      request(app).post('/calculate')
        .expect('Content-Type', /json/)
        .expect(200, done);
        
  	  });

    it('should get an empty json object', function(done) { 
      request(app).post('/calculate')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({}); 
          expect(res.body).to.be.empty; 
          //task = res.body; 
          done(); 
        }); 
  	  });
  	
	let state; 
  	it('should get json {display:1} on sending stateObject null and input 1', function(done) { 
		request(app)
  		.post('/calculate')
  		.send({
			    'input': '1'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"1"}); 
          state = res.body;

          done(); 
        }); 
  	  });
  	
  	it('should get json {display:12} on sending previous stateObject and input 2', function(done) { 

		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '2'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"12"}); 
          state = res.body;
          done(); 
        }); 
  	  });

  	  it('should get json {display:12} on sending previous stateObject and input +', function(done) { 
  		
		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '+'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"12"}); 
          state = res.body;
          done(); 
        }); 
  	  });

 	it('should get json {display:3} on sending previous stateObject and input 3', function(done) { 
  		
		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '3'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"3"}); 
          state = res.body;
          done(); 
        }); 
  	  });

 	it('should get json {display:35} on sending previous stateObject and input 5', function(done) { 
  		
		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '5'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"35"}); 
          state = res.body;
          done(); 
        }); 
  	  });
	
	it('should get json {display:47} on sending previous stateObject and input =', function(done) { 
  		
		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '='
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"47"}); 
          state = res.body;
          done(); 
        }); 
  	  });

    it('should get json {display:6} on sending previous stateObject and input 6', function(done) { 
  		
		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '6'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"6"}); 
          state = res.body;
          done(); 
        }); 
  	  });
  
  	it('should get json {display:62} on sending previous stateObject and input 2', function(done) { 
  		
		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '2'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"62"}); 
          state = res.body;
          done(); 
        }); 
  	  });

  	it('should get json {display:62} on sending previous stateObject and input /', function(done) { 
  		
		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '/'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"62"}); 
          state = res.body;
          done(); 
        }); 
  	  });
	
  	it('should get the previous state on sending previous stateObject and input / (action after action)', function(done) { 
  		
		request(app)
  		.post('/calculate')
  		.send({
  				'calculatorState': state,
			    'input': '/'
  			})
  		.end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.deep.include({'display':"62"}); 
          done(); 
        }); 
  	  });

	});

});