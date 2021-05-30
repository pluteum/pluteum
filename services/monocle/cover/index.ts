import gm from "gm";
import { readFileSync } from "fs-extra";
import { uploadImage } from "../file_management";

export function generateCoverImage(uuid: string, path: string) {
  console.log(`Generating cover image from ${path}`);
  return new Promise((resolve, reject) => {
    gm(readFileSync(path))
      .resize(1280, 800)
      .toBuffer("PNG", function (err, buffer) {
        if (err) return reject(err);

        resolve(uploadImage(uuid, buffer));
      });
  });
}
