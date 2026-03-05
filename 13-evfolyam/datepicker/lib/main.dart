import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: BirthDatePage(),
    );
  }
}

class BirthDatePage extends StatefulWidget {
  const BirthDatePage({super.key});

  @override
  State<BirthDatePage> createState() => _BirthDatePageState();
}

class _BirthDatePageState extends State<BirthDatePage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _dateController = TextEditingController();

  DateTime? selectedDate;
  int? age;
  bool isBirthday = false;

  Future<void> pickDate() async {
    DateTime today = DateTime.now();

    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime(today.year - 18),
      firstDate: DateTime(1900),
      lastDate: today,
    );

    if (picked != null) {
      setState(() {
        selectedDate = picked;

        _dateController.text =
            "${picked.year}.${picked.month.toString().padLeft(2, '0')}.${picked.day.toString().padLeft(2, '0')}";

        age = calculateAge(picked);

        isBirthday =
            picked.month == today.month && picked.day == today.day;
      });
    }
  }

  int calculateAge(DateTime birthDate) {
    DateTime today = DateTime.now();
    int years = today.year - birthDate.year;

    if (today.month < birthDate.month ||
        (today.month == birthDate.month &&
            today.day < birthDate.day)) {
      years--;
    }

    return years;
  }

  String? validateDate(String? value) {
    if (selectedDate == null) {
      return "Kötelező mező";
    }

    DateTime today = DateTime.now();

    if (selectedDate!.isAfter(today)) {
      return "Nem lehet jövőbeli dátum";
    }

    if (calculateAge(selectedDate!) < 18) {
      return "Legalább 18 évesnek kell lenned";
    }

    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.blue, Colors.purple],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 400),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Card(
                elevation: 8,
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [

                        const Text(
                          "Születési dátum",
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        const SizedBox(height: 20),

                        TextFormField(
                          controller: _dateController,
                          readOnly: true,
                          decoration: const InputDecoration(
                            labelText: "Válaszd ki a dátumot",
                            border: OutlineInputBorder(),
                          ),
                          onTap: pickDate,
                          validator: validateDate,
                        ),

                        const SizedBox(height: 20),

                        ElevatedButton(
                          onPressed: () {
                            if (_formKey.currentState!.validate()) {
                              setState(() {});
                            }
                          },
                          child: const Text("Életkor kiszámítása"),
                        ),

                        const SizedBox(height: 20),

                        if (selectedDate != null && age != null)
                          Column(
                            children: [
                              Text(
                                "Kiválasztott dátum: ${_dateController.text}",
                                style: const TextStyle(fontSize: 16),
                              ),
                              const SizedBox(height: 10),
                              Text(
                                "Életkor: $age év",
                                style: const TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),

                        const SizedBox(height: 20),

                        if (isBirthday)
                          Column(
                            children: [
                              const Text(
                                "Boldog születésnapot! 🎉",
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 10),
                              Image.network(
                                "https://recipesblob.oetker.ca/assets/b75297c3976e41a39cf3e74376d1459a/360x400/birthday-cake-11.webp",
                                height: 120,
                              )
                            ],
                          )
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}