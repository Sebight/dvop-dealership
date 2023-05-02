import MainLayout from "./main-layout.jsx";
import React from 'react';
import {useParams} from "react-router-dom";

export default function CarForm() {
	const {id} = useParams();
	console.log(id);

	return (
		<MainLayout>
			<h1>Car form</h1>
		</MainLayout>
	);
}