const fs = require('fs'); // Import the filesystem module
const qrcode = require('qrcode'); // Import the qrcode library
const { createCanvas, loadImage } = require('canvas');
const express = require('express');
const app = express();
const port = 3000;
const doneImage = '/imdone.jpg';
var fileChunks;
let chunkIndex = 0;

//const interval = 250;
//const canvasWidth = 800;
//const canvasHeight = 800;

// Function to split a buffer into chunks of a specific size
function splitBufferIntoChunks(buffer, chunkSize) {
    const chunks = [];
    for (let i = 0; i < buffer.length; i += chunkSize) {
        chunks.push(buffer.slice(i, i + chunkSize));
    }
    return chunks;
}

// Function to generate and display QR codes for a given chunk
async function generateQRCodeForChunk(chunk) {
    try {
        var myChunk = Buffer.from(chunk).toString('base64');
        console.log('myChunk: ' + myChunk);
        return await qrcode.toDataURL( myChunk, {  version: 5, errorCorrectionLevel: 'L', mode: 'byte' });
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Serve QR code image or placeholder
app.get('/image', async (req, res) => {
    if (chunkIndex < fileChunks.length) {
      console.log('Processing chunk: ' + chunkIndex);
      const qrData = fileChunks[chunkIndex++];
      const qrImage = await generateQRCodeForChunk(qrData);
      console.log('qrImage: ' + qrImage);
      res.redirect(qrImage);
    } else {
        console.log('all chunks depleted!')
      // Serve a placeholder image after all chunks are served
      //res.sendFile(doneImage); // Update with your placeholder image path
      res.sendFile(doneImage, { root: __dirname }); // Update with your placeholder image path
    }
  });

// function to process the file
function processFile(filePath) {
    // Read the file as a binary buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Define the size of each chunk (in bytes)
    // Adjust this size depending on the maximum capacity of QR code
    const chunkSize = 60; // Example size, adjust based on QR code capacity

    // Split the buffer into chunks
    const chunks = splitBufferIntoChunks(fileBuffer, chunkSize);

   return chunks;
}

// Get the file path from command line arguments
const filePath = process.argv[2];

// Call the main function with the file path
fileChunks = processFile(filePath)

console.log('filechunks: ' + fileChunks.length);

// Static file serving - Serve HTML file
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

