const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');
const joi = require('joi');
const {translateNumberToRole} = require("../../middlewares/priority");
const {sendEmail} = require("../../services/emailService");
const emails = require("../../global/emails");

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
            token: value.token
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
        email: joi.string().email().required(),
        priorityGroup: joi.number().integer().min(1).max(3).required()
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
            name: value.name,
            email: value.email,
            token: uuid,
            priorityGroup: translateNumberToRole(value.priorityGroup)
        }
    }).then((developer) => {
        const newDevHTML = emails.NEW_DEV.replace('{API_KEY}', uuid);
        sendEmail(value.email, "Welcome on board!", "", newDevHTML);
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
            name: value.name,
            email: value.email
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
            token: value.token
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
            token: value.token
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