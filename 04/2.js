//! DAY: https://adventofcode.com/2024/day/4

import { readFromFile } from "../utils/readFromFile.js";

// **read the input */
const input = readFromFile("./04/input.txt");

// **converting to matrix*/
const lineWiseInput = input.split("\n");
const matrixInput = [...lineWiseInput].map((line) => line.split(""));

//** no of rows and cols */
const totalRows = matrixInput.length;
const totalColumns = matrixInput[0].length;
let answer = 0;

//!! function to find the answer
function findMas(row, col) {
  //** follwoing are conditions for the diagonal of a length 3 to exist 1 element on the either side of the element passed to this fucntion making it 3 */
  const hasRightDiagonal =
    col + 1 < totalColumns &&
    row - 1 >= 0 &&
    col + 1 < totalColumns &&
    row + 1 < totalRows;
  const hasLeftDiagonal =
    col - 1 >= 0 && row - 1 >= 0 && col - 1 >= 0 && row + 1 < totalRows;

  //** both diagonals must exist for the cross to exist */
  const crossExists = hasRightDiagonal && hasLeftDiagonal;

  if (crossExists) {
    //** fetching diagonal elements */
    const leftDiagonalElements = [
      matrixInput[row - 1][col - 1],
      matrixInput[row + 1][col + 1],
    ];

    const rightDiagonalElements = [
      matrixInput[row + 1][col - 1],
      matrixInput[row - 1][col + 1],
    ];

    //* function to check if the diagonals have M,S or S,M as their element
    const isValidConfig = (diagonals) =>
      ["M", "S"].includes(diagonals[0]) &&
      ["M", "S"].includes(diagonals[1]) &&
      diagonals[0] !== diagonals[1];

    return (
      isValidConfig(leftDiagonalElements) &&
      isValidConfig(rightDiagonalElements)
    );
  }
  return false;
}

for (let row = 0; row < totalRows; row++) {
  for (let col = 0; col < totalColumns; col++) {
    //!! passing every A to the function to  check if it form the valid X
    if (matrixInput[row][col] === "A") {
      if (findMas(row, col)) {
        answer++;
      }
    }
  }
}

console.log(answer);
