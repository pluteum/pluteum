import { exec } from "child_process";

export default function processFile(filePath: String) {
  const findISBNProcess = exec(`./ebook-tools/find-isbns.sh ./${filePath}`);
  let isbn: string;

  findISBNProcess.stdout?.on("data", (data) => {
    isbn = data.split("\n")[0];
  });

  findISBNProcess.stderr?.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  findISBNProcess.on("close", (code) => {
    console.log("first isbn", isbn);
    console.log(`child process exited with code ${code}`);
  });
}
