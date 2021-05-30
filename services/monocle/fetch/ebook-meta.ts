import { exec } from "child_process";

function resultsToMap(results: any): object {
  return results.reduce((acc: any, v: string) => {
    const field = v.split(":");

    // console.log(field);

    const key: string = field[0].trim();
    let value: string | string[] = field[1];

    if (key === "Tags" || key === "Author(s)") {
      value = value.split(", ")?.map((v) => v.trim());
    }

    acc[key] = value;

    // console.log(acc);

    return acc;
  }, {});
}

function mapKeyNames(map: any) {
  return {
    title: map?.Title,
    authors: map["Author(s)"]?.map((author: string) => ({ name: author })),
    tags: map?.Tags,
    description: map?.Comments,
  };
}

export default function fetchData(isbn: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const findISBNProcess = exec(`fetch-ebook-metadata -i ${isbn}`);
    let results: string[] = [];

    findISBNProcess.stdout?.on("data", (data) => {
      results = results.concat(data.split("\n"));
    });

    findISBNProcess.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve(mapKeyNames(resultsToMap(results)));
    });
  });
}
