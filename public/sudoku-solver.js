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
    console.log("txt", txt);
    if (!txt) {
      txt = '.................................................................................';
    }

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

const isPuzzleValid = (input) => {
  if (input.length !== 81) {
    return false;
  }
  for (var i = 0; i < 9; i++) {
    //Check each row to make sure that there are no duplicate values
    let row = [];
    for (var j = 1; j < 10; j++) {
      let id = ((i * 9) + j) - 1;
      let cellVal = input[id];
      if (isInputValid(cellVal)) {
        //console.log("row", row, 'cellVal', cellVal, 'i',i, 'id',id);
        if (row.includes(cellVal)) {
          //console.log("row", row, 'cellVal', cellVal);
          return false;
        }
        else {
          row.push(cellVal);
        }
      }
    }
  }

  //Check each column
  for (var i = 0; i < 9; i++) {
    let column = [];
    for (var j = 0; j < 9; j++) {
      let id = (j * 9) + i;
      let cellVal = input[id];
      if (isInputValid(cellVal)) {
        //console.log("column", column, 'cellVal', cellVal, 'i',i, 'id',id);
        if (column.includes(cellVal)) {
          return false;
        }
        else {
          column.push(cellVal);
        }
      }
    }
  }

  //check each box
  let boxStarts = [0,3,6,27,30,33,54,57,60];
  let offset = [0,1,2,9,10,11,18,19,20];
  for (var i = 0; i < 9; i++) {
    let box = [];
    for (var j = 0; j < 9; j++) {
      let id = boxStarts[i] + offset[j];
      let cellVal = input[id];
      if (isInputValid(cellVal)) {
        //console.log("box", box, 'cellVal', cellVal, 'i',i, 'id',id);
        if (box.includes(cellVal)) {
          return false;
        }
        else {
          box.push(cellVal);
        }
      }
    }
  }
  return true;
};

/*const solveTryer = (input) => {
  if (!input.includes(".")) {
    console.log("complete", input);
    return input;
  }
  for (var i = 1; i < 10; i++) {
    let j = input.indexOf(".");
    if (j < 0) {
      return input;
    }
    let newInput;
    if (j == 0) {
      newInput = i + input.substring(1);
    }
    else {
      newInput = input.substring(0, j) + i;
      if (j < 81) {
        newInput = newInput + input.substring(j);
      }
    }
    console.log("incomplete", input);
    if (isPuzzleValid(newInput)) {
      solveTryer(newInput);
    }
    else {
      
      continue;
    }
  }
}*/

const getPossibilitiesForRow = (num, input) => {
  let ret = ['1','2','3','4','5','6','7','8','9'];
  for (var i = 0; i < 9; i++) {
    let number = input[i + (9 * num)];
    //console.log('number',number)
    if (isInputValid(number)) {
      let index = ret.indexOf(number);
      //console.log('index', index);
      ret.splice(index,1);
    }
  }
  return ret;
};

const getPossibilitiesForColumn = (num, input) => {
  let ret = ['1','2','3','4','5','6','7','8','9'];
  for (var i = 0; i < 9; i++) {
    let number = input[num + (9 * i)];
    //console.log('number',number)
    if (isInputValid(number)) {
      let index = ret.indexOf(number);
      //console.log('index', index);
      ret.splice(index,1);
    }
  }
  return ret;
};

const getBoxNumber = (index) => {
  let boxNums = [0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8];
  return boxNums[index];
};

const getPossibilitiesForBox = (num, input) => {
  let boxStarts = [0,3,6,27,30,33,54,57,60];
  let offset = [0,1,2,9,10,11,18,19,20];
  let ret = ['1','2','3','4','5','6','7','8','9'];
  for (var i = 0; i < 9; i++) {
    let number = input[boxStarts[num] + offset[i]];
    //console.log('number',number)
    if (isInputValid(number)) {
      let index = ret.indexOf(number);
      //console.log('index', index);
      ret.splice(index,1);
    }
  }
  return ret;
};

const getPossibilitiesForCell = (index, input) => {
  if (isInputValid(input[index])) {
    return [];
  }
  let columnPoss = getPossibilitiesForColumn(index % 9, input);
  let rowPoss = getPossibilitiesForRow(Math.floor(index / 9), input);
  let boxPoss = getPossibilitiesForBox(getBoxNumber(index), input);

  let arr = [columnPoss, rowPoss, boxPoss];
  return arr.reduce((p,c) => p.filter(e => c.includes(e)));
};

const isThereCellWithOnePossibility = (input) => {
  for (var i = 0; i < 81; i++) {
    if (getPossibilitiesForCell(i, input).length == 1) {
      return i;
    }
  }
  return -1;
};

const setNumberInInput = (number, index, input) => {
  let ret = '';
  if (index > 0) {
    ret += input.substring(0, index);
  }
  ret += number;
  if (index < 80) {
    ret += input.substring(index + 1);
  }
  return ret;
};

const sortOnePossibilitiesInCell = (input) => {
  let ret = input;
  let indexOfCellWithOnePossibility = isThereCellWithOnePossibility(ret);
  while (indexOfCellWithOnePossibility > -1) {
    let num = getPossibilitiesForCell(indexOfCellWithOnePossibility, ret);
    ret = setNumberInInput(num[0], indexOfCellWithOnePossibility, ret);
    indexOfCellWithOnePossibility = isThereCellWithOnePossibility(ret);
    console.log('new puzzle', ret);
  }
  return ret;
};

const getNextUnsolvedCell = (input) => {
  for (var i = 0; i < 81; i++) {
    if (!isInputValid(input[i])) {
      return i;
    }
  }
  return -1;
};

const solveBtn = (input) => {
  console.log("Solve Btn",input);
  console.log("isPuzzlevalid", isPuzzleValid(input));
  if (!isPuzzleValid(input)) {
    return input;
  }
  //Try to solve
  let newSolution = input;
  //idea loop through the solution's empty numbers. guess a number if the grid is valid then continue onwards recursively until there are no more to find
  //console.log("s", solveTryer(input));

  /*for (var i = 0; i < 9; i++) {
    //console.log('row ' + i, getPossibilitiesForRow(i, newSolution));
    console.log('column ' + i, getPossibilitiesForBox(i, newSolution));
  }*/
  /*for (var i = 0; i < 81; i++) {
    console.log(i, getPossibilitiesForCell(i, newSolution));
  }*/

  newSolution = sortOnePossibilitiesInCell(newSolution);
  if (getNextUnsolvedCell(newSolution) == -1) {
    textArea.value = newSolution;
    textAreaChangeFunction(newSolution);
    return newSolution;
  }
  //possible more advanced way of going from 1-9 to locate places where it only appears once
  return input;
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

  //Solve button
  document.getElementById("solve-button").onclick = () => {
    solveBtn(document.getElementById("text-input").value);
  };
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
    clearInput: clearFnct,
    puzzleIsValid: isPuzzleValid,
    solveFnct: solveBtn
  }
} catch (e) {}
