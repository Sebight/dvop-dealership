import {Modal, ModalClose, Typography, Sheet} from "@mui/joy";
import React, {useEffect, useState} from 'react';

export default function Popup({open = true, onClosed = () => {}, props ={}}) {
	const [show, setShown] = useState(!!open);
	useEffect(() => { setShown(!!open); }, [open]);

	function onModalClosed() {
		setShown(false);
		setTimeout(() => onClosed(), 100);
	}

	return (
		<Modal
			open={show}
			onClose={onModalClosed}
			keepMounted={true}
		>
			<Sheet
				variant="outlined"
				sx={{
					maxWidth: 500,
					borderRadius: 'md',
					p: 3,
					boxShadow: 'lg',
				}}>
				<ModalClose />
				<Typography>{props.make}</Typography>
			</Sheet>
		</Modal>
	);
}