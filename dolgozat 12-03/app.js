import express, {json} from 'express';
import * as Cars from './data/cars.js'

const PORT = 3000;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

app.get('/cars', (req, res) => {
    const cars = Cars.getCars();
    return res.status(200).json(cars);
});

app.get('/cars/:id', (req, res) => {
    const id = +req.params.id;
    const car = Cars.getCarsById(id);
    if (!car) {
        return res.status(400).json({message: 'Car cant be found'});
    }
    return res.status(200).json(car);
})

app.post('/cars', (req, res) => {
    const { brand, model, year } = req.body;
    if (!brand || !model || !year) {
        return res.status(400).json({message: "Fields are missing!"});
    }
    const id = Cars.createCar(brand, model, year).lastInsertedRowId;
    const savedSuccessfully = Cars.getCarsById(id);
    return res.status(201).json(savedSuccessfully);
});

app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    let car = db.getCarsById(id);
    if (!car) {
        return res.status(400).json({message: 'Car cant be found!'});
    }
    if(!brand || !model || !year) {
        return res.status(400).json({message: 'Invalid data!'});
    }
    db.updateCar(id, brand, model, year);
    car = db.getCarsById(id);
    res.status(200).json(car);
});