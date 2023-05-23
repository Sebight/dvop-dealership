const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const joi = require('joi');
const {sendEmail} = require("../../services/emailService");
const {getCustomer} = require("../customer/customer");
const emails = require("../../global/emails");

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
            id: parseInt(value.id)
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
        image: joi.string().allow(null),
        creator_id: joi.number().required(),
        sold: joi.boolean().required(),
        invoker_id: joi.number()
    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    prisma.car.create({
        data: {
            make: value.make,
            model: value.model,
            year: value.year,
            color: value.color,
            vin: value.vin,
            mileage: value.mileage,
            price: value.price,
            description: value.description,
            image: value.image,
            creator_id: value.creator_id,
            sold: false
        }
    }).then((car) => {
        res.send(car);
    });
}

// Currently used for buying and selling cars
async function putCar(req, res) {
    const schema = joi.object({
        make: joi.string().required(),
        model: joi.string().required(),
        year: joi.number().required(),
        color: joi.string().required(),
        vin: joi.string().required(),
        mileage: joi.number().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        image: joi.string().allow(null),
        creator_id: joi.number().required(),
        sold: joi.boolean().required(),
        invoker_id: joi.number()
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
            make: value.make,
            model: value.model,
            year: value.year,
            color: value.color,
            vin: value.vin,
            mileage: value.mileage,
            price: value.price,
            description: value.description,
            image: value.image,
            creator_id: value.creator_id,
            sold: value.sold
        }
    }).then((car) => {
        res.send(car);
    });
    console.log(value.creator_id);
    console.log(value.invoker_id);
    if ((value.creator_id !== value.invoker_id) && value.sold === true) {
        console.log("Buy action happened");
        const buyer_email = await prisma.customer.findUnique({
            where: {
                id: value.invoker_id
            }
        });
        console.log("Notifying buyer: " + buyer_email.email);
        const seller_email = await prisma.customer.findUnique({
            where: {
                id: value.creator_id
            }
        });
        console.log("Notifying seller: " + seller_email.email);
        sendEmail(buyer_email.email, "Thank you for your purchase", "", emails.NEW_ORDER)
        sendEmail(seller_email.email, "Someone bought your car", "", emails.NEW_SELL)
    }
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
            id: parseInt(value.id)
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