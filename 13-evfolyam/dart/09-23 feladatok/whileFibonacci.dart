void main() {
    int num1 = 0;
    int num2 = 1;

    while (num1 <= 100) {
        print(num1);
        int nextNum = num1+num2;
        num1 = num2;
        num2 = nextNum;
    }
}