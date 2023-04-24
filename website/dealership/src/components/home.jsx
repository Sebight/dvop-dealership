import {Box} from "@mui/joy";
import React, {useEffect, useState} from 'react';
import CardButton from "./card.jsx";
import MainLayout from "./main-layout.jsx";


export default function Home() {
	const [cars, setCars] = useState([]);

	useEffect(() => {
		fetch('http://localhost:1234/api/v1/car', {
			headers: {
				token: '35936648-bd9b-4195-ac10-bc57596791b0'
			}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			setCars(data);
		});
	}, [])

	return (
		<MainLayout>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
				flexDirection="column"
				gap="1rem"
			>
				{cars.map((car) => {
					return (
						<CardButton car={car} key={car.id}/>
					)
				})}
			</Box>
		</MainLayout>
	);
}