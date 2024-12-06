// ! DAY 6: https://adventofcode.com/2024/day/6

import { readFromFile } from "../utils/readFromFile.js";

const input = readFromFile("./06/input.txt")
  .split("\n")
  .map((line) => line.split(""));

function predictGuardPath(input) {
  const map = input;
  const rows = map.length;
  const cols = map[0].length;

  // ! initialize guard's position and direction
  let guardRow, guardCol, direction;

  // * define directions and movements
  const directions = ["up", "right", "down", "left"];
  const deltas = {
    up: [-1, 0],
    right: [0, 1],
    down: [1, 0],
    left: [0, -1],
  };

  // ! find guard's starting position
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      //* starting position is ^ (kinda cheating here lol)
      if (map[row][col] === "^") {
        guardRow = row;
        guardCol = col;
        direction = { "^": "up", ">": "right", v: "down", "<": "left" }[
          map[row][col]
        ];
        map[row][col] = "."; // * clear starting position
        break;
      }
    }
  }

  // ! track visited positions
  const visited = [];
  visited.push([guardRow, guardCol]);

  // ! simulate guard's movement
  while (true) {
    const [deltaRow, deltaCol] = deltas[direction];
    const nextRow = guardRow + deltaRow;
    const nextCol = guardCol + deltaCol;

    // * check if guard is leaving the map
    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
      break;
    }

    // * check for obstacle
    if (map[nextRow][nextCol] === "#") {
      // * turn right 90 degrees
      direction = directions[(directions.indexOf(direction) + 1) % 4];
    } else {
      // * move forward
      guardRow = nextRow;
      guardCol = nextCol;

      // * mark position as visited if not already
      let isVisited = false;
      for (let i = 0; i < visited.length; i++) {
        if (visited[i][0] === guardRow && visited[i][1] === guardCol) {
          isVisited = true;
          break;
        }
      }
      if (!isVisited) {
        visited.push([guardRow, guardCol]);
      }
    }
  }

  // ! return count of visited positions
  return visited.length;
}

const answer = predictGuardPath(input);
console.log(answer);
