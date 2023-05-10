import {Box, Button, Input, FormLabel, Typography} from "@mui/joy";
import React, {useState} from 'react';
import MainLayout from "./main-layout.jsx";
import {API_URL, PUBLIC_TOKEN} from "../globals";
import {createCustomer} from "../tools/fetcher";


export default function Developers() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

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
              <Typography variant="h1">Customer register</Typography>
              {/*<form onSubmit={createCustomer}>*/}
                <FormLabel>Email</FormLabel>
                <Input sx={{margin: '5px'}} required placeholder="e-mail" variant="soft" onChange={(e) => setEmail(e.target.value)}/>
                <FormLabel>Name</FormLabel>
                <Input sx={{margin: '5px'}} required placeholder="name" variant="soft" onChange={(e) => setName(e.target.value)}/>
                <Button onClick={() => createCustomer(email, name)}>Register</Button>
              {/*</form>*/}
            </Box>
        </MainLayout>
    );
}