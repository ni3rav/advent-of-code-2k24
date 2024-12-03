// !! DAY 3: https://adventofcode.com/2024/day/3

import { readFromFile } from "../utils/readFromFile.js";

// ** reading the input
const inputPath = "./03/input.txt";
const input = readFromFile(inputPath);

//**  regex that matches valid mul()
const validMulRegex = /mul\((\d{1,3}),\s*(\d{1,3})\)/g;

// ** function to get the valid matches
function extractMulMatches(content) {
  // ** creating an array to store matches
  const matches = [];
  let match;

  // ** checks if the result of the exec method is not null => a match was found
  // **match = validMulRegex.exec(content) allows the loop to continue executing as long as there are matches
  while ((match = validMulRegex.exec(content)) !== null) {
    matches.push([parseInt(match[1], 10), parseInt(match[2], 10)]);
    //!! regex has three capture groups
    //!! 1. an entire valide syntax of mul(X,Y)
    //!! 2. X;  3.Y so that's why we are pushing match[1] and match[2]
  }

  return matches;
}

const mulMatches = extractMulMatches(input);

let answer = 0;

mulMatches.forEach((match) => {
  answer += match[0] * match[1];
});

console.log(answer);
