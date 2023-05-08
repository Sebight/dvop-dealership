import MainLayout from './main-layout.jsx';
import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Typography, Sheet} from '@mui/joy';

export default function NotFound() {
	return (
		<MainLayout>
			<Sheet sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
				<Typography level={'h1'}>404</Typography>
				<Typography level={'h2'}>Page not found</Typography>
				<Button
					color='primary'
					component={Link}
					to={'/'}
				>
					{'Go back to homepage'}
				</Button>
			</Sheet>
		</MainLayout>
	);
}