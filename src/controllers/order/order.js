const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const joi = require('joi');

function getOrders(req, res) {
    prisma.order.findMany().then((orders) => {
        res.send(orders);
    });
}

function getOrder(req, res) {
    const schema = joi.object({
        id: joi.number().integer().required()
    });

    const {error, value} = schema.validate(req.params);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    prisma.order.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((order) => {
        if (!order) {
            res.status(404).send('404');
            return;
        }
        res.send(order);
    });
}

function postOrder(req, res) {
    const schema = joi.object({
        customer_id: joi.number().integer().required()
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    prisma.order.create({
        data: {
            customer_id: req.body.customer_id
        }
    }).then((order) => {
        res.send(order);
    });
}

function putOrder(req, res) {
    const schema = joi.object({
        customer_id: joi.number().integer().required()
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    prisma.order.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            customer_id: req.body.customer_id
        }
    }).then((order) => {
        res.send(order);
    });
}

function deleteOrder(req, res) {
    const schema = joi.object({
        id: joi.number().integer().required()
    });

    const {error, value} = schema.validate(req.params);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    prisma.order.delete({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((order) => {
        res.send(order);
    });
}

module.exports = {
    getOrders,
    getOrder,
    postOrder,
    putOrder,
    deleteOrder
}