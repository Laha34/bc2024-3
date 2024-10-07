// index.js
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();

// Налаштування параметрів командного рядка
program
  .option('-i, --input <path>', 'input file path (required)')
  .option('-o, --output <path>', 'output file path (optional)')
  .option('-d, --display', 'display the result in the console (optional)');

// Розбір аргументів командного рядка
program.parse(process.argv);
const options = program.opts();

// Перевірка наявності обов'язкового параметру `--input`
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Отримання абсолютного шляху до файлу
const inputFilePath = path.resolve(options.input);

// Перевірка існування файлу за вказаним шляхом
if (!fs.existsSync(inputFilePath)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Зчитування вмісту вхідного файлу
const inputData = fs.readFileSync(inputFilePath, 'utf-8');

// Перевірка, чи потрібно виводити результат у консоль
if (options.display) {
  console.log('Data from input file:', inputData);
}

// Перевірка, чи задано шлях для виведення результату у файл
if (options.output) {
  const outputFilePath = path.resolve(options.output);
  fs.writeFileSync(outputFilePath, inputData, 'utf-8');
  console.log(`Data has been written to ${outputFilePath}`);
}

// Якщо не задано параметри `--output` або `--display`, програма нічого не виводить
