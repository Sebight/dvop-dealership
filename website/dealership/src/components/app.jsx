import { CssVarsProvider } from '@mui/joy/styles';
import {Route, Routes} from 'react-router-dom';
import Home from './home.jsx';
import React from 'react';

export default function App() {
  return (
    <CssVarsProvider>
      <Routes>
        {/*Tady jsou jednotlivé routy*/}
        <Route path="/" element={<Home />} />
      </Routes>
    </CssVarsProvider>
  );
}
