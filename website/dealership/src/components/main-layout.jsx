import {List, ListItem, Box, Button, Sheet} from '@mui/joy';
import {Link, useLocation} from 'react-router-dom';
import React from 'react';

function NavButton({to, label, activeColor = '#045dc2', sx = {}, ...rest}) {
	const route = String(to);
	const path = String(useLocation()?.pathname ?? '');
	const active = path === route || (route !== '/' && path.startsWith(route));

	return (
		<Button
			color='primary'
			component={Link}
			to={route}
			sx={{backgroundColor: String(active ? activeColor : 'transparent'), ...sx}}
			{...rest}
		>
			{String(label)}
		</Button>
	);
}

export default function MainLayout({children}) {
	return (
		<main>
			<Sheet
				className="FirstSidebar"
				sx={{
					width: '100%',
					height: '100%',
					top: 0,
					flexShrink: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<List sx={{display: 'flex', flexDirection: 'row', backgroundColor: 'blue', position: 'sticky', top: 0, width: '100%', justifyContent: 'center', zIndex: 10}}>
					<ListItem>
							<NavButton
								to={'/'}
								label='Home'
							/>
					</ListItem>
					<ListItem>
							<NavButton
								to={'/offers'}
								label='Offers'
							/>
					</ListItem>
				</List>
				<Box sx={{m: 5}}>
					{children}
				</Box>
			</Sheet>
		</main>
	);
}
