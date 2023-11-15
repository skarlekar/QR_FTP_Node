const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Function to draw an image on canvas
async function drawImageOnCanvas(imagePath) {
    // Load the image
    const image = await loadImage(imagePath);

    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Optional: Save the canvas to a file
    const outputPath = path.join(__dirname, 'output.png');
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () =>  console.log('The PNG file was created.'));
}

// Example usage
drawImageOnCanvas('/Users/skarlekar/Documents/GitHub/QR_FTP_Node/images/lime-cat.jpg');
