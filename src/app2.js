// Import required modules
const fs = require('fs'); // File System module for handling file operations
const QRCode = require('qrcode'); // QR Code module for generating QR codes

// Check command line arguments for the file path
if (process.argv.length <= 2) {
    console.log("Usage: node <script.js> <file_path>");
    process.exit(-1);
}

// Read the file path from command line arguments
const filePath = process.argv[2];

// Define a function to generate QR code for a chunk of data
async function generateQR(data, index) {
    try {
        // Convert the data to a Uint8ClampedArray and create the QR code
        const qrCodeImage = await QRCode.toDataURL(new Uint8ClampedArray(data), { errorCorrectionLevel: 'H' });

        // Output the QR Code to the console
        console.log(`QR Code for chunk ${index}:`, qrCodeImage);
    } catch (err) {
        console.error('Error generating QR code:', err);
    }
}

// Function to process the file in chunks and generate QR codes
function processFile() {
    try {
        // Read the entire file into memory - for large files, consider streaming the file
        const fileData = fs.readFileSync(filePath);

        // Define the size of each chunk (for example, 256 bytes)
        const chunkSize = 256;
        let chunkIndex = 0;

        // Loop through the file data in chunks
        for (let i = 0; i < fileData.length; i += chunkSize) {
            // Extract a chunk of data
            const chunk = fileData.slice(i, i + chunkSize);

            // Generate QR code for the chunk
            generateQR(chunk, ++chunkIndex);
        }
    } catch (err) {
        console.error('Error processing file:', err);
    }
}

// Start processing the file
processFile();
