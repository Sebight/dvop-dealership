const express = require('express');
const cors = require('cors');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Dealership API',
        version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['routes/router.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const port = process.env.PORT || 1234;

const router = require('./routes/router');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, async () => {
    console.log("[Dealership] Starting server...");
    console.log("[Dealership] Connecting to database...");
    if (await connect()) {
        console.log("[Dealership] Connected to database");
    } else {
        console.log("[Dealership] Failed to connect to database");
        process.exit(1);
    }
    console.log(`[Dealership] Server listening at http://localhost:${port}`);
});

async function connect() {
    prisma.$connect();
    return true;
}