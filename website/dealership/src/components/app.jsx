import {CssVarsProvider} from '@mui/joy/styles';
import {Route, Routes} from 'react-router-dom';
import Home from './home.jsx';
import CarForm from './car-form.jsx';
import CustomerForm from './customer-form.jsx';
import NotFound from './not-found.jsx';
import React, {useState} from 'react';
import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/300.css';
import Developers from "./developers";
import {API_URL, PUBLIC_TOKEN} from "../globals";
import {readLocalStorage} from "../tools/readLocalStorage";
import {postCar} from "../tools/fetcher";

export default function App() {
	const [user_id, setUser_id] = useState(readLocalStorage('user_id'));

	const handleSubmit = (car) => {
		postCar(car);
	};

	return (
		<CssVarsProvider>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/offers" element={<Home/>}/>
				<Route path="/fordevelopers" element={<Developers/>}/>
				<Route path="/offeracar" element={user_id ? <CarForm onSubmit={handleSubmit}/> : <CustomerForm />}/>
				<Route path='*' element={<NotFound/>}/>
			</Routes>
		</CssVarsProvider>
	);
}
