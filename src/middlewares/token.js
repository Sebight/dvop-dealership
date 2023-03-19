const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

function isUUID(uuid) {
    const uuidRegex = new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$');
    return uuidRegex.test(uuid);
}

async function isTokenValid(token) {
    if (token === undefined || !isUUID(token)) {
        return false;
    }
    const foundToken = await prisma.developer.findUnique({
        where: {
            token: token
        }
    });
    return foundToken !== null;
}

module.exports = {
    isTokenValid
}