export default class Car {
	constructor(id, make, model, color, description, image, mileage, price, vin, year, creator_id) {
		this.id = id;
		this.make = make;
		this.model = model;
		this.color = color;
		this.description = description;
		this.image = image;
		this.mileage = mileage;
		this.price = price;
		this.vin = vin;
		this.year = year;
		this.creator_id = creator_id;
	}

	getId() {
		return this.id;
	}

	setId(id) {
		this.id = id;
	}

	getMake() {
		return this.make;
	}

	setMake(make) {
		this.make = make;
	}

	getModel() {
		return this.model;
	}

	setModel(model) {
		this.model = model;
	}

	getYear() {
		return this.year;
	}

	setYear(year) {
		this.year = year;
	}

	getPrice() {
		return this.price;
	}

	setPrice(price) {
		this.price = price;
	}

	getImage() {
		return this.image;
	}

	setImage(image) {
		this.image = image;
	}

	getDescription() {
		return this.description;
	}

	setDescription(description) {
		this.description = description;
	}

	getColor() {
		return this.color;
	}

	setColor(color) {
		this.color = color;
	}

	getMileage() {
		return this.mileage;
	}

	setMileage(mileage) {
		this.mileage = mileage;
	}

	getVin() {
		return this.vin;
	}

	setVin(vin) {
		this.vin = vin;
	}

	getCreatorId() {
		return this.creator_id;
	}

	setCreatorId(creator_id) {
		this.creator_id = creator_id;
	}
}