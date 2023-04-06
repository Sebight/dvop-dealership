import {Modal, ModalClose, Typography, Sheet, AspectRatio, Box} from "@mui/joy";
import React, {useEffect, useState} from 'react';
import {formatPrice} from "../tools/formatPrice";

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
            sx={{
            }}
		>
			<Sheet
				variant="outlined"
				sx={{
					maxWidth: 500,
                    width: 'auto',
					borderRadius: 'md',
					p: 3,
					boxShadow: 'lg',
                }}>
				<ModalClose />
				<Typography>{props.make} - {props.model}</Typography>
                <AspectRatio sx={{width: "auto"}}>
                    <img
                        src={props.image}
                        srcSet={props.image}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <Box>
                    <Typography>{props.year}</Typography>
                    <Typography>{formatPrice(props.price)}</Typography>
                </Box>
			</Sheet>
		</Modal>
	);
}