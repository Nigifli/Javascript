import 'dart:io';

void main() {
String name = "Szegedi SZC Vasvári Pál Gazdasági és Informatikai Technikum";
int iranyitoszam = 6722;
String utca = "Gutenberg utca";
String telepules = "Szeged";
int hazszam = 11;

print("Nev: $name");
print("Iranyitoszam: $iranyitoszam");
print("Utca: $utca");
print("Telepules: $telepules");
print("Hazszam: $hazszam");

int atlag = 28;
int kilencedikesek = 4;
int tobbiEvfolyam = 3;

print("A 9. evfolyam letszama: ${atlag*kilencedikesek}");
print("A tobbi evfolyam letszama: ${atlag*tobbiEvfolyam}")
}