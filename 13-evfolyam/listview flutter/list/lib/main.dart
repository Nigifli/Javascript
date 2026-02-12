import 'package:flutter/material.dart';

void main() {
  runApp(Subjects());
}

class Classes extends StatelessWidget {
  final List<String> classes = [
    '9A',
    '9B',
    '9C',
    '10A',
    '10B',
    '10C',
    '11A',
    '11B',
    '11C',
    '12A',
    '12B',
    '12C'
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Classes')),
        body: ListView.builder(
          itemCount: classes.length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile(
              title: Text(classes[index]),
            );
          },
        ),
      ),
    );
  }
}

class Subjects extends StatelessWidget {
  final List<String> subjects = [
    'Matematika',
    'Magyar nyelv és irodalom',
    'Történelem'
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Subjects')),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
          Expanded(child: ), 
          subjects.length,
          itemBuilder: (BuildContext context, int index) {
            return GridTile(
                  child: Container(
                    margin: const EdgeInsets.all(10.0),
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.black),
                    ))
            );
          },
        ]),
      ),
    );
  }
}