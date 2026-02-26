import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int _selectedMenu = 3;

  ThemeMode get _themeMode {
    switch (_selectedMenu) {
      case 1:
        return ThemeMode.light;
      case 2:
        return ThemeMode.dark;
      case 3:
      default:
        return ThemeMode.system;
    }
  }

  String get _themeModeText {
    switch (_selectedMenu) {
      case 1:
        return 'Light mode';
      case 2:
        return 'Dark mode';
      case 3:
      default:
        return 'System default';
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Theme Switcher App',
      theme: ThemeData(
        brightness: Brightness.light,
        colorSchemeSeed: Colors.blue,
        useMaterial3: true,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        colorSchemeSeed: Colors.blue,
        useMaterial3: true,
      ),
      themeMode: _themeMode,
      home: Builder(
        builder: (context) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Theme Switcher'),
              backgroundColor:
                  Theme.of(context).colorScheme.inversePrimary,
            ),
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Card(
                    margin: const EdgeInsets.all(16.0),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          Icon(
                            _selectedMenu == 1
                                ? Icons.light_mode
                                : _selectedMenu == 2
                                    ? Icons.dark_mode
                                    : Icons.settings_suggest_outlined,
                            size: 48,
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '$_themeModeText',
                            style:
                                Theme.of(context).textTheme.titleLarge,
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton.icon(
                    onPressed: () {
                      showMenu<int>(
                        context: context,
                        position: const RelativeRect.fromLTRB(
                            100, 300, 100, 100),
                        items: const [
                          PopupMenuItem(
                            value: 1,
                            child: ListTile(
                              leading: Icon(Icons.light_mode),
                              title: Text('Light'),
                            ),
                          ),
                          PopupMenuItem(
                            value: 2,
                            child: ListTile(
                              leading: Icon(Icons.dark_mode),
                              title: Text('Dark'),
                            ),
                          ),
                          PopupMenuItem(
                            value: 3,
                            child: ListTile(
                              leading: Icon(Icons.settings_suggest_outlined),
                              title: Text('System default'),
                            ),
                          ),
                        ],
                      ).then((result) {
                        if (result != null) {
                          setState(() {
                            _selectedMenu = result;
                          });
                        }
                      });
                    },
                    icon: const Icon(Icons.palette),
                    label: const Text('Change theme'),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}