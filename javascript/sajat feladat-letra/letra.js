import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'dobasok.txt');

console.log('2. feladat');

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function calculateAndDisplayPositions(diceRolls) {
  let position = 0;
  let ladderCount = 0;
  const positions = diceRolls.map((roll) => {
    position += roll;
    if (position % 10 === 0) {
      position -= 3;
      ladderCount++;
    }
    return position;
  });
  console.log(positions.join(' '));
  console.log(`3. feladat`);
  console.log(`A játék során ${ladderCount} alkalommal lépet létrára.`);
}

async function readAndLogFile() {
  try {
    const content = await readFile();
    const diceRolls = content.split(',').map((num) => parseInt(num.trim(), 10));
    return diceRolls; 
     
  } catch (err) {
    console.error('Error:', err);
  }
}

const didFinish = (lastField) => lastField >= 45;

const diceRolls = await readAndLogFile();
calculateAndDisplayPositions(diceRolls);
const lastPostion = diceRolls.reduce((acc, curr) => acc + curr, 0);

console.log(`4. feladat`);
if (didFinish(lastPostion)) {
  console.log('A játékos befejezte.');
} else {
  console.log('A játékos abbahagyta. ');
}
