import {Box, Button, extendTheme, Grid, Input, Sheet, Stack, styled, Table, Typography} from "@mui/joy";
import {CssVarsProvider} from '@mui/joy/styles';
import React, {useEffect, useState} from 'react';
import Card from "./card";
import CardButton from "./card";

export default function Home() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch('http://localhost:1234/api/v1/car', {
            headers: {
                token: '35936648-bd9b-4195-ac10-bc57596791b0'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setCars(data);
            console.log(data);
        });
    }, [])

    const Item = styled(Sheet)(({theme}) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.vars.palette.text.tertiary,
    }));

    return (
        <Grid justifyContent="center" alignItems="center">
            {cars.map((car) => {
                return (
                    <Item>
                        <CardButton car={car} key={car.id}/>
                    </Item>
                )
            })}
        </Grid>
    );
}