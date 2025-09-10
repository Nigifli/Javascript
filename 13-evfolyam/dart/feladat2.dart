import 'dart:io';

void main() {
int intValue = 200;
double doubleValue = 3.53;
String strValue = "Józsi";
bool boolValue = true;

double muvelet = intValue + doubleValue;
double muvelet2= intValue - doubleValue;
double muvelet3 = intValue * doubleValue;
double muvelet4 = intValue / doubleValue;
double muvelet5 = intValue % doubleValue;

print("A ${intValue} és ${doubleValue} osszege: ${muvelet}, ${muvelet.toInt()}");
print("A ${intValue} és ${doubleValue} kulonbsege: ${muvelet2}, ${muvelet2.toInt()}");
print("A ${intValue} és ${doubleValue} szorzata: ${muvelet3}, ${muvelet3.toInt()}");
print("A ${intValue} és ${doubleValue} hanyadosa: ${muvelet4}, ${muvelet4.toInt()}");
print("A ${intValue} és ${doubleValue} osszege: ${muvelet5}, ${muvelet5.toInt()}");

print("${!boolValue}");
}