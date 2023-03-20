const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

function getCustomers(req, res) {
	prisma.customer.findMany().then((customers) => {
		res.send(customers);
	});
}

function getCustomer(req, res) {
	prisma.customer.findUnique({
		where: {
			id: parseInt(req.params.id)
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
	prisma.customer.create({
		data: {
			name: req.body.name,
			email: req.body.email
		}
	}).then((customer) => {
		res.send(customer);
	});
}

function putCustomer(req, res) {
	prisma.customer.update({
		where: {
			id: parseInt(req.params.id)
		},
		data: {
			name: req.body.name,
			email: req.body.email
		}
	}).then((customer) => {
		res.send(customer);
	});
}

function deleteCustomer(req, res) {
	prisma.customer.delete({
		where: {
			id: parseInt(req.params.id)
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