import * as fs from "fs";

export class FileReader {
    static readFromFileSystem(url: string) {
        return fs.createReadStream(url);
    }
}