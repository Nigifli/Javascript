import 'package:flutter/material.dart';

class CheckboxExample extends StatefulWidget {
  const CheckboxExample({super.key});

  @override
  State<CheckboxExample> createState() {
    return _CheckboxExampleState();
  }
}

class _CheckboxExampleState extends State<CheckboxExample> {
  bool isBreakfast = false;
  bool isLunch = false;
  bool isDinner = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  children: [
                    Checkbox(
                      value: isBreakfast,
                      onChanged: (bool? value) {
                        setState(() {
                          isBreakfast = value!;
                        });
                      },
                    ),
                    Text('Reggeli'),
                  ],
                ),
                Column(
                  children: [
                    Checkbox(
                      value: isLunch,
                      onChanged: (bool? value) {
                        setState(() {
                          isLunch = value!;
                        });
                      },
                    ),
                    Text('Ebéd'),
                  ],
                ),
                Column(
                  children: [
                    Checkbox(
                      value: isDinner,
                      onChanged: (bool? value) {
                        setState(() {
                          isDinner = value!;
                        });
                      },
                    ),
                    Text('Vacsora'),
                  ],
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Reggeli: $isBreakfast'),
                      SizedBox(height: 8),
                      Text('Ebed: $isLunch'),
                      SizedBox(height: 8),
                      Text('Vacsora: $isDinner'),
                    ],
                  ),
                ),
              ],
            ),
            Divider(
              height: 20,
              thickness: 5,
              indent: 0,
              endIndent: 0,
              color: Colors.black,
            ),
          ],
        ),
      ),
    );
  }
}
