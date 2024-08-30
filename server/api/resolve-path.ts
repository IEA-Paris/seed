// import { defineEventHandler } from "h3";
import path from "path";
import fs from "fs";

export default defineEventHandler(() => {
  const distDir = path.resolve("node_modules/@paris-ias/data/dist");

  const getJsonFiles = (directory: string): string[] => {
    return fs
      .readdirSync(directory)
      .filter((file) => path.extname(file) === ".json")
      .map((file) => path.join(directory, file));
  };

  const jsonFiles = getJsonFiles(distDir);

  const modulesState: Record<string, any> = {};

  const readJsonFile = (filePath: string): any => {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error(`Error reading file ${filePath}:`, err);
    }
  };

  jsonFiles.forEach((filePath) => {
    const content = readJsonFile(filePath);
    if (content) {
      const fileName = path.basename(filePath, ".json");
      modulesState[fileName] = content;
    }
  });
  return { modulesState };
});
