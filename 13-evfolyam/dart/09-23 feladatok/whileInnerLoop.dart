import "dart:io";

void main() {
    int num = 0;

    do {
        stdout.write("Adj meg egy számot 3 és 9 között: ");
        num = int.tryParse(stdin.readLineSync() ?? '') ?? 0;
    } while(num <3 ||num>9);

    int i = 0;
    while (i <=10) {
        if (i==num) { 
            break;
        }

    int j = 0;
    while(j <= 10) {
        if (j == num) {
            break;
        }
    print('i: $i, j: $j');
    j++;
    }

    i++;
    }
}