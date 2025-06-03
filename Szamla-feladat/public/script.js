async function getAllSellerFunction() {
    try {
        const res = await fetch(`http://localhost:3000/sellers`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllSellerTaxNumberFunction() {
    try {
        const res = await fetch(`http://localhost:3000/sellers/taxNumbers`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }
        let taxNumbersAsStringArray = [];
        for (const taxNumber of data) {
            taxNumbersAsStringArray.push(taxNumber.taxNumber);
        }
        return taxNumbersAsStringArray;
    }
    catch (error) {
        console.log(error);
    }
}

async function postSellerFunction(body) {
    try {
        const res = await fetch(`http://localhost:3000/sellers`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function putSellerFunction(body, id) {
    try {
        const res = await fetch(`http://localhost:3000/sellers/${id}`, {
            method: 'PUT',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteSellerFunction(id) {
    try {
        const res = await fetch(`http://localhost:3000/sellers/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllBuyerFunction() {
    try {
        const res = await fetch(`http://localhost:3000/buyers`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllBuyersTaxNumberFunction() {
    try {
        const res = await fetch(`http://localhost:3000/buyers/taxNumbers`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }
        let taxNumbersAsStringArray = []
        for (const taxNumber of data) {
            taxNumbersAsStringArray.push(taxNumber.taxNumber);
        }
        return taxNumbersAsStringArray;
    }
    catch (error) {
        console.log(error);
    }
}
async function postBuyerFunction(body) {
    try {
        const res = await fetch(`http://localhost:3000/buyers`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function putBuyerFunction(body, id) {
    try {
        const res = await fetch(`http://localhost:3000/buyers/${id}`, {
            method: 'PUT',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteBuyerFunction(id) {
    try {
        const res = await fetch(`http://localhost:3000/buyers/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllBillsFunction() {
    try {
        const res = await fetch(`http://localhost:3000/bills`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
async function postBillFunction(body) {
    try {
        const res = await fetch(`http://localhost:3000/bills`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function putBillFunction(body, id) {
    try {
        const res = await fetch(`http://localhost:3000/bills/${id}`, {
            method: 'PUT',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteBillFunction(id) {
    try {
        const res = await fetch(`http://localhost:3000/bills/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

let bills = [];
let sellers = [];
let buyers = [];
let selectedBillId = 0;
let selectedPerson;
const billNumberRegex = /^[0-9]{8}-[0-9]{8}-[0-9]{8}$/;
const taxNumberRegex = /^[0-9]{8}-[0-9]{1}-[0-9]{2}$/;
const content = document.getElementById("content");

function addPerson() {
    content.style.display = "block";
    content.innerHTML = "<label for='personType'>Select a type:</label> <select name='personType' id='personType'>";
    const menu = document.getElementById("personType");
    menu.innerHTML += `<option value='buyer'>Buyer</option>`;
    menu.innerHTML += `<option value='seller'>Seller</option>`;
    content.innerHTML += "</select>";
    content.innerHTML += "<label for='name'>Name:</label> <input type='text' id='name'>";
    content.innerHTML += "<label for='address'>Address:</label> <input type='text' id='address'>";
    content.innerHTML += "<label for='taxNumber'>Tax number(eg.:11111111-1-11):</label> <input type='text' id='taxNumber' placeholder='11111111-1-11'>";
    content.innerHTML += "<button id='submit' onclick='savePerson()'>Save</button>";
    content.innerHTML += "<p id='message'></p>";
}

async function savePerson() {
    if (document.getElementById("message").innerHTML != "") {
        document.getElementById("message").innerHTML = "";
    }
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const taxNumber = document.getElementById("taxNumber").value.trim();

    buyerTaxNumbers = await getAllBuyersTaxNumberFunction();
    sellerTaxNumbers = await getAllSellerTaxNumberFunction();
    if (name != undefined && name.length > 0 && address != undefined && address.length > 0 && taxNumber != undefined && taxNumber.length > 0) {
        if (taxNumber.length != 13 || !taxNumberRegex.test(taxNumber)) {
            document.getElementById("message").innerHTML = "Adjon helyes adószámot!";
            return;
        }
        if (buyerTaxNumbers.includes(taxNumber) || sellerTaxNumbers.includes(taxNumber)) {
            document.getElementById("message").innerHTML = "Tax number already exists!";
            return;
        }

        let body = {
            "name": `${name}`,
            "address": `${address}`,
            "taxNumber": `${taxNumber}`
        };
        const listOfSelects = document.getElementsByTagName("option");
        let type;
        for (let i = 0; i < listOfSelects.length; i++) {
            if (listOfSelects[i].selected) {
                type = listOfSelects[i].value;
            }
        }
        if (type == "buyer") {
            await postBuyerFunction(JSON.stringify(body));
        }
        else {
            await postSellerFunction(JSON.stringify(body));
        }
        content.innerHTML = "";
        content.style.display = "none";
    }
    else {
        document.getElementById("message").innerHTML = "Missing data!";
    }
}

async function updateUser() {
    content.style.display = "block";
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    if (buyers.length == 0 && sellers.length == 0) {
        content.innerHTML = "<p id='message'>No person in the database!</p>";
        return;
    }
    content.innerHTML = "<label for='person'>Select person to modify:</label> <select name='person' id='person' onchange='loadPersonSelect()'>";
    const menu = document.getElementById("person");
    menu.innerHTML += " <option value='' selected disabled hidden>Select</option>";

    for (const buyer of buyers) {
        menu.innerHTML += `<option value='${buyer.taxNumber}'>${buyer.name}</option>`;
    }
    for (const seller of sellers) {
        menu.innerHTML += `<option value='${seller.taxNumber}'>${seller.name}</option>`;
    }
    content.innerHTML += "</select>";
    content.innerHTML += "<div id='loadPersonData'>";
    content.innerHTML += "</div'>";
    content.innerHTML += "<p id='message'></p>";

}
async function loadPersonSelect() {
    const loadPerson = document.getElementById("loadPersonData");
    const options = document.getElementsByTagName("option");
    let person;
    for (const option of options) {

        if (option.selected) {
            person = await findPerson(option.value);
        }
    }
    if (loadPerson.innerHTML != "") {
        loadPerson.innerHTML = "";
    }
    loadPerson.innerHTML += `<label for='name'>Name:</label> <input type='text' id='name' value='${person.name}'>`;
    loadPerson.innerHTML += `<label for='address'>Address:</label> <input type='text' id='address' value='${person.address}'>`;
    loadPerson.innerHTML += `<label for='taxNumber'>Tax number(eg.:11111111-1-11):</label> <input type='text' id='taxNumber' placeholder='11111111-1-11' value='${person.taxNumber}'>`;
    loadPerson.innerHTML += "<button id='submit' onclick='saveUpdatedPerson()'>Save</button>";
    selectedPerson = person;
}

async function saveUpdatedPerson() {
    if (document.getElementById("message").innerHTML != "") {
        document.getElementById("message").innerHTML = "";
    }
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const taxNumber = document.getElementById("taxNumber").value.trim();

    buyerTaxNumbers = await getAllBuyersTaxNumberFunction();
    sellerTaxNumbers = await getAllSellerTaxNumberFunction();
    if (name != undefined && name.length > 0 && address != undefined && address.length > 0) {

        if (taxNumber.length != 13 || !taxNumberRegex.test(taxNumber)) {
            document.getElementById("message").innerHTML = "Tax number incorrect!";
            return;
        }
        let type;

        if (buyerTaxNumbers.includes(selectedPerson.taxNumber)) {

            type = "buyer";
        }

        else if (sellerTaxNumbers.includes(selectedPerson.taxNumber)) {
            type = "seller";
        }

        if (buyerTaxNumbers.includes(taxNumber) || sellerTaxNumbers.includes(taxNumber)) {
            document.getElementById("message").innerHTML = "Tax number already exists!";
            return;
        }

        let body = {
            "name": `${name}`,
            "address": `${address}`,
            "taxNumber": `${taxNumber}`
        };

        if (type == "buyer") {
            await putBuyerFunction(JSON.stringify(body), selectedPerson.id);
        }
        else {
            await putSellerFunction(JSON.stringify(body), selectedPerson.id);
        }
        content.innerHTML = "";
        content.style.display = "none";
    }
    else {
        document.getElementById("message").innerHTML = "Missing data!";
    }
}

async function findPerson(taxNumber) {
    sellers = await getAllSellerFunction();
    buyers = await getAllBuyerFunction();
    for (const seller of sellers) {
        if (seller.taxNumber == taxNumber) {
            return seller;
        }
    }
    for (const buyer of buyers) {
        if (buyer.taxNumber == taxNumber) {
            return buyer;
        }
    }
}

async function deletePerson() {
    content.style.display = "block";
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    if (buyers.length > 0 || sellers.length > 0) {
        content.innerHTML = "<label for='person'>Select person to delete:</label> <select name='person' id='person'>";
        const menu = document.getElementById("person");
        menu.innerHTML += " <option value='' selected disabled hidden>Select</option>";
        for (const buyer of buyers) {
            menu.innerHTML += `<option value='${buyer.taxNumber}'>${buyer.name}</option>`;
        }
        for (const seller of sellers) {
            menu.innerHTML += `<option value='${seller.taxNumber}'>${seller.name}</option>`;
        }
        content.innerHTML += "</select>";
        content.innerHTML += "<button id='submit' onclick='deleteSelectedPerson()'>Delete</button>";
        content.innerHTML += "<p id='message'></p>";
    }
    else {
        content.innerHTML = "<p id='message'>No person in the database!</p>";
    }
}

async function deleteSelectedPerson() {
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    buyerTaxNumbers = await getAllBuyersTaxNumberFunction();
    sellerTaxNumbers = await getAllSellerTaxNumberFunction();
    const listOfSelects = document.getElementsByTagName("option");
    for (let i = 0; i < listOfSelects.length; i++) {
        if (listOfSelects[i].selected) {
            selectedPerson = await findPerson(listOfSelects[i].value);
        }
    }
    let type;
    if (buyerTaxNumbers.includes(selectedPerson.taxNumber)) {

        type = "buyer";
    }

    else if (sellerTaxNumbers.includes(selectedPerson.taxNumber)) {
        type = "seller";
    }
    if (type == "buyer") {
        await deleteBuyerFunction(selectedPerson.id);
    }
    else {
        await deleteSellerFunction(selectedPerson.id);
    }
    content.innerHTML = "";
    content.style.display = "none";

}

async function addBill() {
    content.style.display = "block";
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    if (buyers.length == 0) {
        content.innerHTML = "<p id='message'>No buyer!</p>";
        return;
    }
    if (sellers.length == 0) {
        content.innerHTML = "<p id='message'>No seller!</p>";
        return;
    }
    content.innerHTML = "<label for='buyer'>Select buyer:</label> <select name='buyer' id='buyer'>";
    const buyerMenu = document.getElementById("buyer");
    for (let i = 0; i < buyers.length; i++) {
        buyerMenu.innerHTML += `<option value='${buyers[i].id}' class='buyers'>${buyers[i].name}</option>`;
    }
    content.innerHTML += "</select>";

    content.innerHTML += "<label for='seller'>Select seller:</label> <select name='seller' id='seller'>";
    const sellerMenu = document.getElementById("seller");
    for (let i = 0; i < sellers.length; i++) {
        sellerMenu.innerHTML += `<option value='${sellers[i].id}' class='sellers'>${sellers[i].name}</option>`;
    }
    content.innerHTML += "</select>";
    content.innerHTML += "<label for='billNumber'>Billing number(eg.:11111111-11111111-11111111):</label> <input type='text' id='billNumber' placeholder='11111111-11111111-11111111'>";
    content.innerHTML += "<label for='total' >Amount(Ft):</label> <input type='number' id='total' min='0'>";
    content.innerHTML += "<label for='afa'>VAT(%):</label> <input type='number' id='afa' min='0'>";

    content.innerHTML += "<div id='createdP'>";
    const createdBekezdes = document.getElementById("createdP");
    createdBekezdes.innerHTML = "<label for='created'>Date created:</label> <input type='date' id='created'>";
    content.innerHTML += "</div>";

    content.innerHTML += "<div id='deadLineP'>";
    const deadLineBekezdes = document.getElementById("deadLineP");
    deadLineBekezdes.innerHTML = "<label for='deadline'>Pay deadline:</label> <input type='date' id='deadline'>";
    content.innerHTML += "</div>";

    content.innerHTML += "<div id='payDayP'>";
    const payDayBekezdes = document.getElementById("payDayP");
    payDayBekezdes.innerHTML = "<label for='payDay'>Pay day:</label> <input type='date' id='payDay'>";
    content.innerHTML += "</div>";

    content.innerHTML += "<button id='submit' onclick='saveBill()'>Save</button>";
    content.innerHTML += "<p id='message'></p>";

}

async function saveBill() {
    if (document.getElementById("message").innerHTML != "") {
        document.getElementById("message").innerHTML = "";
    }
    let sellerId = 0;
    let buyerId = 0;
    const billNumber = document.getElementById("billNumber").value.trim();
    let total = document.getElementById("total").value.trim();
    let afa = document.getElementById("afa").value.trim();
    let created = document.getElementById("created").value;
    let payDay = document.getElementById("payDay").value.trim();
    let deadline = document.getElementById("deadline").value;

    if (billNumber != undefined && billNumber.length > 0 && total != undefined && total.length > 0 && afa != undefined && afa.length > 0 && created != undefined && created.length > 0 && payDay != undefined && payDay.length > 0 && deadline != undefined && deadline.length > 0) {
        const selllerList = document.getElementsByClassName('sellers');
        const buyerList = document.getElementsByClassName('buyers');
        for (const seller of selllerList) {
            if (seller.selected) {
                sellerId = parseInt(seller.value);
                break;
            }
        }
        for (const buyer of buyerList) {
            if (buyer.selected) {
                buyerId = parseInt(buyer.value);
                break;
            }
        }
        if (billNumber.length != 26 || !billNumberRegex.test(billNumber)) {
            document.getElementById("message").innerHTML = "Input a valid bill number!";
            return;
        }
        bills = await getAllBillsFunction()
        for (const bill of bills) {
            if (bill.billNumber == billNumber) {
                document.getElementById("message").innerHTML = "Bill number already exists!";
                return;
            }
        }
        total = Math.round(parseFloat(total))
        if (total < 0) {
            document.getElementById("message").innerHTML = "Total cannot be nagative!";
            return;
        }
        afa = Math.round(parseFloat(afa))
        if (afa < 0) {
            document.getElementById("message").innerHTML = "VAT cannot be nagative!";
            return;
        }
        created = new Date(created);
        deadline = new Date(deadline);
        payDay = new Date(payDay);
        if (created >= deadline) {
            document.getElementById("message").innerHTML = "Deadline cannot be before the created date!";
            return;
        }
        if (created > payDay) {
            document.getElementById("message").innerHTML = "Cannot pay before created date!";
            return;
        }
        if (deadline < payDay) {
            document.getElementById("message").innerHTML = "Cannot pay overdue!";
            return;
        }
        const dateStringCreated = `${created.getFullYear()}-${created.getMonth() > 9 ? created.getMonth() : "0" + created.getMonth()}-${created.getDate() > 9 ? created.getDate() : "0" + created.getDate()}`;
        const dateStringDeadline = `${deadline.getFullYear()}-${deadline.getMonth() > 9 ? deadline.getMonth() : "0" + deadline.getMonth()}-${deadline.getDate() > 9 ? deadline.getDate() : "0" + deadline.getDate()}`;
        const dateStringPayDay = `${payDay.getFullYear()}-${payDay.getMonth() > 9 ? payDay.getMonth() : "0" + payDay.getMonth()}-${payDay.getDate() > 9 ? payDay.getDate() : "0" + payDay.getDate()}`;
        let body = {
            sellerId: sellerId,
            buyerId: buyerId,
            billNumber: `${billNumber}`,
            created: `${dateStringCreated}`,
            payDay: `${dateStringPayDay}`,
            deadline: `${dateStringDeadline}`,
            total: total,
            afa: afa
        };
        await postBillFunction(JSON.stringify(body));
        content.innerHTML = "";
        content.style.display = "none";
    }
    else {
        document.getElementById("message").innerHTML = "Missing data!";
    }
}

async function listBills() {
    content.innerHTML = "";
    content.style.display = "block";
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    bills = await getAllBillsFunction();
    let selectedBuyer;
    let selectedSeller;
    if (bills.length == 0) {
        content.innerHTML = "<p id='message'>No bills!</p>";
        return;
    }
    for (const bill of bills) {

        for (const buyer of buyers) {
            if (buyer.id == bill.buyerId) {
                selectedBuyer = buyer;
                break;
            }
        }
        for (const seller of sellers) {
            if (seller.id == bill.sellerId) {
                selectedSeller = seller;
                break;
            }
        }

        content.innerHTML += `<div class='lista' >`;
        let elemSzam = document.getElementsByClassName('lista').length;
        const elem = document.getElementsByClassName('lista')[elemSzam - 1];
        elem.innerHTML += `<p> Seller: ${selectedSeller.name} <br>Address: ${selectedSeller.address}<br>Tax number: ${selectedSeller.taxNumber}</p>`;
        elem.innerHTML += `<p> Buyer: ${selectedBuyer.name} <br>Address: ${selectedBuyer.address}<br>Tax number: ${selectedBuyer.taxNumber}</p>`;
        elem.innerHTML += `<p> Bill number: ${bill.billNumber}</p>`;
        elem.innerHTML += `<p> Date: ${bill.created}</p>`;
        elem.innerHTML += `<p> Payed: ${bill.payDay}</p>`;
        elem.innerHTML += `<p> Deadline: ${bill.deadline}</p>`;
        elem.innerHTML += `<p> Sum: ${bill.total} Forint</p>`;
        elem.innerHTML += `<p> VAT: ${bill.afa} %</p>`;
        elem.innerHTML += `<button class='modify' onclick='updateBill()' value='${bill.id}'>Modify bill</button>`;
        elem.innerHTML += `<button class='deleteButton' onclick='deleteBill()' value='${bill.id}'>Delete bill</button>`;
        content.innerHTML += `</div>`;
    }

    const modifyButtons = document.getElementsByClassName('modify')
    const deleteButtons = document.getElementsByClassName('deleteButton')
    for (let i = 0; i < modifyButtons.length; i++) {
        modifyButtons[i].addEventListener("click", (event) => { selectedBillId = event.target.value })
    }
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", (event) => { selectedBillId = event.target.value })
    }

}

async function updateBill() {
    content.innerHTML = "";
    bills = await getAllBillsFunction();
    let bill;
    for (const temp of bills) {
        if (selectedBillId == temp.id) {
            bill = temp;
            break;
        }
    }
    content.innerHTML += `<label for='billNumber'>Bill number(eg.:11111111-11111111-11111111):</label> <input type='text' id='billNumber'  placeholder='11111111-11111111-11111111' value='${bill.billNumber}'> `;
    content.innerHTML += `<label for='total' >Total:</label> <input type='number' id='total' min='0' value='${bill.total}'>`;
    content.innerHTML += `<label for='afa'>VAT:</label> <input type='number' id='afa' min='0' value='${bill.afa}'>`;

    content.innerHTML += `<div id='createdP'>`;
    const createdBekezdes = document.getElementById("createdP");
    createdBekezdes.innerHTML = `<label for='created'>Created date:</label> <input type='date' id='created' value='${bill.created}'>`;
    content.innerHTML += `</div>`;

    content.innerHTML += `<div id='deadLineP'>`;
    const deadLineBekezdes = document.getElementById("deadLineP");
    deadLineBekezdes.innerHTML = `<label for='deadline'>Deadline:</label> <input type='date' id='deadline' value='${bill.deadline}'>`;
    content.innerHTML += `</div>`;

    content.innerHTML += `<div id='payDayP'>`;
    const payDayBekezdes = document.getElementById("payDayP");
    payDayBekezdes.innerHTML = `<label for='payDay'>Pay day:</label> <input type='date' id='payDay' value='${bill.payDay}'>`;
    content.innerHTML += `</div>`;

    content.innerHTML += "<button id='submit' onclick='saveUpdatedBill()'>Save</button>";
    content.innerHTML += "<p id='message'></p>";


}

async function saveUpdatedBill() {
    bills = await getAllBillsFunction();
    let bill;
    for (const temp of bills) {

        if (selectedBillId == temp.id) {
            bill = temp;
            break;
        }
    }
    if (document.getElementById("message").innerHTML != "") {
        document.getElementById("message").innerHTML = "";
    }
    const billNumber = document.getElementById("billNumber").value.trim();
    let total = document.getElementById("total").value.trim();
    let afa = document.getElementById("afa").value.trim();
    let created = document.getElementById("created").value;
    let payDay = document.getElementById("payDay").value.trim();
    let deadline = document.getElementById("deadline").value;

    if (billNumber != undefined && billNumber.length > 0 && total != undefined && total.length > 0 && afa != undefined && afa.length > 0 && created != undefined && created.length > 0 && payDay != undefined && payDay.length > 0 && deadline != undefined && deadline.length > 0) {

        if (billNumber.length != 26 || !billNumberRegex.test(billNumber)) {
            document.getElementById("message").innerHTML = "Incorrect bill number!";
            return;
        }
        for (const bill of bills) {
            if (bill.billNumber == billNumber && bill.id != selectedBillId) {
                document.getElementById("message").innerHTML = "Bill number already exists!";
                return;
            }
        }
        total = Math.round(parseFloat(total))
        if (total < 0) {
            document.getElementById("message").innerHTML = "Total cannot be nagative!";
            return;
        }
        afa = Math.round(parseFloat(afa))
        if (afa < 0) {
            document.getElementById("message").innerHTML = "VAT cannot be nagative!";
            return;
        }
        created = new Date(created);
        deadline = new Date(deadline);
        payDay = new Date(payDay);
        if (created >= deadline) {
            document.getElementById("message").innerHTML = "Deadline cannot be before the created date!";
            return;
        }
        if (created > payDay) {
            document.getElementById("message").innerHTML = "Cannot pay before created date!";
            return;
        }
        if (deadline < payDay) {
            document.getElementById("message").innerHTML = "Cannot pay overdue!";
            return;
        }
        const dateStringCreated = `${created.getFullYear()}-${created.getMonth() > 9 ? created.getMonth() : "0" + created.getMonth()}-${created.getDate() > 9 ? created.getDate() : "0" + created.getDate()}`;
        const dateStringDeadline = `${deadline.getFullYear()}-${deadline.getMonth() > 9 ? deadline.getMonth() : "0" + deadline.getMonth()}-${deadline.getDate() > 9 ? deadline.getDate() : "0" + deadline.getDate()}`;
        const dateStringPayDay = `${payDay.getFullYear()}-${payDay.getMonth() > 9 ? payDay.getMonth() : "0" + payDay.getMonth()}-${payDay.getDate() > 9 ? payDay.getDate() : "0" + payDay.getDate()}`;
        let body = {
            sellerId: `${bill.sellerId}`,
            buyerId: `${bill.buyerId}`,
            billNumber: `${billNumber}`,
            created: `${dateStringCreated}`,
            payDay: `${dateStringDeadline}`,
            deadline: `${dateStringPayDay}`,
            total: total,
            afa: afa
        };
        await putBillFunction(JSON.stringify(body), bill.id);
        content.innerHTML = "";
        content.style.display = "none";
    }
    else {
        document.getElementById("message").innerHTML += "Missing data!";
    }
}

async function deleteBill() {
    bills = await getAllBillsFunction();
    await deleteBillFunction(selectedBillId);
    content.innerHTML = "";
    listBills();

}