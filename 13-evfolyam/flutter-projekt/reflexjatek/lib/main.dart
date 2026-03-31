import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(const ReflexApp());
}

class ReflexApp extends StatelessWidget {
  const ReflexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Reflex Játék',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF5F7FA),
      ),
      home: const ReflexHome(),
    );
  }
}

class ReflexHome extends StatefulWidget {
  const ReflexHome({super.key});

  @override
  State<ReflexHome> createState() => _ReflexHomeState();
}

class _ReflexHomeState extends State<ReflexHome> with SingleTickerProviderStateMixin {
  static const int totalRounds = 20; // number of trials per game
  final Random _rng = Random();

  Timer? _waitTimer;
  Stopwatch? _stopwatch;

  bool _running = false; // game active
  bool _targetActive = false; // target visible and tappable
  int _round = 0;

  List<int> _reactionTimes = [];
  int _score = 0;
  String _statusMessage = 'Nyomj Startot — mérjük a reflexed!';

  // animation for the big button
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(vsync: this, duration: const Duration(milliseconds: 800));
    _pulseController.addStatusListener((s) {
      if (s == AnimationStatus.completed) _pulseController.reverse();
      else if (s == AnimationStatus.dismissed) _pulseController.forward();
    });
  }

  @override
  void dispose() {
    _waitTimer?.cancel();
    _pulseController.dispose();
    super.dispose();
  }

  void startGame() {
    setState(() {
      _running = true;
      _round = 0;
      _reactionTimes.clear();
      _score = 0;
      _statusMessage = 'Készülj...';
    });
    _nextRound();
  }

  void _nextRound() {
    _waitTimer?.cancel();
    _targetActive = false;
    _stopwatch?.stop();
    _stopwatch = null;

    if (_round >= totalRounds) {
      // game over
      setState(() {
        _running = false;
        _statusMessage = 'Vége! Átlag: ${_averageTime?.toStringAsFixed(0) ?? '-'} ms — Pontszám: $_score';
      });
      return;
    }

    _round++;
    final delayMs = 600 + _rng.nextInt(1800); // 600ms..2400ms
    setState(() {
      _statusMessage = 'Kész? Türelem...';
    });

    _waitTimer = Timer(Duration(milliseconds: delayMs), () {
      // activate target
      _stopwatch = Stopwatch()..start();
      _pulseController.forward(from: 0.0);
      setState(() {
        _targetActive = true;
        _statusMessage = 'RAJT! Nyomj gyorsan!';
      });
    });
  }

  void handleTap() {
    if (!_running) return;

    if (_targetActive && _stopwatch != null && _stopwatch!.isRunning) {
      final ms = _stopwatch!.elapsedMilliseconds;
      _reactionTimes.add(ms);
      _stopwatch!.stop();

      // points: faster -> more points, simple formula
      final points = max(0, 1200 - ms) ~/ 20; // ~0..60
      _score += points;

      setState(() {
        _statusMessage = 'Jó! ${ms} ms (+$points pont)';
        _targetActive = false;
      });

      // small delay before next round to show feedback
      Timer(const Duration(milliseconds: 700), _nextRound);
    } else {
      // tapped too early
      _waitTimer?.cancel();
      _stopwatch?.stop();
      _targetActive = false;
      _reactionTimes.add(-1); // mark early
      _score = max(0, _score - 5); // penalty
      setState(() {
        _statusMessage = 'Túl korán nyomtál! -5 pont';
      });
      Timer(const Duration(milliseconds: 700), _nextRound);
    }
  }

  double? get _averageTime {
    final valid = _reactionTimes.where((t) => t >= 0).toList();
    if (valid.isEmpty) return null;
    return valid.reduce((a, b) => a + b) / valid.length;
  }

  int? get _bestTime {
    final valid = _reactionTimes.where((t) => t >= 0).toList();
    if (valid.isEmpty) return null;
    return valid.reduce(min);
  }

  String _formatRound() => '$_round / $totalRounds';

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Reflex játék'),
        centerTitle: true,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
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
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Kör: ${_formatRound()}', style: const TextStyle(fontWeight: FontWeight.w600)),
                          const SizedBox(height: 6),
                          Text('Pontszám: $_score', style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text('Átlag: ${_averageTime != null ? _averageTime!.toStringAsFixed(0) + " ms" : "-"}'),
                          const SizedBox(height: 6),
                          Text('Legjobb: ${_bestTime != null ? "${_bestTime} ms" : "-"}'),
                        ],
                      )
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 18),
              Expanded(
                child: Center(
                  child: GestureDetector(
                    onTap: handleTap,
                    child: AnimatedBuilder(
                      animation: _pulseController,
                      builder: (context, child) {
                        final pulse = 1.0 + (_pulseController.value * 0.08);
                        final active = _targetActive && _running;
                        final color = active ? Colors.greenAccent.shade400 : Colors.grey.shade300;
                        final shadowColor = active ? Colors.green.shade200 : Colors.black12;

                        return Transform.scale(
                          scale: pulse,
                          child: Container(
                            width: min(size.width * 0.75, 320),
                            height: min(size.width * 0.75, 320),
                            decoration: BoxDecoration(
                              color: color,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(color: shadowColor, blurRadius: active ? 30 : 8, spreadRadius: active ? 6 : 1),
                              ],
                            ),
                            child: Center(
                              child: Text(
                                active ? 'NYOMJ!' : (_running ? 'Várakozás' : 'Start!'),
                                style: TextStyle(
                                  fontSize: active ? 40 : 26,
                                  fontWeight: FontWeight.bold,
                                  color: active ? Colors.green.shade900 : Colors.grey.shade800,
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 18),
              Text(
                _statusMessage,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: _running ? null : startGame,
                      icon: const Icon(Icons.play_arrow),
                      label: const Padding(
                        padding: EdgeInsets.symmetric(vertical: 14.0),
                        child: Text('Start'),
                      ),
                      style: ElevatedButton.styleFrom(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        // quick reset
                        _waitTimer?.cancel();
                        _stopwatch?.stop();
                        setState(() {
                          _running = false;
                          _targetActive = false;
                          _round = 0;
                          _reactionTimes.clear();
                          _score = 0;
                          _statusMessage = 'Nullázva.';
                        });
                      },
                      icon: const Icon(Icons.refresh),
                      label: const Padding(padding: EdgeInsets.symmetric(vertical: 14.0), child: Text('Reset')),
                      style: OutlinedButton.styleFrom(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Wrap(
                alignment: WrapAlignment.center,
                spacing: 10,
                children: [
                  Chip(label: Text('Teljes: $totalRounds kör')),
                  Chip(label: Text('Érvényes mérések: ${_reactionTimes.where((t) => t >= 0).length}')),
                  Chip(label: Text('Korai érintések: ${_reactionTimes.where((t) => t < 0).length}')),
                ],
              ),
              const SizedBox(height: 6),
            ],
          ),
        ),
      ),
    );
  }
}
