const fs = require('fs'); // Import the filesystem module
const qrcode = require('qrcode'); // Import the qrcode library

// Function to split a buffer into chunks of a specific size
function splitBufferIntoChunks(buffer, chunkSize) {
    const chunks = [];
    for (let i = 0; i < buffer.length; i += chunkSize) {
        chunks.push(buffer.slice(i, i + chunkSize));
    }
    return chunks;
}

// Function to generate and display QR codes for each chunk
async function generateQRCodes(chunks) {
    for (const chunk of chunks) {
        try {
            //var myChunk = chunk;
            //var myChunk = new Uint8ClampedArray(chunk);
            var myChunk = Buffer.from(chunk).toString('base64');
            console.log(myChunk);
            const qrCodeString = await qrcode.toString( myChunk, { type: 'terminal', version: 5, errorCorrectionLevel: 'L', mode: 'byte' });
            console.log(qrCodeString);
        } catch (err) {
            console.error(err)
        }
    }
}

// Main function to process the file
async function processFile(filePath) {
    // Read the file as a binary buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Define the size of each chunk (in bytes)
    // Adjust this size depending on the maximum capacity of QR code
    const chunkSize = 48; // Example size, adjust based on QR code capacity

    // Split the buffer into chunks
    const chunks = splitBufferIntoChunks(fileBuffer, chunkSize);

    // Generate QR codes for each chunk
    await generateQRCodes(chunks);
}

// Get the file path from command line arguments
const filePath = process.argv[2];

// Call the main function with the file path
processFile(filePath).catch(console.error);
