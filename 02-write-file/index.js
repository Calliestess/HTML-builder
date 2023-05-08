const fs = require('fs');
const path = require('path');
const readline = require('readline');

const task2 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Привет! Введите текст который нужно записать в файл:');

const filePath = path.join('02-write-file', 'message.txt');
let text = '';

task2.on('line', (input) => {
    if (input === 'exit') {
      console.log('Программа завершена!');
      task2.close();
      return;
    }
  
    text += `${input}\n`;
    fs.writeFile(filePath, text, function(err) {
      if (err) throw err;
      console.log(`Текст сохранен в файле: ${filePath}`);
      console.log('Введите следующую строку текста (для выхода напишите "exit"):');
    });
  });

task2.on('SIGINT', () => {
    console.log('Программа завершена!');
    task2.close();
  });
