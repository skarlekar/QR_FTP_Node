const { createCanvas, loadImage } = require('canvas');
const express = require('express');
const app = express();
app.use(express.static('public'));
const port = 3000;
const imageDir = 'images'
var imagePath = imageDir + '/image1.jpg';
var currentNumber = 1;
const interval = 250;

function getNextNumber() {
      currentNumber = currentNumber < 5 ? currentNumber + 1 : 1;
      return currentNumber;
}

// Change the image every 10 seconds
setInterval(() => {
    imagePath = imageDir + '/image' + getNextNumber() + '.jpg';
    console.log(imagePath);
}, interval);

app.get('/image', async (req, res) => {
    image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Convert the canvas to a Buffer containing PNG data
    const buffer = canvas.toBuffer('image/png');

    // Set the content type to PNG and send the buffer as a response
    res.type('png').send(buffer);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
