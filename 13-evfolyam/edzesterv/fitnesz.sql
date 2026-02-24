CREATE DATABASE IF NOT EXISTS fitnesz
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE fitnesz;

DROP TABLE IF EXISTS edzesek;

CREATE TABLE edzesek (
    azon INTEGER PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    tipus ENUM('kardio','ero','joga','crossfit') NOT NULL,
    ido INTEGER NOT NULL,
    kaloria INTEGER NOT NULL,
    datum DATE NOT NULL
);

INSERT INTO edzesek (azon, nev, tipus, ido, kaloria, datum) VALUES
(1, 'Kiss Anna', 'kardio', 60, 520, '2025-03-01'),
(2, 'Nagy Péter', 'ero', 75, 640, '2025-03-01'),
(3, 'Tóth Lilla', 'joga', 50, 220, '2025-03-02'),
(4, 'Kiss Anna', 'crossfit', 45, 480, '2025-03-03'),
(5, 'Szabó Márk', 'kardio', 90, 850, '2025-03-03'),
(6, 'Nagy Péter', 'ero', 60, 600, '2025-03-04'),
(7, 'Farkas Dóra', 'joga', 40, 180, '2025-03-05'),
(8, 'Szabó Márk', 'crossfit', 70, 720, '2025-03-05'),
(9, 'Kiss Anna', 'kardio', 55, 500, '2025-03-06'),
(10, 'Tóth Lilla', 'ero', 65, 610, '2025-03-07'),
(11, 'Nagy Péter', 'kardio', 50, 470, '2025-03-07'),
(12, 'Farkas Dóra', 'crossfit', 60, 650, '2025-03-08'),
(13, 'Szabó Márk', 'ero', 80, 780, '2025-03-09'),
(14, 'Kiss Anna', 'joga', 45, 200, '2025-03-09'),
(15, 'Tóth Lilla', 'kardio', 70, 730, '2025-03-10');