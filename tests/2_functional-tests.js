/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;
let dom;
suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
    /*return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;

        Solver = require('../public/sudoku-solver.js');
      });*/
      //dom = new JSDOM.fromFile('./views/index.html',{runScripts: "dangerously"});
  });
  
  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const textArea = document.getElementById("text-input");
      textArea.value = input;
      Solver.updateTextGrid(input);
      //dom.window
      const A3 = document.getElementById("A3");
      
      assert.equal(A3.value, "9", "A3 should equal 9 '" + A3.value + "' textArea '" + textArea.value + "'");
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const textArea = document.getElementById("text-input");
      const finalInput = '129..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      textArea.value = input;
      Solver.updateTextGrid(input);
      document.getElementById("A1").value = "1";
      document.getElementById("A2").value = "2"
      document.getElementById("A4").value = "a";
      Solver.updateGridCell("A1");
      Solver.updateGridCell("A2");
      Solver.updateGridCell("A4");
      assert.equal(document.getElementById("text-input").value, finalInput, "Cells 1 and 2 should update '" + Solver.updateGridCell("A1") + "'");
      done();
    });
  });
  
  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput()', done => {
      Solver.clearInput();
      const textArea = document.getElementById("text-input");
      assert.equal(textArea.value, "", "text area should be empty");
      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      Solver.clearInput();
      const textArea = document.getElementById("text-input");
      textArea.value = input;
      Solver.solveFnct(input);
      assert.equal(document.getElementById("I9").value, "5", "Should fill Cell I9 with 5 -" + document.getElementById("I9").value);
      done();
    });
  });
});

