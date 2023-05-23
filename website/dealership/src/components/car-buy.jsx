import {Box, Button, Typography} from '@mui/joy';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MainLayout from './main-layout.jsx';
import {getCar, sendCar} from "../tools/fetcher.js";
import {formatPrice} from "../tools/formatPrice.js";

export default function CarBuy(props = {}) {
	const carId = useParams().id;
	const [car, setCar] = useState([]);

	useEffect(() => {
		getCar(carId, setCar);
	}, []);

	function handleClick() {
		//Set car sold to true
		car['sold'] = true;
		sendCar(car, 'PUT');
	}

	return (
		<MainLayout>
			{car &&
				(<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="100vh"
					flexDirection="column"
					gap="1rem"
				>
					<Typography level='h1'>Confirm Order</Typography>
					<img
						src={car.image}
						srcSet={car.image}
						loading="lazy"
						alt=""
						style={{
							width: '100%',
							height: 'auto',
						}}
					/>
					<Typography level='h2'>{car.make} {car.model}</Typography>
					<Typography level='h3'>Price: {formatPrice(car.price)}</Typography>
					<Typography level='h3'>Year: {car.year}</Typography>
					<Typography level='h3'>Mileage: {car.mileage}</Typography>
					<Typography level='h3'>Color: {car.color}</Typography>

					<Button onClick={() => {
						handleClick();
					}}>Buy</Button>
				</Box>)
			}
		</MainLayout>
	)
}