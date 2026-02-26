import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'User Form',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 255, 138, 193),
          brightness: Brightness.light,
        ),
        useMaterial3: true,
        fontFamily: 'Georgia',
      ),
      home: const FormPage(),
    );
  }
}

class FormPage extends StatefulWidget {
  const FormPage({super.key});

  @override
  State<FormPage> createState() => _FormPageState();
}

class _FormPageState extends State<FormPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _ageController = TextEditingController();
  bool _submitted = false;

  @override
  void dispose() {
    _nameController.dispose();
    _ageController.dispose();
    super.dispose();
  }

  String? _validateName(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Name is required';
    }
    if (value.trim().length < 6) {
      return 'Name must be at least 6 characters';
    }
    return null;
  }

  String? _validateAge(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Age is required';
    }
    final age = int.tryParse(value);
    if (age == null) {
      return 'Please enter a valid number';
    }
    if (age < 18) {
      return 'You must be at least 18 years old';
    }
    if (age > 120) {
      return 'Please enter a valid age';
    }
    return null;
  }

  void _submit() {
    setState(() => _submitted = true);
    if (_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Welcome, ${_nameController.text.trim()}! 🎉',
            style: const TextStyle(fontFamily: 'Georgia', fontSize: 15),
          ),
          backgroundColor: const Color.fromARGB(255, 255, 129, 228),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          margin: const EdgeInsets.all(16),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 238, 236, 232),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Register',
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.w700,
                  color: Color.fromARGB(255, 255, 126, 216),
                  letterSpacing: 2.0,
                  fontFamily: 'Georgia',
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Fill in your details below',
                style: TextStyle(
                  fontSize: 14,
                  color: Color.fromARGB(255, 255, 137, 183),
                  letterSpacing: 0.5,
                ),
              ),
              const SizedBox(height: 36),

              Container(
                width: 420,
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: const Color(0xFFFFFDF7),
                  border: Border.all(
                    color: const Color.fromARGB(255, 255, 191, 230),
                    width: 1.5,
                  ),
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: const Color.fromARGB(255, 106, 45, 88).withOpacity(0.08),
                      blurRadius: 24,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Form(
                  key: _formKey,
                  autovalidateMode: _submitted
                      ? AutovalidateMode.onUserInteraction
                      : AutovalidateMode.disabled,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      _buildLabel('Full Name'),
                      const SizedBox(height: 8),
                      TextFormField(
                        controller: _nameController,
                        validator: _validateName,
                        textCapitalization: TextCapitalization.words,
                        style: const TextStyle(
                          fontSize: 16,
                          color: Color.fromARGB(255, 67, 27, 67),
                          fontFamily: 'Georgia',
                        ),
                        decoration: _inputDecoration(
                          hint: 'e.g. Alexandra',
                          icon: Icons.person_outline_rounded,
                        ),
                      ),
                      const SizedBox(height: 8),
                      _buildHint('Minimum 6 characters'),

                      const SizedBox(height: 24),

                      _buildLabel('Age'),
                      const SizedBox(height: 8),
                      TextFormField(
                        controller: _ageController,
                        validator: _validateAge,
                        keyboardType: TextInputType.number,
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly,
                          LengthLimitingTextInputFormatter(3),
                        ],
                        style: const TextStyle(
                          fontSize: 16,
                          color: Color.fromARGB(255, 255, 144, 240),
                          fontFamily: 'Georgia',
                        ),
                        decoration: _inputDecoration(
                          hint: 'e.g. 25',
                          icon: Icons.cake_outlined,
                        ),
                      ),
                      const SizedBox(height: 8),
                      _buildHint('Must be 18 or older'),

                      const SizedBox(height: 36),

                      ElevatedButton(
                        onPressed: _submit,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color.fromARGB(255, 255, 113, 201),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          elevation: 0,
                          textStyle: const TextStyle(
                            fontSize: 16,
                            fontFamily: 'Georgia',
                            letterSpacing: 1.2,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        child: const Text('SUBMIT'),
                      ),

                      const SizedBox(height: 12),

                      TextButton(
                        onPressed: () {
                          _formKey.currentState?.reset();
                          _nameController.clear();
                          _ageController.clear();
                          setState(() => _submitted = false);
                        },
                        style: TextButton.styleFrom(
                          foregroundColor: const Color.fromARGB(255, 255, 142, 236),
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontFamily: 'Georgia',
                            letterSpacing: 0.5,
                          ),
                        ),
                        child: const Text('Clear Form'),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLabel(String text) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 13,
        fontWeight: FontWeight.w700,
        color: Color.fromARGB(255, 255, 106, 198),
        letterSpacing: 1.0,
        fontFamily: 'Georgia',
      ),
    );
  }

  Widget _buildHint(String text) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 12,
        color: Color.fromARGB(255, 255, 150, 229),
        letterSpacing: 0.3,
      ),
    );
  }

  InputDecoration _inputDecoration({
    required String hint,
    required IconData icon,
  }) {
    return InputDecoration(
      hintText: hint,
      hintStyle: const TextStyle(
        color: Color.fromARGB(255, 201, 183, 194),
        fontFamily: 'Georgia',
      ),
      prefixIcon: Icon(icon, color: const Color(0xFF52796F), size: 20),
      filled: true,
      fillColor: const Color(0xFFF0FAF5),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: Color.fromARGB(255, 228, 183, 211), width: 1.2),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: Color.fromARGB(255, 228, 183, 213), width: 1.2),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: Color.fromARGB(255, 106, 45, 83), width: 2.0),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: Color.fromARGB(255, 255, 0, 0), width: 1.2),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: Color.fromARGB(255, 255, 0, 0), width: 2.0),
      ),
      errorStyle: const TextStyle(
        color: Color(0xFFE76F51),
        fontSize: 12,
        fontFamily: 'Georgia',
      ),
    );
  }
}