import Database from 'better-sqlite3'

const db = new Database('./data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS sellers (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, address STRING, taxNumber STRING UNIQUE)`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS buyers (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, address STRING, taxNumber STRING UNIQUE)`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS bills (id INTEGER PRIMARY KEY AUTOINCREMENT, sellerId INTEGER, buyerId INTEGER, billNumber STRING UNIQUE, created DATE, payDay DATE,deadline DATE, total INTEGER, afa INTEGER, FOREIGN KEY(sellerId) REFERENCES sellers(id) ON DELETE CASCADE, FOREIGN KEY(buyerId) REFERENCES buyers(id) ON DELETE CASCADE )`).run();


export const getSellers = () => db
    .prepare('SELECT * FROM sellers').all();

export const saveSeller = (name, address, taxNumber) => db
    .prepare('INSERT INTO sellers (name, address, taxNumber) VALUES (?,?,?)').run(name, address, taxNumber);

export const updateSeller = (id, name, address, taxNumber) => db
    .prepare('UPDATE sellers SET name = ?, address = ?, taxNumber = ? WHERE id = ?').run(name, address, taxNumber, id);

export const deleteSeller = (id) => db
    .prepare('DELETE FROM sellers WHERE id =?').run(id);
export const getSellerTaxNumbers = () => db
    .prepare('SELECT taxNumber FROM sellers').all();

export const getBuyers = () => db
    .prepare('SELECT * FROM buyers').all();

export const saveBuyer = (name, address, taxNumber) => db
    .prepare('INSERT INTO buyers (name, address, taxNumber) VALUES (?,?,?)').run(name, address, taxNumber);

export const updateBuyer = (id, name, address, taxNumber) => db
    .prepare('UPDATE buyers SET name = ?, address = ?, taxNumber = ? WHERE id = ?').run(name, address, taxNumber, id);

export const deleteBuyer = (id) => db
    .prepare('DELETE FROM buyers WHERE id =?').run(id);

export const getBuyerTaxNumbers = () => db
    .prepare('SELECT taxNumber FROM buyers').all();

export const getBills = () => db
    .prepare('SELECT * FROM bills').all();

export const saveBill = (sellerId, buyerId, billNumber, created, payDay, deadline, total, afa) => db
    .prepare('INSERT INTO bills (sellerId, buyerId, billNumber, created, payDay, deadline, total, afa) VALUES (?,?,?,?,?,?,?,?)').run(sellerId, buyerId, billNumber, created, payDay, deadline, total, afa);

export const updateBill = (id, sellerId, buyerId, billNumber, created, payDay, deadline, total, afa) => db
    .prepare('UPDATE bills SET sellerId = ?, buyerId = ?,billNumber = ?,created = ?,payDay = ?, deadline = ?, total = ?,afa = ? WHERE id = ?').run(sellerId, buyerId, billNumber, created, payDay, deadline, total, afa, id);

export const deleteBill = (id) => db
    .prepare('DELETE FROM bills WHERE id =?').run(id);
    
const sellers = [
    { name: 'Seller1', address: "cím1", taxNumber: "11111111-1-11" },
    { name: 'Seller2', address: "cím2", taxNumber: "11111111-1-12" },
    { name: 'Seller3', address: "cím3", taxNumber: "11111111-1-13" }
];
const buyers = [
  { name: "Buyer1", address: "cím4", taxNumber: "22222222-2-22" },
  { name: "Buyer2", address: "cím5", taxNumber: "33333333-3-33" },
  { name: "Buyer3", address: "cím6", taxNumber: "44444444-4-44" },
];

const bills = [
    { sellerId: 1, buyerId: 1, billNumber: "11111111-11111111-11111111", created: `2005-10-01`, payDay: `2005-10-01`, deadline: `2025-10-01`, total: 10000, afa: 27 },
    { sellerId: 1, buyerId: 1, billNumber: "22222222-22222222-22222222", created: `2005-10-01`, payDay: `2005-10-01`, deadline: `2025-10-01`, total: 20000, afa: 27 },
    { sellerId: 1, buyerId: 1, billNumber: "33333333-33333333-33333333", created: `2005-10-01`, payDay: `2005-10-01`, deadline: `2025-10-01`, total: 30000, afa: 27 }
];

if (getBills() == 0 && getBuyers() == 0 && getSellers() == 0) {
    for (const seller of sellers) saveSeller(seller.name, seller.address, seller.taxNumber);
    for (const buyer of buyers) saveBuyer(buyer.name, buyer.address, buyer.taxNumber);
    for (const bill of bills) saveBill(bill.sellerId, bill.buyerId, bill.billNumber, bill.created, bill.payDay, bill.deadline, bill.total, bill.afa);
}