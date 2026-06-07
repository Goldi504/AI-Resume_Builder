import ImageKit from '@imagekit/nodejs';

// const imagekit = new ImageKit({
//   privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
// });

// export default imagekit



const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log("PUBLIC:", !!process.env.IMAGEKIT_PUBLIC_KEY);
console.log("PRIVATE:", !!process.env.IMAGEKIT_PRIVATE_KEY);
console.log("ENDPOINT:", process.env.IMAGEKIT_URL_ENDPOINT);

export default imagekit