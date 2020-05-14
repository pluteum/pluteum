import axios from "axios";
import debug from "debug";
import { performance } from "perf_hooks";

const fileDebug = debug("pluteum:monocle:files");

export default async function downloadFile(url: string): Promise<Buffer> {
  var t0 = performance.now();
  fileDebug(`Starting file download from: ${url}`);
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  const buffers: Buffer[] = [];

  const stream = response.data;

  stream.on("data", (c: Buffer) => buffers.push(c));

  return new Promise((resolve, reject) => {
    stream.on("end", () => {
      var t1 = performance.now();

      fileDebug(`Finished file download from: ${url} – took ${t1 - t0}ms`);
      resolve(Buffer.concat(buffers));
    });
    stream.on("error", (e: Error) => {
      fileDebug(`File downloaded failed with ${e.message}`);
      reject();
    });
  });
}
