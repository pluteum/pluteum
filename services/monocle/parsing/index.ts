import { exec } from "child_process";

export default function processFile(filePath: String) {
  return new Promise((resolve, reject) => {
    const findISBNProcess = exec(`./ebook-tools/find-isbns.sh ./${filePath}`);
    let isbn: string;

    findISBNProcess.stdout?.on("data", (data) => {
      isbn = data.split("\n")[0];
    });

    findISBNProcess.on("close", (code) => {
      resolve(isbn);
      console.log(`child process exited with code ${code}`);
    });
  });
}
