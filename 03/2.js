// !! DAY 3: https://adventofcode.com/2024/day/3

import { readFromFile } from "../utils/readFromFile.js";

//** Reading the input
const inputPath = "./03/input.txt";
const input = readFromFile(inputPath);

//** regex for valid mul() and do/don't instructions
const validMulRegex = /mul\((\d{1,3}),\s*(\d{1,3})\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;

//** function to calculate the sum of valid and enabled mul instructions
function calculateEnabledMulSum(content) {
  let isEnabled = true; // mul starts as enabled
  let sum = 0;

  //** fetching every mul instruction
  const instructions = content.split(/(?=mul\(|do\(\)|don't\(\))/);

  for (const instruction of instructions) {
    if (doRegex.test(instruction)) {
      isEnabled = true; //** now checking which instructions are preceded by do*/
    } else if (dontRegex.test(instruction)) {
      isEnabled = false; //** now checking which instructions are preceded by dont */
    } else {
      const matches = [...instruction.matchAll(validMulRegex)]; //** now out of all matched mul instructions we are filtering out valid mul instructions */
      for (const match of matches) {
        //** checking if selected match has been enabled or not */
        if (isEnabled) {
          const x = parseInt(match[1], 10);
          const y = parseInt(match[2], 10);
          sum += x * y;
        }
      }
    }
  }

  return sum;
}

const answer = calculateEnabledMulSum(input);
console.log(answer);
