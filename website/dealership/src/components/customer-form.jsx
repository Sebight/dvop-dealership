import {Box, Button, Input, FormLabel, Typography} from "@mui/joy";
import React, {useState} from 'react';
import MainLayout from "./main-layout.jsx";
import {API_URL, PUBLIC_TOKEN} from "../globals";


export default function Developers() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    function createCustomer() {
      console.log(email, name)
        fetch(API_URL + "/customer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': PUBLIC_TOKEN
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
          localStorage.setItem("user_id", data.id);
          window.location.reload();
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
              <Typography variant="h1">Customer register</Typography>
              {/*<form onSubmit={createCustomer}>*/}
                <FormLabel>Email</FormLabel>
                <Input sx={{margin: '5px'}} required placeholder="e-mail" variant="soft" onChange={(e) => setEmail(e.target.value)}/>
                <FormLabel>Name</FormLabel>
                <Input sx={{margin: '5px'}} required placeholder="name" variant="soft" onChange={(e) => setName(e.target.value)}/>
                <Button onClick={createCustomer}>Register</Button>
              {/*</form>*/}
            </Box>
        </MainLayout>
    );
}