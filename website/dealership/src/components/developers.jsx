import {Box, Button, Input, Typography} from "@mui/joy";
import React, {useEffect, useState} from 'react';
import CardButton from "./card.jsx";
import MainLayout from "./main-layout.jsx";
import {API_URL, PUBLIC_TOKEN} from "../globals";


export default function Developers() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [token, setToken] = useState("");
    const [tokenReceived, setTokenReceived] = useState(false);


    function genToken() {
        fetch(API_URL + "/developer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': PUBLIC_TOKEN
            },
            body: JSON.stringify({
                name: name,
                email: email,
                priorityGroup: 2
            })
        }).then(res => res.json())
            .then(data => {
                if (data.token !== undefined) {
                    setToken(data.token);
                    setTokenReceived(true);
                }
            });
    }

    return (
        <MainLayout>
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
                <Button onClick={genToken} disabled={tokenReceived}>Register & generate token</Button>
                {tokenReceived && <Typography variant="body1">token: {token}</Typography>}
            </Box>
        </MainLayout>
    );
}