import dotenv from "dotenv";
import ImageKit from "@imagekit/nodejs";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log(imagekit);
console.log(Object.keys(imagekit));