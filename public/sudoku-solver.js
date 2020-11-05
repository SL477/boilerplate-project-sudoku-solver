const rows = ['A','B','C','D','E','F','G','H','I'];

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

const gridUpdate = (cell) => {
  let inputCell = document.getElementById(cell);
  let val = inputCell.value;
  if (isInputValid(val)) {
    let rowNum = rows.findIndex((r) => {return r === cell[0];});
    //console.log('row', rowNum, "column", cell[1]);
    console.log('cell', cell);
    let index = (rowNum * 9) + Number(cell[1]);
    console.log('index', index);

    let txt = textArea.value;
    let str;
    if (index > 1) {
      str = txt.substring(0,index - 1) + val;
    }
    else {
      str = val;
    }
    if (index < 81) {
      str = str + txt.substring(index);
    }
    console.log(str);
    console.log('str len', str.length);
    textArea.value = str;
  }
  return val;
};

const clearFnct = () => {
  textArea.value = "";
  for (var i = 0; i < 9; i++) {
    for (var j = 1; j < 10; j++) {
      let id = rows[i] + j;
      let cell = document.getElementById(id);
      cell.value = "";
    }
  }
  console.log("clear Called");
};

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.addEventListener("change",() =>{
    textAreaChangeFunction(textArea.value);

  });
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  textArea.dispatchEvent(new Event("change"));

  for (var i = 0; i < 9; i++) {
    for (var j = 1; j < 10; j++) {
      let id = rows[i] + j;
      let cell = document.getElementById(id);
      cell.addEventListener("change", () => {
        gridUpdate(id);
      });
    }
  }

  //Clear button
  document.getElementById("clear-button").onclick = () => {clearFnct();};
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

try {
  module.exports = {
    isValidInput: isInputValid,
    createObjectFromInput: inputCreateObject,
    updateTextGrid: textAreaChangeFunction,
    updateGridCell: gridUpdate,
    clearInput: clearFnct
  }
} catch (e) {}
