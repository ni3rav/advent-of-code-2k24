// ! DAY 5: https://adventofcode.com/2024/day/5

import { readFromFile } from "../utils/readFromFile.js";

const input = readFromFile("./05/input.txt");

//* dividing the input in rules and updates as they are separted by an empty line
const [rulesPart, updatesPart] = input.split("\n\n");

//* storing rules and updates in different array as numbers as we need to sum them up
const rules = rulesPart.split("\n").map((rule) => rule.split("|").map(Number));

const updates = updatesPart
  .split("\n")
  .map((update) => update.split(",").map(Number));

let answer = 0;

// ! loopoing through each update to check if it satisfies each rule
for (let i = 0; i < updates.length; i++) {
  const update = updates[i];
  let valid = true;

  for (let j = 0; j < rules.length; j++) {
    const [before, after] = rules[j];

    const beforeIndex = update.indexOf(before);
    const afterIndex = update.indexOf(after);

    // ! both the before and after should exist in the array and afterIndex must be greater than beforeIndex
    if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex >= afterIndex) {
      valid = false;
      break;
    }
  }

  // ! add middle element of the update if it's valid
  if (valid) {
    answer += update[Math.floor(update.length / 2)];
  }
}

console.log(answer);
