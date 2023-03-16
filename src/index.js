const express = require('express');
const app = express();
// TODO: ENV
const port = 3000;
const router = require('./routes/router');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use('/api/v1', router);

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
    const allCars = await prisma.car.findMany();
    console.log(allCars);
});

async function connect() {
    prisma.$connect();
    return true;
}