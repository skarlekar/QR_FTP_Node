# QR_FTP_Node

Node.js application that reads a binary file, splits it into chunks, and generates QR codes for each chunk using the qrcode npm library using these steps:

## Read the binary file path from the command line: 
Use Node.js' process.argv to get the file path input.
## Read the binary file:  
Use Node.js' fs module to read the file.
## Split the file into chunks: 
Determine an appropriate chunk size and split the file data.
## Generate QR codes for each chunk: 
Use the qrcode npm library to generate QR codes.
## Display QR codes in the console: 
Convert each QR code into a format that can be displayed in the console.
