CREATE DATABASE IF NOT EXISTS nyiltnap
CHARACTER SET utf9mb4
COLLATE utf8mb4_hungarian_ci;

USE nyiltnap;

CREATE TABLE diakok (
    id INT PRIMARY KEY,
    nev VARCHAR(50),
    email VARCHAR(50),
    telefon VARCHAR(50),
    telepules VARCHAR(50)
);

CREATE TABLE orak (
    id INT PRIMARY KEY,
    datum DATE,
    targy VARCHAR(50),
    csoport VARCHAR(50),
    terem VARCHAR(50),
    tanar VARCHAR(50),
    ferohely INT(11),
    orasorszam INT(11)
);

CREATE TABLE kapcsolo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    diakid INT,
    oraid INT,
    FOREIGN KEY (diakid) REFERENCES diakok(id),
    FOREIGN KEY (oraid) REFERENCES orak(id)
)