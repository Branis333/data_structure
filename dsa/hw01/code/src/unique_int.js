const fs = require('fs');
const path = require('path');

// Correct paths for input and output directories
const inputDir = path.join(__dirname, '../../sample_inputs/');
const outputDir = path.join(__dirname, '../../sample_results/');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to process the file and extract unique integers
function processFile(inputFilePath, outputFilePath) {
  const data = fs.readFileSync(inputFilePath, 'utf-8');
  const lines = data.split('\n');

  const uniqueIntegers = new Set();

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === '' || /\s/.test(trimmedLine) || isNaN(trimmedLine)) {
      continue;
    }
    const num = parseInt(trimmedLine, 10);
    if (!isNaN(num)) {
      uniqueIntegers.add(num);
    }
  }

  const sortedIntegers = Array.from(uniqueIntegers).sort((a, b) => a - b);
  fs.writeFileSync(outputFilePath, sortedIntegers.join('\n'), 'utf-8');
}

// Main function to iterate over input files and process them
function main() {
  const inputFiles = fs.readdirSync(inputDir);

  for (const inputFile of inputFiles) {
    const inputFilePath = path.join(inputDir, inputFile);
    const outputFilePath = path.join(outputDir, `${inputFile}_results.txt`);
    processFile(inputFilePath, outputFilePath);
  }
}

// Execute the main function
main();
