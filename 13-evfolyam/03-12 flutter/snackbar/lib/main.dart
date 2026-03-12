import 'package:flutter/material.dart';

void main() {
  runApp(const HotelApp());
}

class HotelApp extends StatelessWidget {
  const HotelApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Hotel Reservation',
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.indigo,
        fontFamily: 'Roboto',
      ),
      home: const ReservationPage(),
    );
  }
}

class ReservationPage extends StatefulWidget {
  const ReservationPage({super.key});

  @override
  State<ReservationPage> createState() => _ReservationPageState();
}

class _ReservationPageState extends State<ReservationPage> {
  final List<String> services = [
    "Breakfast",
    "Airport Pickup",
    "Spa Access",
    "Gym Access",
    "Late Checkout",
    "City Tour"
  ];

  final List<String> selectedServices = [];

  void addService(String service) {
    setState(() {
      selectedServices.add(service);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("$service added"),
        action: SnackBarAction(
          label: "Undo",
          onPressed: () {
            setState(() {
              selectedServices.remove(service);
            });
          },
        ),
      ),
    );
  }

  void removeService(int index) {
  final removedService = selectedServices[index];

  setState(() {
    selectedServices.removeAt(index);
  });

  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text("$removedService removed"),
      action: SnackBarAction(
        label: "Undo",
        onPressed: () {
          setState(() {
            final safeIndex =
                index > selectedServices.length ? selectedServices.length : index;

            selectedServices.insert(safeIndex, removedService);
          });
        },
      ),
    ),
  );
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Hotel Reservation"),
        centerTitle: true,
      ),
      body: Column(
        children: [
          const SizedBox(height: 20),

          /// SERVICE SELECTOR
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Wrap(
              spacing: 10,
              children: services.map((service) {
                return ActionChip(
                  label: Text(service),
                  onPressed: () => addService(service),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 20),

          const Padding(
            padding: EdgeInsets.all(16),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "Selected Services",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
          ),

          /// CARD LIST
          Expanded(
            child: ListView.builder(
              itemCount: selectedServices.length,
              itemBuilder: (context, index) {
                final service = selectedServices[index];

                return Dismissible(
                  key: Key(service + index.toString()),
                  direction: DismissDirection.endToStart,
                  onDismissed: (_) => removeService(index),
                  background: Container(
                    margin:
                        const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.redAccent,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    alignment: Alignment.centerRight,
                    padding: const EdgeInsets.only(right: 20),
                    child: const Icon(
                      Icons.delete,
                      color: Colors.white,
                    ),
                  ),
                  child: Card(
                    elevation: 4,
                    margin:
                        const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: ListTile(
                      leading: const Icon(Icons.room_service),
                      title: Text(service),
                      subtitle: const Text("Included in reservation"),
                      trailing: const Icon(Icons.drag_handle),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}