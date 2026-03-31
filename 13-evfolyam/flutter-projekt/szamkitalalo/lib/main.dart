import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(const SzamkitalaloApp());
}

class SzamkitalaloApp extends StatelessWidget {
  const SzamkitalaloApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Számkitaláló',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
      ),
      home: const GamePage(),
    );
  }
}

class GamePage extends StatefulWidget {
  const GamePage({super.key});

  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> with SingleTickerProviderStateMixin {
  final TextEditingController _controller = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  final Random _rand = Random();

  late int _target;
  int _attempts = 0;
  String _message = 'Találj ki egy számot 1 és 100 között!';
  bool _finished = false;
  final List<int> _history = [];

  @override
  void initState() {
    super.initState();
    _startNewGame();
  }

  void _startNewGame() {
    setState(() {
      _target = _rand.nextInt(100) + 1;
      _attempts = 0;
      _message = 'Találj ki egy számot 1 és 100 között!';
      _finished = false;
      _history.clear();
      _controller.clear();
    });
  }

  void _submitGuess([String? submitted]) {
    if (_finished) return;
    final text = submitted ?? _controller.text;
    if (text.isEmpty) {
      _showSnack('Adj meg egy számot!');
      return;
    }

    final guess = int.tryParse(text.replaceAll(RegExp(r'[^0-9-]'), ''));
    if (guess == null) {
      _showSnack('Érvénytelen szám. Próbáld újra.');
      return;
    }

    if (guess < 1 || guess > 100) {
      _showSnack('A számnak 1 és 100 közé kell esnie.');
      return;
    }

    setState(() {
      _attempts++;
      _history.insert(0, guess);
      if (guess == _target) {
        _message = 'Talált! A szám: $_target. Próbálkozások: $_attempts.';
        _finished = true;
        _focusNode.unfocus();
      } else if (guess > _target) {
        _message = 'Túl nagy! Próbáld kisebbel.';
      } else {
        _message = 'Túl kicsi! Próbáld nagyobbal.';
      }
      _controller.clear();
    });
  }

  void _showSnack(String text) {
    ScaffoldMessenger.of(context).removeCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(text)),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Számkitaláló'),
        centerTitle: true,
        backgroundColor: cs.primary,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [cs.primaryContainer, cs.surface],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 600),
            child: Card(
              elevation: 12,
              margin: const EdgeInsets.all(16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const SizedBox(height: 4),
                    Text(
                      'Gondoltam egy számra',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '1 - 100 között',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 18),
                    TextField(
                      controller: _controller,
                      focusNode: _focusNode,
                      keyboardType: TextInputType.number,
                      textInputAction: TextInputAction.send,
                      decoration: InputDecoration(
                        labelText: 'Tippeld meg a számot',
                        border: const OutlineInputBorder(),
                        suffixIcon: IconButton(
                          icon: const Icon(Icons.send),
                          onPressed: _finished ? null : () => _submitGuess(),
                        ),
                      ),
                      onSubmitted: _submitGuess,
                    ),
                    const SizedBox(height: 12),
                    AnimatedOpacity(
                      duration: const Duration(milliseconds: 350),
                      opacity: 1.0,
                      child: Text(
                        _message,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: _finished ? Colors.green.shade700 : cs.onSurface,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ElevatedButton.icon(
                          onPressed: _finished ? _startNewGame : () => _submitGuess(),
                          icon: Icon(_finished ? Icons.replay : Icons.check),
                          label: Text(_finished ? 'Új játék' : 'Tippelés'),
                          style: ElevatedButton.styleFrom(
                            minimumSize: const Size(140, 44),
                          ),
                        ),
                        const SizedBox(width: 12),
                        OutlinedButton.icon(
                          onPressed: _startNewGame,
                          icon: const Icon(Icons.refresh),
                          label: const Text('Újrakezdés'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Próbálkozások: $_attempts'),
                        Text('Tippelt számok: ${_history.length}'),
                      ],
                    ),
                    const SizedBox(height: 12),
                    if (_history.isNotEmpty) ...[
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Text('Legutóbbi tippek:', style: Theme.of(context).textTheme.bodySmall),
                      ),
                      const SizedBox(height: 8),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: _history.map((g) {
                          final isCorrect = g == _target && _finished;
                          return Chip(
                            label: Text(g.toString()),
                            backgroundColor: isCorrect ? Colors.green.shade100 : null,
                          );
                        }).toList(),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
