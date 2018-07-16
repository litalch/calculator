'use strict'

const {describe, it} = require('mocha')
const chai = require('chai')	
chai.use(require('chai-json'))
const {expect} = chai;
const calculator = require('../models/calculator')

describe('calculateNextState', function() {
	it('should return the same jsonState on an empty input', () => {
		expect(calculator.calculateNextState({display: "12" , part1: "12"},"")).to.include({display: "12" , part1: "12"})
	})
	
	let state = null;
	let input = 1;
	let expectedState = {display: "1" , part1: "1"};
	it('should return valid json on initial state (state is null) ', () => {
		expect(calculator.calculateNextState(state,input)).to.include(expectedState);
	})
  

	
	let state1 = {"display": "1" , "part1": "1"} ;
	let input1 = 2;
	let expectedState1 = {display: "12" , part1: "12"};
	it('should return valid json and correct display when recieved input as additional number ', () => {
		expect(calculator.calculateNextState(state1,input1)).to.include(expectedState1);
	})

	
	it('should return valid json and correct display when recieved input as additional number and the json state includes all the fields ', () => {
		expect(calculator.calculateNextState({"display": "1" , "part1": "1", "part2": "" , "action": ""},2)).to.include({display: "12" , part1: "12"});
	})


	let state2 = {"display": "12" , "part1": "12"} ;
	let input2 = '+';
	let expectedState2 = {display: "12" , part1: "12" , "action":"+"};
	it('should return valid json include the action as +, display should be the previous display on receiving + input ', () => {
		expect(calculator.calculateNextState(state2,input2)).to.include(expectedState2);
	})


	it('should return valid json , display should be the current input,action should be +,  on receiving number input ', () => {
		expect(calculator.calculateNextState({display: "12" , part1: "12" , "action":"+"},3))
		.to.include({display: "3" , part1: "12" ,part2: "3", "action":"+"});
	})

	it('should return valid json , display should be the calculation,part2 and action should be empty, on receiving input =', () => {
		expect(calculator.calculateNextState({display: "3" , part1: "12" ,part2:"3", "action":"+"},"="))
		.to.include({display: "15" , part1: "15" ,part2: "", "action":""});
	})

	it('should return valid json ,equality_done should be true, on receiving input =', () => {
		expect(calculator.calculateNextState({display: "3" , part1: "12" ,part2:"3", "action":"+"},"="))
		.to.include({display: "15" , part1: "15" ,part2: "", "action":"" , "equality_done":true});
	})

	it('should return valid json , display should be the prev calculation,part2 should be empty and action should be -, on receiving input - after =', () => {
		expect(calculator.calculateNextState({display: "15" , part1: "15" ,part2:"", "action":""},"-"))
		.to.include({display: "15" , part1: "15" ,part2: "", "action":"-"});
	})

	it('should return valid json , display should be the current input ,part2,action should be empty , on receiving input number after =', () => {
		expect(calculator.calculateNextState({display: "15" , part1: "15" ,part2:"", "action":"" , "equality_done":true},"7"))
		.to.include({display: "7" , part1: "7" ,part2: "", "action":""});
	})

	it('should return valid json , display should be the current input ,part2,action should be empty , on receiving input number after input number', () => {
		expect(calculator.calculateNextState({display: "7" , part1: "7" ,part2: "", "action":""},"1"))
		.to.include({display: "71" , part1: "71" ,part2: "", "action":""});
	})

	it('should return the same state(ignoring the input) on receiving input + at the begining', () => {
		expect(calculator.calculateNextState(null,"+")).to.include({display: ""});
	})

	it('should return the same state(ignoring the input) on receiving input = at the begining', () => {
		expect(calculator.calculateNextState(null,"=")).to.include({display: ""});
	})

	it('should return the same state with the new action(+) on receiving input + after -', () => {
		expect(calculator.calculateNextState({display: "15" , part1: "15" ,part2:"", "action":"-"},"+")).to.include({display: "15" , part1: "15" ,part2:"", "action":"+"});
	})

	it('should return the same state(ignoring the input) on receiving input = after =', () => {
		expect(calculator.calculateNextState({display: "15" , part1: "15" ,part2:"", "action":""},"=")).to.include({display: "15" , part1: "15" ,part2:"", "action":""});
	})


  //contain.jsonWithProps({ repoName: 'giper' });
  //to.be.empty;
})