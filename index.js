/* 
1. Use the inquirer npm package to get user input.*/

/*
2. Use the qr-image npm package to turn the user entered URL into a QR code image.*/


/*
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Step 1: Prompt the user for text or URL input
inquirer.prompt([
  {
    type: 'input',
    name: 'inputText',
    message: 'Enter the text or URL you want to generate a QR code for:',
  },
  {
    type: 'list',
    name: 'outputType',
    message: 'How would you like to display the QR code?',
    choices: ['Display in terminal', 'Save as image file'],
  }
]).then(answers => {
  const { inputText, outputType } = answers;

  // Step 2: Save the user input to a txt file
  fs.writeFile('user_input.txt', inputText, (err) => {
    if (err) {
      console.error('Error saving user input to file:', err);
      return;
    }
    console.log('User input has been saved to user_input.txt');
  });

  if (outputType === 'Display in terminal') {
    // Step 3: Generate and display QR code in the terminal
    qr.image(inputText, { type: 'png' }).pipe(process.stdout);
  } else if (outputType === 'Save as image file') {
    // Step 4: Generate and save QR code as an image file
    const qr_svg = qr.image(inputText, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qrcode.png'));
    console.log('QR code has been generated and saved as qrcode.png');
  }
});
