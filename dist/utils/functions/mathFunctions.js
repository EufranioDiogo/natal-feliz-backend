"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomNumber = void 0;

/*
  Return number in interval (exclusive with endNumber), from [startNumber, endNumber - 1] 
*/
var randomNumber = function randomNumber(startNumber, endNumber) {
  return Math.random() * (endNumber - startNumber) + startNumber;
};

exports.randomNumber = randomNumber;