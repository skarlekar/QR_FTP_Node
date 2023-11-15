const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

let fileWriteStream;
let lastData = '';
let sameDataCount = 0;

// Initialize file stream
fileWriteStream = fs.createWriteStream('output.bin', { flags: 'a' });

// Use body-parser to parse incoming text data
app.use(bodyParser.text({ type: '*/*' }));

// Route to handle incoming data
app.post('/receive-data', (req, res) => {
    const data = req.body;

    // Check for consecutive same data
    if (data === lastData) {
        sameDataCount++;
    } else {
        sameDataCount = 0;
        lastData = data;

        // Convert Base64 encoded data to binary and write to file
        const buffer = Buffer.from(data, 'base64');
        fileWriteStream.write(buffer);
    }

    // Close file and stop server after 5 consecutive same data submissions
    if (sameDataCount >= 5) {
        fileWriteStream.end(() => {
            console.log('File writing complete, server will stop.');
            process.exit(0);
        });
    }

    res.status(200).send('Data received');
});

// Static file serving - Serve HTML file
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
