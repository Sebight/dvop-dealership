import MainLayout from "./main-layout.jsx";
import React, {useState} from 'react';
import {Box, Button, FormLabel, FormControl, Input, Typography} from "@mui/joy";
import Car from "../models/car";

export default function CarForm({ onSubmit }) {
	const [formValues, setFormValues] = useState({
		id: '',
		make: '',
		model: '',
		color: '',
		description: '',
		image: '',
		mileage: 0,
		price: 0,
		vin: '',
		year: 0,
		creator_id: ''
	});

	const handleSubmit = (event) => {
		//If customer_id exists in local storage

		event.preventDefault(); // Prevent the default form submission
		// Create a new instance of the Car class
		const car = new Car(
			formValues.id,
			formValues.make,
			formValues.model,
			formValues.color,
			formValues.description,
			formValues.image,
			formValues.mileage,
			formValues.price,
			formValues.vin,
			formValues.year,
			formValues.creator_id,
            false
		);
		// Call the onSubmit function with the new car object
		onSubmit(car);

		// Reset the form values
		setFormValues({
			make: '',
			model: '',
			color: '',
			description: '',
			image: '',
			mileage: 0,
			price: 0,
			vin: '',
			year: 0
		});
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
		console.log(formValues)
	};

	const inputFields = Object.getOwnPropertyNames(new Car()).map((prop) => (
		prop !== 'creator_id' && prop !== 'sold' && prop !== 'id' &&
		<FormControl>
			<FormLabel>{prop.toUpperCase()}</FormLabel>
			<Input
				type={typeof formValues[prop] === 'number' ? 'number' : 'text'}
				id={prop}
				key={prop}
				name={prop}
				value={formValues[prop]}
				onChange={handleChange}
				placeholder={prop}
				required
				sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
			/>
		</FormControl>
	));

	return (
		<MainLayout>
			<Typography level={'h1'}>Car form</Typography>
			<Box
				sx={{
					py: 2,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<form onSubmit={handleSubmit}>
					{inputFields}
					<Button type='submit'>Submit</Button>
				</form>
			</Box>
		</MainLayout>
	);
}