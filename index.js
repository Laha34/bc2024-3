const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();

program
  .option('-i, --input <path>', 'input file path (required)')
  .option('-o, --output <path>', 'output file path (optional)')
  .option('-d, --display', 'display the result in the console (optional)');

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

const inputFilePath = path.resolve(options.input);

if (!fs.existsSync(inputFilePath)) {
  console.error('Cannot find input file');
  process.exit(1);
}

function getMaxCurrencyRate(inputFile) {
  try {
    const data = fs.readFileSync(inputFile, 'utf-8');
    const ratesArray = JSON.parse(data); 
    const maxRate = Math.max(...ratesArray.map(item => item.rate)); 
    return `Максимальний курс:${maxRate}`;
  } catch (error) {
    console.error('Помилка при обробці файлу:', error);
    process.exit(1);
  }
}

const result = getMaxCurrencyRate(inputFilePath);

if (options.display) {
  console.log(result);
}

if (options.output) {
  const outputFilePath = path.resolve(options.output);
  fs.writeFileSync(outputFilePath, result, 'utf-8');
  console.log(`Data has been written to ${outputFilePath}`);
}

