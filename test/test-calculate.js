'use strict'

const {describe, it} = require('mocha')
const {expect} = require('chai')

const calculator = require('../models/calculator')

describe('calculate', function() {
  it('should return error on an empty action', () => {
    expect(calculator.calculate("",5,4)).to.equal("ERR")
  })

  it('should return error on an undefined part of exercise', () => {
    expect(calculator.calculate("+",5,undefined)).to.equal("ERR")
  })

  it('should return error on an string part of exercise', () => {
    expect(calculator.calculate("+",5,"4")).to.equal("ERR")
  })

  it('should return error on an string part of exercise', () => {
    expect(calculator.calculate("+","5",4)).to.equal("ERR")
  })

  it('should return sum calculation', () => {
    expect(calculator.calculate("+",5,4)).to.equal(9)
  })

  

  it('should return diff calculation', () => {
    expect(calculator.calculate("-",5,4)).to.equal(1)
  })

  it('should return diff negative calculation', () => {
    expect(calculator.calculate("-",5,9)).to.equal(-4)
  })

  it('should return mult calculation', () => {
    expect(calculator.calculate("*",4,5)).to.equal(20)
  })

  it('should return div calculation', () => {
    expect(calculator.calculate("/",20,4)).to.equal(5)
    
  })

  it('should return div float calculation', () => {
    expect(calculator.calculate("/",5,2)).to.equal(2.5)
    
  })

  it('should return div float fraction calculation', () => {
    expect(calculator.calculate("/",5,10)).to.equal(0.5)
    
  })

  it('should return div 0 calculation', () => {
    expect(calculator.calculate("/",0,7)).to.equal(0)
    
  })

  it('should return error on a div of zero ', () => {
    expect(calculator.calculate("/",5,0)).to.equal("ERR")
    
  })

})