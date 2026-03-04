import 'package:flutter/material.dart';

enum Nights { egy , ketto, harom, negy, ot }

class RadioButtonExample extends StatefulWidget {
  const RadioButtonExample({super.key});

  @override
  State<RadioButtonExample> createState() {
    return _RadioButtonExampleState();
  }
}

class _RadioButtonExampleState extends State<RadioButtonExample> {
  Nights _selectedOption = Nights.egy;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            RadioGroup<Nights>(
              groupValue: _selectedOption,
              onChanged: (Nights? value) {
                setState(() {
                  _selectedOption = value!;
                });
              },
              child: Column(
                children: [
                  ...Nights.values.map(
                    (option) => ListTile(
                      title: Text(
                        option.name[0].toUpperCase() + option.name.substring(1),
                      ),
                      leading: Radio<Nights>(value: option),
                    ),
                  ),
                ],
              ),
            ),
            Divider(
              height: 20,
              thickness: 5,
              indent: 0,
              endIndent: 0,
              color: Colors.black,
            ),
            Text('Ejszakak szama: ${_selectedOption.name}'),
          ],
        ),
      ),
    );
  }
}