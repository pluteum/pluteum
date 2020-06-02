import axios from "axios";
import debug from "debug";
import fs from "fs";
import { performance } from "perf_hooks";

const fileDebug = debug("pluteum:monocle:files");

export default async function downloadFile(url: string): Promise<String> {
  var t0 = performance.now();
  fileDebug(`Starting file download from: ${url}`);
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  const filePath = response.request.path.split("/")[2];

  const stream = response.data;

  fileDebug(`Saving file download to ${filePath}`);

  stream.pipe(fs.createWriteStream(filePath));

  return new Promise((resolve, reject) => {
    stream.on("end", () => {
      var t1 = performance.now();

      fileDebug(`Finished file download from: ${url} – took ${t1 - t0}ms`);
      resolve(filePath);
    });
    stream.on("error", (e: Error) => {
      fileDebug(`File downloaded failed with ${e.message}`);
      reject(new Error("FAILED_DOWNLOAD"));
    });
  });
}
