import 'package:flutter/material.dart';

void main() {
  runApp(const CounterApp());
}

class CounterApp extends StatelessWidget {
  const CounterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const CounterScreen(title: 'Flutter Counter Page'),
    );
  }
}

class CounterScreen extends StatefulWidget {
  const CounterScreen({super.key, required this.title});

  

  final String title;

  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  void _decrementCounter() {
    setState(() {
      _counter--;
    });
  }

  void _reset() {
    setState(() {
      _counter = 0;
    });
  }


  @override
  Widget build(BuildContext context) {
   
    return Scaffold(
      appBar: AppBar(
       
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
       
        title: Text(widget.title),
      ),
      body: Center(
       
        child: Column(
          
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('A counter aktuális értéke:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [FloatingActionButton(
                        onPressed: _incrementCounter,
                        tooltip: 'Increment',
                        child: const Icon(Icons.add),
                        ), SizedBox(width: 40,),
                          FloatingActionButton(
                          onPressed: _decrementCounter,
                          tooltip: 'Decrement',
                          child: const Icon(Icons.remove),
                        ),
      ],
              ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _reset,
        tooltip: 'Reset',
        child: const Icon(Icons.delete),
      ),
    );
  }
}
