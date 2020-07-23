import axios from "axios";
import debug from "debug";
import fs from "fs";
import { performance } from "perf_hooks";
import { Client } from "minio";

const storage = new Client({
  endPoint: process.env.MINIOHOST || "",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "",
  secretKey: process.env.MINIO_SECRET_KEY || "",
});

const fileDebug = debug("pluteum:monocle:files");

export default async function downloadFile(path: string): Promise<string> {
  var t0 = performance.now();
  fileDebug(`Starting file download from: ${path}`);
  const file = await storage.getObject("pluteum", path);

  fileDebug(`Saving file download to ${path}`);

  file.pipe(fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    file.on("end", () => {
      var t1 = performance.now();

      fileDebug(`Finished file download from: ${path} – took ${t1 - t0}ms`);
      resolve(path);
    });
    file.on("error", (e: Error) => {
      fileDebug(`File downloaded failed with ${e.message}`);
      reject(new Error("FAILED_DOWNLOAD"));
    });
  });
}
