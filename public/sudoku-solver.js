const isInputValid = (input) => {
  const zeroToNine = ['1','2','3','4','5','6','7','8','9'];
  return zeroToNine.includes(input);
};

const inputCreateObject = (input) => {
  const errorMsg = document.getElementById("error-msg");
  if (input.length === 81) {
    let ret = {};
    let curCell = 0;
    for (var i = 0; i < 9; i++) {
      for (var j = 1; j < 10; j++) {
        let key = rows[i] + j;
        if (isInputValid(input[curCell])) {
          ret[key] = input[curCell];
        }
        else {
          ret[key] = "";
        }
        curCell++;
      }
    }
    errorMsg.innerHTML = "";
    return ret;
  }
  else {
    errorMsg.innerHTML = "Error: Expected puzzle to be 81 characters long.";
    return false;
  }
};

const textAreaChangeFunction = (input) => {
  let res = inputCreateObject(input);
  if (res) {
    Object.keys(res).forEach(key => {
      document.getElementById(key).value = res[key];
    });
  }
  else {

  }
  console.log("test", res);
};

const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.addEventListener("change",() =>{
    textAreaChangeFunction(textArea.value);

  });
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  textArea.dispatchEvent(new Event("change"));
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
const rows = ['A','B','C','D','E','F','G','H','I'];
try {
  module.exports = {
    isValidInput: isInputValid,
    createObjectFromInput: inputCreateObject,
    updateTextGrid: textAreaChangeFunction
  }
} catch (e) {}
