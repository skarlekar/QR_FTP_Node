// Select video element
const video = document.getElementById('qr-video');

// Start video stream from camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => video.srcObject = stream)
    .catch(console.error);

// Scan for QR code every frame
video.addEventListener('play', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const scan = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                sendDataToServer(code.data);
            }
        }
        requestAnimationFrame(scan);
    };
    scan();
});

// Function to send QR code data to server
function sendDataToServer(data) {
    fetch('/receive-data', {
        method: 'POST',
        body: btoa(data), // Convert data to base64
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    .then(response => response.text())
    .then(console.log)
    .catch(console.error);
}
