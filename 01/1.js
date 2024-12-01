//!! QUESTION: https://adventofcode.com/2024/day/1

import fs from "fs/promises"; // !! to read from input-file
import path from "path"; // !! to generate absolute path

// !! had to resolve path from project's root than relative to this script
const inputPath = path.resolve("./01/1.input.txt");

async function day1p1() {
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

    //** sorting */
    const sortedLeft = [...leftCol].sort((a, b) => a - b); //**had to write this comparison function so that array gets sorted numerically not lexographically */

    //  !! eg.  [5, 2, 10, 1].sort((a, b) => a - b);
    // !! Result: [1, 2, 5, 10]
    // ** 5 - 2 = 3 (positive, so 2 moves before 5)
    // ** 5 - 10 = -5 (negative, so 5 moves before 10)
    // ** 2 - 1 = 1 (positive, so 1 moves before 2)

    const sortedRight = [...rightCol].sort((a, b) => a - b);

    const differences = sortedLeft.map((num, index) =>
      Math.abs(num - sortedRight[index])
    ); //** finding absolute differences of corresponding elemnts */

    const answer = differences.reduce((acc, num) => acc + num, 0); //** using reduce to sum up thos differences */

    console.log(answer);
    return answer;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}

day1p1();
