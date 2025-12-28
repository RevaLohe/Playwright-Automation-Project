import fs from "fs";
import path from "path";


export function readFromJson(filePath: string): any {
    const absolutePath = path.resolve(filePath);
    return JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
}