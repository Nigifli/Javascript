import './collections_data.dart';

void main() {
  print(
    '\n1. feladat: Olvasd be a vers szöveget és írasd ki a képernyőre a tartalmat!',
  );
  print(vers);
  
  print('\n2. feladat: Írasd ki csak a 3. versszakot!');
  List<String> verssorok = vers.split('\n');
  for (int i = 16; i <= 20 ; i++) {
    print(verssorok[i]);
  }

  print('\n3. feladat: Írasd ki a studentsből azokat a tanulókat, akik fizikát tanulnak.');
  List<String> tanulok = students.split('\n');
  int lastname = 0, firstname = 1;

  for (String sor in tanulok) {
    if (sor.contains('Physics')) {
      List<String> tanulo = sor.split(';');
      print('${tanulo[lastname]} ${tanulo[firstname]}');
    }
  }

  print('\n4. feladat: Adj a students adatokhoz még két tanulót a megfelelő adatokkal.');
  String tanulo1 = 'John;Lenon;john@lenon.uk;11C;Art';
  String tanulo2 = 'Joky;Ono;joky@ono.jp;12A;Philosophy';
  students += '\n' + tanulo1;
  students += '\n' + tanulo2;
  print(students);
}
