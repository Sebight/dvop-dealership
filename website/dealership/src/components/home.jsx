import {Box} from "@mui/joy";
import React, {useEffect, useState} from 'react';
import CardButton from "./card.jsx";
import MainLayout from "./main-layout.jsx";
import {PUBLIC_TOKEN} from "../globals";
import {getCars} from "../tools/fetcher";


export default function Home() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCars(setCars);
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
                    if (car.sold === false) {
                        return (
                            <CardButton car={car} key={car.id}/>
                        )
                    }
                })}
            </Box>
        </MainLayout>
    );
}