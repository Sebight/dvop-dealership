const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

function getCars(req, res) {
    prisma.car.findMany().then((cars) => {
        res.send(cars);
    });
}

function getCar(req, res) {
    prisma.car.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((car) => {
        if (!car) {
            res.status(404).send('404');
            return;
        }
        res.send(car);
    });
}

function postCar(req, res) {
    prisma.car.create({
        data: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            vin: req.body.vin,
            mileage: req.body.mileage,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }
    }).then((car) => {
        res.send(car);
    });
}

function putCar(req, res) {
    prisma.car.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            vin: req.body.vin,
            mileage: req.body.mileage,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }
    }).then((car) => {
        res.send(car);
    });
}

module.exports = {
    getCars,
    getCar,
    postCar,
    putCar
}