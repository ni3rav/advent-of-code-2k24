//!! QUESTION: https://adventofcode.com/2024/day/1

import fs from "fs/promises"; // !! to read from input-file
import path from "path"; // !! to generate absolute path

// !! had to resolve path from project's root than relative to this script
const inputPath = path.resolve("./01/2.input.txt");

async function day1p2() {
  try {
    // ** reading the input
    const input = await fs.readFile(inputPath, "utf-8");

    // ** splitting the input into an array of two columns while removing empty ones
    const rows = input.split("\n").filter((line) => line.trim() !== "");

    //** left and right columns */
    const leftCol = [];
    const rightCol = [];

    // ** pushing 1st from each row to left and 2nd to right
    rows.forEach((row) => {
      const columns = row
        .split(/\s+/)
        .map((value) => parseInt(value.trim(), 10));
      leftCol.push(columns[0]);
      rightCol.push(columns[1]);
    });

    let answer = 0;

    for (let i = 0; i < leftCol.length; i++) {
      const leftColElement = leftCol[i];
      let multiplicationFactor = 0;

      for (let j = 0; j < rightCol.length; j++) {
        if (leftColElement === rightCol[j]) {
          multiplicationFactor += 1;
        }
      }

      answer += leftColElement * multiplicationFactor;
    }

    console.log(answer);
  } catch (error) {
    console.error("Error:", error);
    throw err;
  }
}

day1p2();
