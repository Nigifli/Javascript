import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  final Color bgColor = const Color.fromRGBO(250, 243, 225, 1);
  final Color firstColor = const Color.fromRGBO(250, 129, 18, 1);
  final Color secondColor = const Color.fromRGBO(34, 34, 34, 1);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Counter',
      home: Scaffold(
        backgroundColor: bgColor,
        appBar: AppBar(
          title: const Text("Counter App"),
          backgroundColor: firstColor,
          foregroundColor: secondColor,
        ),
      )
    );
  }

}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});


  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 100;

  

  void changeCounter(int value) {
    setState(() {
      _counter += value;
    });
  }

  @override
  Widget build(BuildContext context) {

    final Color bgColor = const Color.fromRGBO(250, 243, 225, 1);
    final Color firstColor = const Color.fromRGBO(250, 129, 18, 1);
    final Color secondColor = const Color.fromRGBO(34, 34, 34, 1);

    return Scaffold(
      appBar: AppBar(

        backgroundColor: Theme.of(context).colorScheme.inversePrimary,

        title: Text(widget.title),
      ),
      body: Center(

        child: Column(

          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const SizedBox(height: 80),
            Text(
              'Current counter value',
              style: TextStyle(
                fontSize: 20,
                color: secondColor
              ),
            ),

            const SizedBox(height: 20),

            Text(
              '$_counter',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.bold,
                color: secondColor
              ),
            ),
            const SizedBox(height: 30),

            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  height: 60,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                    backgroundColor: bgColor,
                    shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                        ),
                    ),
                    onPressed: () => changeCounter(-1), 
                    child: const Text("-1"),
                        
                      )
                    ),

                    const SizedBox( width: 30),
                    SizedBox(
                      height: 60,
                      child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                      backgroundColor: secondColor,
                      shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                        
                        ),
                    ),
                    onPressed: () => changeCounter(1), 
                    child: const Text("+1"),
                  ),
                )
              ],
              
            ),

            const SizedBox(height: 30),

            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  height: 50,
                  child: MaterialButton(
                      color: bgColor,
                      elevation: 6,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                        
                        ),
                    
                    onPressed: () => changeCounter(-10), 
                    child: const Text("-10"),
                        
                      ), 
                    ),
          
                  const SizedBox(width: 30),
                  SizedBox(
                    height: 50,
                    child: MaterialButton(
                      color: bgColor,
                      elevation: 6,
                      shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                    ),
                    onPressed: () => changeCounter(10),
                    child: const Text("+10"),
              )
            )
          ],
        ),
        ]),
      ),
    );
  }
}
