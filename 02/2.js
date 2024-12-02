// ! Day 2 Problem 2: https://adventofcode.com/2024/day/2

import { readFromFile } from "../utils/readFromFile.js";

const inputPath = "./02/input.txt";

// ** read the input
const input = readFromFile(inputPath);

// ** convert input into an array of lines
const toLines = input.split("\n").filter((line) => line.trim() !== "");

// ** convert each line into an array
const linesToArray = [];
toLines.forEach((line) => {
  let temp = line.split(/\s+/).map((value) => parseInt(value.trim(), 10));
  linesToArray.push(temp);
});

// ** this function will check if the array is increasing or decreasing safely or not
function isReportSafe(report) {
  const isIncreasing = report.every(
    //!every has two parameters num -> current element and index -> index of the current element! /
    (num, index) =>
      //!! index === 0 ensures that first element of the array doesn't have to go through test
      index === 0 ||
      (num - report[index - 1] >= 1 && num - report[index - 1] <= 3)
  );

  const isDecreasing = report.every(
    //!! index === 0 ensures that first element of the array doesn't have to go through test
    (num, index) =>
      index === 0 ||
      (report[index - 1] - num >= 1 && report[index - 1] - num <= 3)
  );

  //** returns whihcever holds true */
  return isIncreasing || isDecreasing;
}

// ** use the above function to each array of line
function countSafeReports(linesToArray) {
  let safeReportCount = 0;

  linesToArray.forEach((report) => {
    if (isReportSafe(report)) {
      safeReportCount++;
    } else {
      // !! if the report is not safe i am slicing out every possible array out of it and checking if that makes the report sfe
      for (let i = 0; i < report.length; i++) {
        const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];

        if (isReportSafe(modifiedReport)) {
          safeReportCount++;
          break;
        }
      }
    }
  });

  return safeReportCount;
}

let answer = countSafeReports(linesToArray);
console.log(answer);
