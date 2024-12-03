import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'uvegek.txt');

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

function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  try {
    console.log('2. feladat');
    
    const fileData = await readFile();
    const uvegek = fileData.split(',').map(Number);

    if (uvegek.length !== 15) {
      console.error('Az uvegek.txt fájl nem tartalmaz pontosan 15 számot.');
      return;
    }

    const lekvarMennyiseg = parseInt(
      await promptUser('Mari néni lekvárja (dl): '),
      10
    );

    if (isNaN(lekvarMennyiseg) || lekvarMennyiseg <= 0 || lekvarMennyiseg > 200) {
      console.error('Hibás adat. A lekvár mennyiségének 0 < L ≤ 200 közötti számnak kell lennie!');
      return;
    }

    const maxUvegMeret = Math.max(...uvegek);
    const maxUvegIndex = uvegek.indexOf(maxUvegMeret) + 1;

    console.log('3. feladat');
    console.log(`A legnagyobb üveg: ${maxUvegMeret} dl és ${maxUvegIndex}. a sorban.`);

    const teljesKapacitas = uvegek.reduce((osszeg, aktualis) => osszeg + aktualis, 0);

    console.log('4. feladat');
    if (teljesKapacitas >= lekvarMennyiseg) {
      console.log('Elegendő üveg volt.');
    } else {
      console.log('Maradt lekvár.');
    }
  } catch (error) {
    console.error('Hiba történt:', error.message);
  }
}

main();
