import fs from "fs";
import path from "path";

export function readFromFile(filePath) {
  const absPath = path.resolve(filePath);
  const input = fs.readFileSync(absPath, "utf-8");
  return input;
}
