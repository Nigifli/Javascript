import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(const MemoryApp());
}

class MemoryApp extends StatelessWidget {
  const MemoryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Memória játék',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.purple),
        useMaterial3: true,
      ),
      home: const MemoryHome(),
    );
  }
}

class CardModel {
  final int id;
  final String content;
  bool revealed;
  bool matched;

  CardModel({required this.id, required this.content, this.revealed = false, this.matched = false});
}

class MemoryHome extends StatefulWidget {
  const MemoryHome({super.key});

  @override
  State<MemoryHome> createState() => _MemoryHomeState();
}

class _MemoryHomeState extends State<MemoryHome> {
  final Random _rng = Random();
  late List<CardModel> _cards;
  bool _busy = false; // waiting while flipping back
  int _moves = 0;
  Stopwatch _stopwatch = Stopwatch();
  Timer? _ticker;

  int gridSize = 4; // 4x4 by default

  final List<String> _emojiPool = [
    '🍎','🍌','🍇','🍓','🍉','🍒','🥝','🍍','🍑','🥑','🍋','🍈','🍐','🍊','🥥','🍅','🥕','🌽'
  ];

  @override
  void initState() {
    super.initState();
    _newGame();
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }

  void _startTimer() {
    _stopwatch.reset();
    _stopwatch.start();
    _ticker?.cancel();
    _ticker = Timer.periodic(const Duration(seconds: 1), (_) => setState(() {}));
  }

  void _stopTimer() {
    _ticker?.cancel();
    _stopwatch.stop();
  }

  void _newGame({int? size}) {
    if (size != null) gridSize = size;
    final pairs = (gridSize * gridSize) ~/ 2;
    final emojis = List<String>.from(_emojiPool)..shuffle(_rng);
    final chosen = emojis.take(pairs).toList();
    final list = <CardModel>[];
    int id = 0;
    for (var e in chosen) {
      list.add(CardModel(id: id++, content: e));
      list.add(CardModel(id: id++, content: e));
    }
    list.shuffle(_rng);
    setState(() {
      _cards = list;
      _moves = 0;
      _busy = false;
    });
    _startTimer();
  }

  String _formatTime(Duration d) {
    String two(int n) => n.toString().padLeft(2, '0');
    return '${two(d.inMinutes)}:${two(d.inSeconds % 60)}';
  }

  void _onCardTap(int index) {
    if (_busy) return;
    final card = _cards[index];
    if (card.matched || card.revealed) return;

    setState(() => card.revealed = true);

    final revealed = _cards.where((c) => c.revealed && !c.matched).toList();
    if (revealed.length == 2) {
      _moves++;
      final a = revealed[0];
      final b = revealed[1];
      if (a.content == b.content) {
        setState(() {
          a.matched = true;
          b.matched = true;
        });
        if (_cards.every((c) => c.matched)) {
          _stopTimer();
          Future.delayed(const Duration(milliseconds: 300), () => _showWinDialog());
        }
      } else {
        // not match: flip back after short delay
        _busy = true;
        Future.delayed(const Duration(milliseconds: 700), () {
          setState(() {
            a.revealed = false;
            b.revealed = false;
            _busy = false;
          });
        });
      }
    }
  }

  Future<void> _showWinDialog() async {
    await showDialog<void>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Gratulálok!'),
          content: Text('Megoldva!\nIdő: ${_formatTime(_stopwatch.elapsed)}\nLépések: $_moves'),
          actions: [
            TextButton(onPressed: () { Navigator.of(context).pop(); }, child: const Text('Bezár')),
            ElevatedButton(onPressed: () { Navigator.of(context).pop(); _newGame(); }, child: const Text('Új játék')),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final padding = 16.0;
    final gridWidth = size.width - padding * 2;
    final cardSize = gridWidth / gridSize - 8;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Memória — Párokereső'),
        actions: [
          PopupMenuButton<int>(
            onSelected: (v) => _newGame(size: v),
            itemBuilder: (ctx) => [
              const PopupMenuItem(value: 4, child: Text('4x4 (könnyű)')),
              const PopupMenuItem(value: 6, child: Text('6x6 (nehéz)')),
            ],
            icon: const Icon(Icons.grid_view),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(padding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Card(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        const Text('Állapot', style: TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 6),
                        Text('Lépések: $_moves', style: const TextStyle(fontSize: 16)),
                      ]),
                      Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                        const Text('Idő', style: TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 6),
                        Text(_formatTime(_stopwatch.elapsed), style: const TextStyle(fontSize: 16)),
                      ])
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Expanded(
                child: Center(
                  child: Scrollbar(
                    thumbVisibility: true,
                    child: GridView.builder(
                      padding: EdgeInsets.zero,
                      // allow the grid to scroll on small screens
                      physics: const AlwaysScrollableScrollPhysics(),
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: gridSize,
                        crossAxisSpacing: 6,
                        mainAxisSpacing: 6,
                        childAspectRatio: 1, // keep cells square
                      ),
                      itemCount: _cards.length,
                      itemBuilder: (context, index) {
                        final card = _cards[index];
                        return GestureDetector(
                          onTap: () => _onCardTap(index),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 350),
                            decoration: BoxDecoration(
                              color: card.matched ? Colors.green.shade100 : Colors.white,
                              borderRadius: BorderRadius.circular(10),
                              boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 6)],
                            ),
                            child: Center(
                              child: AnimatedSwitcher(
                                duration: const Duration(milliseconds: 300),
                                transitionBuilder: (child, animation) {
                                  final rotate = Tween(begin: pi, end: 0.0).animate(animation);
                                  return AnimatedBuilder(
                                    animation: rotate,
                                    builder: (context, child2) {
                                      return Transform(
                                        transform: Matrix4.rotationY(rotate.value),
                                        alignment: Alignment.center,
                                        child: child2,
                                      );
                                    },
                                    child: child,
                                  );
                                },
                                child: card.revealed || card.matched
                                    ? Text(card.content, key: ValueKey('face_${card.id}'), style: TextStyle(fontSize: max(16, cardSize / 3)))
                                    : Container(key: ValueKey('back_${card.id}'), width: double.infinity, height: double.infinity, decoration: BoxDecoration(color: Colors.purple.shade50, borderRadius: BorderRadius.circular(10)), child: const Icon(Icons.help_outline, color: Colors.purple)),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () => _newGame(),
                      icon: const Icon(Icons.refresh),
                      label: const Padding(padding: EdgeInsets.symmetric(vertical: 12.0), child: Text('Új játék')),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        setState(() {
                          for (var c in _cards) {
                            c.revealed = false;
                            c.matched = false;
                          }
                          _moves = 0;
                          _stopwatch.reset();
                        });
                      },
                      icon: const Icon(Icons.visibility_off),
                      label: const Padding(padding: EdgeInsets.symmetric(vertical: 12.0), child: Text('Reset lépések')),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
