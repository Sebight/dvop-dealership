const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const joi = require('joi');
const {sendEmail} = require("../../services/emailService");
const emails = require("../../global/emails");


function getCustomers(req, res) {
    prisma.customer.findMany().then((customers) => {
        res.send(customers);
    });
}

function getCustomer(req, res) {
    const schema = joi.object({
        id: joi.number().required()
    });

    const {error, value} = schema.validate(req.params);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    prisma.customer.findUnique({
        where: {
            id: parseInt(value.id)
        }
    }).then((customer) => {
        if (!customer) {
            res.status(404).send('404');
            return;
        }
        res.send(customer);
    });
}

function postCustomer(req, res) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required()
    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    prisma.customer.create({
        data: {
            name: value.name,
            email: value.email
        }
    }).then((customer) => {
        res.send(customer);
        sendEmail(customer.email, 'Welcome on board', "", emails.NEW_CUSTOMER);
    });
}

function putCustomer(req, res) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required()
    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    prisma.customer.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name: value.name,
            email: value.email
        }
    }).then((customer) => {
        res.send(customer);
    });
}

function deleteCustomer(req, res) {
    const schema = joi.object({
        id: joi.number().required()
    });

    const {error, value} = schema.validate(req.params);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    prisma.customer.delete({
        where: {
            id: parseInt(value.id)
        }
    }).then((customer) => {
        res.send(customer);
    });
}

module.exports = {
    getCustomers,
    getCustomer,
    postCustomer,
    putCustomer,
    deleteCustomer
}