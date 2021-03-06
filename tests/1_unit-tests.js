/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const jsdom = require('jsdom');
//const { isValidInput } = require('../public/sudoku-solver.js');
const { JSDOM } = jsdom;
let Solver;
//const { isValidInput } = require('../public/sudoku-solver.js');

suite('UnitTests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;

        Solver = require('../public/sudoku-solver.js');
      });
  });
  
  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function isValidInput()', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      input.forEach((i) =>{
        assert.isTrue(Solver.isValidInput(i), "isValidInput should be true");
      });
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.forEach((i) => {
        assert.isFalse(Solver.isValidInput(i), "isValidInput should be false");
      });
      done();
    });
  });
  
  suite('Function createObjectFromInput()', () => {
    test('Parses a valid puzzle string into an object', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      
      assert.isObject(Solver.createObjectFromInput(input),"createObjectFromInput should return an object");
      //assert.strictEqual(Solver.createObjectFromInput(input)["A3"], "9", "A3 should equal 9");
      done();
    });
    
    // Puzzles that are not 81 numbers/periods long show the message 
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');
      Solver.createObjectFromInput(shortStr);
      assert.equal(errorDiv.innerHTML, errorMsg, "Error message should be shown");
      Solver.createObjectFromInput(longStr);
      assert.equal(errorDiv.innerHTML, errorMsg, "short string should show error message");
      done();
    });
  });

  suite('Function puzzleIsValid()', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      assert.isTrue(Solver.puzzleIsValid(input),"Valid puzzle should pass");
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';
      assert.isFalse(Solver.puzzleIsValid(input), "Invalid puzzle should fail");
      done();
    });
  });
  
  
  suite('Function solveFnct()', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      /*for (var i = 0; i < 5; i++) {
        assert.equal(Solver.solveFnct(puzzlesAndSolutions[i][0]), puzzlesAndSolutions[i][1], 'Should solve puzzle ' + puzzlesAndSolutions[i][0] + ' ' + puzzlesAndSolutions[i][1]);
      }*/
      assert.equal(Solver.solveFnct(input), output, 'Should solve');
      done();
    });
  });
});
