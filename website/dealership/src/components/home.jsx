import {Box, Button, Input, Typography} from "@mui/joy";
import React, {useState} from 'react';

export default function Home() {
	const[name, setName] = useState('John Doe');

	return (
		<Box display={'flex'} gap={'10px'}>
			<Typography level={'h1'}>
				My name is {name}
			</Typography>
			<Input
				placeholder={'Enter your name'}
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
			></Input>
			<Button
				variant={'solid'}
				color={'primary'}
				onClick={() => {
					console.log('Hello world!')
				}}
			>
				Click me!
			</Button>
		</Box>
	);
}