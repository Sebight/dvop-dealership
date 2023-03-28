const tokenMiddleware = require('../middlewares/token');

function canPerform(action) {
    return async function (req, res, next) {
        let token = req.headers.token;
        if (await hasPermission(token, action)) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    };
}

async function hasPermission(token, action) {
    let data = await tokenMiddleware.getTokenData(token);
    return canGroupPerform(action, data.priorityGroup);
}

function canGroupPerform(action, group) {
    let priorityObject = {
        [Actions.NEW_CAR]: ["admin", "public", "developer"],
        [Actions.GET_CARS]: ["admin", "public", "developer"],
        [Actions.GET_CAR]: ["admin", "public", "developer"],
        [Actions.UPDATE_CAR]: ["admin"],
        [Actions.DELETE_CAR]: ["admin"],
        [Actions.GET_CUSTOMERS]: ["admin", "developer"],
        [Actions.GET_CUSTOMER]: ["admin", "developer"],
        [Actions.NEW_CUSTOMER]: ["admin"],
        [Actions.UPDATE_CUSTOMER]: ["admin"],
        [Actions.DELETE_CUSTOMER]: ["admin"],
        [Actions.GET_DEVELOPERS]: ["admin"],
        [Actions.GET_DEVELOPER]: ["admin"],
        [Actions.NEW_DEVELOPER]: ["admin"],
        [Actions.UPDATE_DEVELOPER]: ["admin"],
        [Actions.DELETE_DEVELOPER]: ["admin"],
        [Actions.GET_ORDERS]: ["admin", "developer"],
        [Actions.GET_ORDER]: ["admin", "developer"],
        [Actions.NEW_ORDER]: ["admin", "developer"],
        [Actions.UPDATE_ORDER]: ["admin"],
        [Actions.DELETE_ORDER]: ["admin"],
    }
    console.log(action, group);
    return priorityObject[action].includes(group);
}

const Actions = {
    NEW_CAR: 'NEW_CAR',
    GET_CARS: 'GET_CARS',
    GET_CAR: 'GET_CAR',
    UPDATE_CAR: 'UPDATE_CAR',
    DELETE_CAR: 'DELETE_CAR',
    GET_CUSTOMERS: 'GET_CUSTOMERS',
    GET_CUSTOMER: 'GET_CUSTOMER',
    NEW_CUSTOMER: 'NEW_CUSTOMER',
    UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
    DELETE_CUSTOMER: 'DELETE_CUSTOMER',
    GET_DEVELOPERS: 'GET_DEVELOPERS',
    GET_DEVELOPER: 'GET_DEVELOPER',
    NEW_DEVELOPER: 'NEW_DEVELOPER',
    UPDATE_DEVELOPER: 'UPDATE_DEVELOPER',
    DELETE_DEVELOPER: 'DELETE_DEVELOPER',
    GET_ORDERS: 'GET_ORDERS',
    GET_ORDER: 'GET_ORDER',
    NEW_ORDER: 'NEW_ORDER',
    UPDATE_ORDER: 'UPDATE_ORDER',
    DELETE_ORDER: 'DELETE_ORDER',
}

module.exports = {
    canPerform,
    Actions
}