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
import {readLocalStorage} from '../tools/readLocalStorage';
import {sendCar} from "../tools/fetcher";
import CarBuy from './car-buy.jsx';

export default function App() {
	const [user_id, setUser_id] = useState(readLocalStorage('user_id'));
	const [cars, setCars] = useState([]);

	const handleSubmit = (car) => {
		sendCar(car);
	};

	return (
		<CssVarsProvider>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/offers" element={<Home/>}/>
				<Route path="/fordevelopers" element={<Developers/>}/>
				<Route path="/offeracar" element={user_id ? <CarForm onSubmit={handleSubmit}/> : <CustomerForm/>}/>
				<Route path="/buy/:id" element={user_id ? <CarBuy cars={cars}/> : <CustomerForm/>}/>
				<Route path='*' element={<NotFound/>}/>
			</Routes>
		</CssVarsProvider>
	);
}
