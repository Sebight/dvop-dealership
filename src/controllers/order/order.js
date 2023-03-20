const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

function getOrders(req, res) {
	prisma.order.findMany().then((orders) => {
		res.send(orders);
	});
}

function getOrder(req, res) {
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
	prisma.order.create({
		data: {
			id: req.body.id,
			customer_id: req.body.customer_id
		}
	}).then((order) => {
		res.send(order);
	});
}

function putOrder(req, res) {
	prisma.order.update({
		where: {
			id: parseInt(req.params.id)
		},
		data: {
			id: req.body.id,
			customer_id: req.body.customer_id
		}
	}).then((order) => {
		res.send(order);
	});
}

function deleteOrder(req, res) {
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