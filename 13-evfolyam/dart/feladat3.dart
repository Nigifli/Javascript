void main() {
    String vers = '''Rossz a világ? Légy jó tehát magad!
Üres a lét? Adj tartalmat neki!
Az ember szolga mind? Légy te szabad!
Hídd sorsodat bátor versenyre ki!''';

print("${vers}");

print("${vers.toLowerCase()}");

print("${vers.toUpperCase()}");

print("${vers.trim()}");

print("${vers.replaceAll(' ', '-')}");

if (vers.length >= 5) {
    print("...${vers.substring(4)}");
}

print(vers.substring(0, 3).runes.map((rune) => rune.toString()).join(" "));

if (vers.length >= 10) {
    print("${vers.substring(9)} ...");
}
}


