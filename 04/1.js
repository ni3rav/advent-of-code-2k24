//! DAY: https://adventofcode.com/2024/day/4

import { readFromFile } from "../utils/readFromFile.js";

// ** reading the input
const inputPath = "./04/input.txt";
const input = readFromFile(inputPath);

// ** converting into an array of lines
const lineInput = input.split("\n");
const matrix = [...lineInput].map((line) => line.split(""));

// ** no of totalRows and no of totalColumns
const totalRows = lineInput.length;
const totalColumns = lineInput[0].length;

console.log(totalRows, totalColumns);

let answer = 0;

function findXmas(row, col) {
  // ! to prevent upward motion's edge cases
  if (row - 3 >= 0) {
    if (
      matrix[row - 1][col] === "M" &&
      matrix[row - 2][col] === "A" &&
      matrix[row - 3][col] === "S"
    ) {
      answer++;
    }
  }

  // ! to prevent downward motion's edge cases
  if (row + 3 < totalRows) {
    if (
      matrix[row + 1][col] === "M" &&
      matrix[row + 2][col] === "A" &&
      matrix[row + 3][col] === "S"
    ) {
      answer++;
    }
  }

  // ! to prevent left motion's edge cases
  if (col - 3 >= 0) {
    if (
      matrix[row][col - 1] === "M" &&
      matrix[row][col - 2] === "A" &&
      matrix[row][col - 3] === "S"
    ) {
      answer++;
    }
  }

  // ! to prevent right motion's cases
  if (col + 3 < totalColumns) {
    if (
      matrix[row][col + 1] === "M" &&
      matrix[row][col + 2] === "A" &&
      matrix[row][col + 3] === "S"
    ) {
      answer++;
    }
  }

  // ! to prevent diagonally left motion's edge cases
  if (col - 3 >= 0 && row - 3 >= 0) {
    if (
      matrix[row - 1][col - 1] === "M" &&
      matrix[row - 2][col - 2] === "A" &&
      matrix[row - 3][col - 3] === "S"
    ) {
      answer++;
    }
  }

  if (col - 3 >= 0 && row + 3 < totalRows) {
    if (
      matrix[row + 1][col - 1] === "M" &&
      matrix[row + 2][col - 2] === "A" &&
      matrix[row + 3][col - 3] === "S"
    ) {
      answer++;
    }
  }

  // ! to prevent diagonally right motion's edge cases
  if (col + 3 < totalColumns && row - 3 >= 0) {
    if (
      matrix[row - 1][col + 1] === "M" &&
      matrix[row - 2][col + 2] === "A" &&
      matrix[row - 3][col + 3] === "S"
    ) {
      answer++;
    }
  }
  if (col + 3 < totalColumns && row + 3 < totalRows) {
    if (
      matrix[row + 1][col + 1] === "M" &&
      matrix[row + 2][col + 2] === "A" &&
      matrix[row + 3][col + 3] === "S"
    ) {
      answer++;
    }
  }
}

for (let row = 0; row < totalRows; row++) {
  for (let col = 0; col < totalColumns; col++) {
    if (matrix[row][col] === "X") {
      findXmas(row, col);
    }
  }
}

console.log(answer);
