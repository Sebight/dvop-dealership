import {Box, Button, Input, Typography} from "@mui/joy";
import React, {useEffect, useState} from 'react';
import CardButton from "./card.jsx";
import MainLayout from "./main-layout.jsx";


export default function Developers() {
    const [cars, setCars] = useState([]);

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");

	function genToken() {

	}

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
        <Box
            sx={{
                py: 2,
                display: 'grid',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
			<Typography variant="h1">Developers login</Typography>
			<Input placeholder="e-mail" variant="soft" onChange={(e) => setEmail(e.target.value)}/>
			<Input placeholder="name" variant="soft" onChange={(e) => setName(e.target.value)}/>
			<Button>Register & generate token</Button>
		</Box>
    );
}