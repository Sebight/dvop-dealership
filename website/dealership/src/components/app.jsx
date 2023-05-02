import { CssVarsProvider } from '@mui/joy/styles';
import {Route, Routes} from 'react-router-dom';
import Home from './home.jsx';
import CarForm from './car-form.jsx';
import NotFound from './not-found.jsx';
import React from 'react';
import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/300.css';
import Developers from "./developers";

export default function App() {
  return (
    <CssVarsProvider>
      <Routes>
        {/*Tady jsou jednotlivé routy*/}
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Home />} />
          <Route path="/fordevelopers" element={<Developers/>} />
        <Route path="/buy/:id" element={<CarForm />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </CssVarsProvider>
  );
}
