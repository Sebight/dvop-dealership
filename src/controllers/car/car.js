const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const joi = require('joi');

function getCars(req, res) {
    prisma.car.findMany().then((cars) => {
        res.send(cars);
    });
}

function getCar(req, res) {
    const schema = joi.object({
        id: joi.number().required()
    });

    const {error, value} = schema.validate(req.params);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

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
    const schema = joi.object({
        make: joi.string().required(),
        model: joi.string().required(),
        year: joi.number().required(),
        color: joi.string().required(),
        vin: joi.string().required(),
        mileage: joi.number().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        image: joi.string().allow(null)
    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

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
    const schema = joi.object({
        make: joi.string().required(),
        model: joi.string().required(),
        year: joi.number().required(),
        color: joi.string().required(),
        vin: joi.string().required(),
        mileage: joi.number().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        image: joi.string().allow(null)
    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

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

function deleteCar(req, res) {
    const schema = joi.object({
        id: joi.number().required()
    });

    const {error, value} = schema.validate(req.params);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    prisma.car.delete({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((car) => {
        res.send(car);
    });
}

module.exports = {
    getCars,
    getCar,
    postCar,
    putCar,
    deleteCar
}