import {Box} from "@mui/joy";
import React, {useEffect, useState} from 'react';
import CardButton from "./card.jsx";
import MainLayout from "./main-layout.jsx";
import {PUBLIC_TOKEN} from "../globals";


export default function Home() {
	const [cars, setCars] = useState([]);

	useEffect(() => {
		fetch('http://localhost:1234/api/v1/car', {
			headers: {
				token: PUBLIC_TOKEN
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