import "dart:io";

void main() {
    String text = ''' 
            Happy birthday!
            Happy birthday to you!
            ''';
    int num = 1;
    do {
        print("Írjon be egy számot 1 és 100 között!");
        num = int.parse(stdin.readLineSync()!);
    } while(num < 1 || num > 100);

    for (int i = 1; i <= num; i++) {
        print(text);
    }
}