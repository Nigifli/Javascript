import 'dart:io';

void main() {
  // 1.
  File file = File('./bin/sample.txt');
  file.writeAsStringSync('');

  file = File('./bin/sample.csv');
  file.writeAsStringSync('');

  // 2.

  file = File('./bin/school.txt');
  String content =
      "Szegedi SZC Vasvári Pál Gazdasági és Informatikai Technikum\n6722\nGutenberg u. 11.\nSzeged";
  file.writeAsStringSync(content);

  // 3.
  file.writeAsStringSync("\nosztály: 13/b", mode: FileMode.append);

  // 4. 
  file = File('./bin/students.csv');
  file.writeAsStringSync("keresztnev, vezeteknev, varos", mode: FileMode.append);
  print("Adja meg a keresztnevet: ");
  String keresztnev = stdin.readLineSync() ?? '';
  print("Adja meg a vezeteknevet: ");
  String vezeteknev = stdin.readLineSync() ?? '';
  print("Adja meg a varos nevet: ");
  String varos = stdin.readLineSync() ?? '';
  file.writeAsStringSync('\n$keresztnev, $vezeteknev, $varos',
      mode: FileMode.append);

  // 5. 

  content = file.readAsStringSync();
  List<String> rows = content.split('\n');
  for (String row in rows) {
    List<String> data = row.split(', ');
    print('${data[2]} ${data[0]} ${data[1]}');
  }
  
}