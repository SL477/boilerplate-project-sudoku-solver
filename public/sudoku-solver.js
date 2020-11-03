const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.addEventListener("change",() =>{
    console.log("test", textArea.value);
  });
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
const rows = ['A','B','C','D','E','F','G','H','I'];
try {
  module.exports = {
    isValidInput: (input) => {
      const zeroToNine = ['1','2','3','4','5','6','7','8','9'];
      return zeroToNine.includes(input);
    },
    createObjectFromInput: (input) => {
      if (input.length === 81) {
        let ret = {};
        let curCell = 0;
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j < 9; j++) {
            let key = rows[i] + j;
            if (this.isValidInput(input[curCell])) {
              ret[key] = input[curCell];
            }
            curCell++;
          }
        }
        return ret;
      }
      else {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.value = "Error: Expected puzzle to be 81 characters long.";
        return false;
      }
    }
  }
} catch (e) {}
