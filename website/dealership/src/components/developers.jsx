import {Box, Button, Input, Typography} from "@mui/joy";
import React, {useState} from 'react';
import MainLayout from "./main-layout.jsx";
import {postDeveloper} from "../tools/fetcher";


export default function Developers() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [token, setToken] = useState("");
    const [tokenReceived, setTokenReceived] = useState(false);


    function genToken() {
        postDeveloper(name, email, (data) => {
            setToken(data);
            setTokenReceived(true);
        })
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
              <form onSubmit={() => genToken}>
                <Input sx={{marginTop:'10%'}} required placeholder="e-mail" variant="soft" onChange={(e) => setEmail(e.target.value)}/>
                <Input sx={{marginTop:'10%'}} required placeholder="name" variant="soft" onChange={(e) => setName(e.target.value)}/>
                <Button sx={{marginTop:'10%'}} disabled={tokenReceived}>Register & generate token</Button>
              </form>
                {tokenReceived && <Typography variant="body1">token: {token}</Typography>}
            </Box>
        </MainLayout>
    );
}