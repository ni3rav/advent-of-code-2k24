import { readFromFile } from "../utils/readFromFile.js";

const input = readFromFile("./05/input.txt");

const [rulesPart, updatesPart] = input.split("\n\n");

const inputRules = rulesPart
  .split("\n")
  .map((rule) => rule.split("|").map(Number));

const inputUpdates = updatesPart
  .split("\n")
  .map((update) => update.split(",").map(Number));


  //* for this question only
function correctOrder(update, rules) {
  //* a shallow copy to modify
  const correctedUpdate = [...update];

  let swapped;
  do {
    swapped = false;

    // * reach the rule which failed the update in the first place
    for (const [before, after] of rules) {
      const beforeIndex = correctedUpdate.indexOf(before);
      const afterIndex = correctedUpdate.indexOf(after);

      if (
        beforeIndex !== -1 &&
        afterIndex !== -1 &&
        beforeIndex >= afterIndex
      ) {
        //* swap the incorrect order
        [correctedUpdate[beforeIndex], correctedUpdate[afterIndex]] = [
          correctedUpdate[afterIndex],
          correctedUpdate[beforeIndex],
        ];
        swapped = true;
        break;
      }
    }
  } while (swapped);

  return correctedUpdate;
}


//* first part's solution is wrapped in this function now
function findIncorrectUpdates(updates, rules) {
  let result = 0;

  for (const update of updates) {
    // check if the current update is in the correct order
    let valid = true;
    for (const [before, after] of rules) {
      const beforeIndex = update.indexOf(before);
      const afterIndex = update.indexOf(after);

      if (
        beforeIndex !== -1 &&
        afterIndex !== -1 &&
        beforeIndex >= afterIndex
      ) {
        valid = false;
        break;
      }
    }

    // !! passing incorrect update to correct order to fix it
    if (!valid) {
      const correctedUpdate = correctOrder(update, rules);
      result += correctedUpdate[Math.floor(correctedUpdate.length / 2)];
    }
  }

  return result;
}

const answer = findIncorrectUpdates(inputUpdates, inputRules);
console.log(answer);
