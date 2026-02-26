import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: DropdownButtonExample(),
  ));
}

class DropdownButtonExample extends StatefulWidget {
  const DropdownButtonExample({super.key});

  @override
  State<DropdownButtonExample> createState() {
    return _DropdownButtonExampleState();
  }
}

class _DropdownButtonExampleState extends State<DropdownButtonExample> {
  List<String> subjects = ['Történelem', 'Magyar nyelv', 'Matematika', 'Angol nyelv', 'Német nyelv'];

  List<String> level = ['Közép szint', 'Emelt szint'];

  late String selectedSubject;
  late String selectedLevel;

  @override
  void initState() {
    super.initState();
    selectedSubject= subjects[0];
    selectedLevel = level[0];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            Text('Valassza ki az erettsegi targyat'),

            SizedBox(
            child: 
            DropdownButton<String>(
              value: selectedSubject,
              onChanged: (String? newValue) {
                setState(() {
                  selectedSubject = newValue!;
                });
              },
              items: subjects.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),  
            ),
            ),
            Text('Kerem valassza ki az erettsegi szintjet'),
            SizedBox(
            child: 
            DropdownButton<String>(
              value: selectedLevel,
              onChanged: (String? newValue) {
                setState(() {
                  selectedLevel = newValue!;
                });
              },
              items: level.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),  
            ),
            ),
            SizedBox(height: 30),
            Text('Kivalasztott erettsegi tantargy es szint: $selectedSubject - $selectedLevel'),
            SizedBox(height: 30),
          ],
        ),
      ),
    );
  }


  
}

