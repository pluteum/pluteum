import axios from "axios";
import debug from "debug";
import fs from "fs";
import { performance } from "perf_hooks";
import { Client } from "minio";

const storage = new Client({
  endPoint: process.env.MINIO_HOST || "",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "",
  secretKey: process.env.MINIO_SECRET_KEY || "",
});

const fileDebug = debug("pluteum:monocle:files");

export default async function downloadFile(path: string): Promise<string> {
  var t0 = performance.now();
  fileDebug(`Starting file download from: pluteum/${path}`);

  const filePath = path.split("/").pop() || "file";

  return storage.fGetObject("pluteum", path, filePath).then(() => filePath);
}
