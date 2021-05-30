import { exec } from "child_process";
import { remove } from "fs-extra";

export default function processFile(filePath: string) {
  return new Promise((resolve, reject) => {
    const findISBNProcess = exec(`./ebook-tools/find-isbns.sh ./${filePath}`);
    let isbn: string;

    findISBNProcess.stdout?.on("data", (data) => {
      isbn = data.split("\n")[0];
    });

    findISBNProcess.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      if (code === 0) {
        if (isbn) {
          resolve(isbn);
        } else {
          reject(new Error("ISBN_PARSE_FAILED"));
        }
      }

      reject(new Error("ISBN_PARSE_ERROR"));
    });
  });
}
