import 'dart:io';

void main() {
print("Adja meg a nevet: ");
String? name1 = stdin.readLineSync();
print("A beirt nev: ${name1}");

String name = "Helga Gizi";
int iranyitoszam = 3021;
String utca = "Temeto utca";
String telepules = "Gyál";
int hazszam = 39;
double atlag = 4.34736;

print("Nev: $name");
print("Iranyitoszam: $iranyitoszam");
print("Utca: $utca");
print("Telepules: $telepules");
print("Hazszam: $hazszam");
print("Atlag: ${atlag.toStringAsFixed(3)}");
}