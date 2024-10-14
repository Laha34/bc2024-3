const fs = require('fs');

function getMaxCurrencyRate(inputFile, outputFile) {
  try {
   
    const data = fs.readFileSync(inputFile, 'utf-8');
    const ratesArray = JSON.parse(data);
   
    const maxRate = Math.max(...ratesArray.map(item => item.rate));

    const result = `Максимальний курс:${maxRate}`;

    fs.writeFileSync(outputFile, result, 'utf-8');
    console.log(result); 
  } catch (error) {
    console.error('Помилка при обробці файлу:', error);
  }
}


getMaxCurrencyRate('data.json', 'result.txt');
