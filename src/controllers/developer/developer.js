const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');
const joi = require('joi');

function getDevelopers(req, res) {
    prisma.developer.findMany().then((developers) => {
        res.send(developers);
    });
}

function getDeveloper(req, res) {
    const schema = joi.object({
        token: joi.string().required()
    });

    const {error, value} = schema.validate(req.params);
    if (error) {
        res.status(400).send('400');
        return;
    }

    prisma.developer.findUnique({
        where: {
            token: req.params.token
        }
    }).then((developer) => {
        if (!developer) {
            res.status(404).send('404');
            return;
        }
        res.send(developer);
    });
}

function postDeveloper(req, res) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required()

    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        res.status(400).send('400');
        return;
    }

    const uuid = crypto.randomUUID();

    if (req.body.name === undefined || req.body.email === undefined) {
        res.status(400).send('400');
        return;
    }

    prisma.developer.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            token: uuid
        }
    }).then((developer) => {
        res.send(developer);
    });
}

function putDeveloper(req, res) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required()
    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        res.status(400).send('400');
        return;
    }

    prisma.developer.update({
        where: {
            token: req.params.token
        },
        data: {
            name: req.body.name,
            email: req.body.email
        }
    }).then((developer) => {
        res.send(developer);
    });
}

function deleteDeveloper(req, res) {
    const schema = joi.object({
        token: joi.string().required()
    });

    const {error, value} = schema.validate(req.params);
    if (error) {
        res.status(400).send('400');
        return;
    }

    let developerExists = false;
    prisma.developer.findUnique({
        where: {
            token: req.params.token
        }
    }).then((developer) => {
        if (developer) {
            developerExists = true;
        }
    });

    if (!developerExists) {
        res.status(404).send('404');
        return;
    }

    prisma.developer.delete({
        where: {
            token: req.params.token
        }
    }).then((developer) => {
        res.send(developer);
    });
}

module.exports = {
    getDevelopers,
    getDeveloper,
    postDeveloper,
    putDeveloper,
    deleteDeveloper
}