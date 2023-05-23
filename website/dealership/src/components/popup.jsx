import {Modal, ModalClose, Typography, Sheet, AspectRatio, Box, Button} from "@mui/joy";
import React, {useEffect, useState} from 'react';
import {formatPrice} from "../tools/formatPrice";

export default function Popup({open = true, onClosed = () => {
    }, props = {}}) {
    const [show, setShown] = useState(!!open);
    useEffect(() => {
        setShown(!!open);
    }, [open]);

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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    borderRadius: 'md',
                    p: 6,
                    boxShadow: 'lg',
                    width: '50%',
                }}>
                <ModalClose/>
                <AspectRatio sx={{width: "auto"}}>
                    <img
                        src={props.image}
                        srcSet={props.image}
                        loading="lazy"
                        alt=""
                        style={{
                            borderRadius: "0.3rem",
                        }}
                    />
                </AspectRatio>
                <Box>
                    <Typography fontSize={"2.5rem"} fontWeight="md">{props.make} {props.model}</Typography>
                    <Typography>{props.description}</Typography>
                    <Typography><b>Year</b>: {props.year}</Typography>
                    <Typography><b>Price</b>: {formatPrice(props.price)}</Typography>
                    <Typography><b>Driven</b>: {props.mileage != undefined ? props.mileage : "{unknown}"} km</Typography>
                    <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
                        <b>VIN</b>: {props.vin}
                    </Typography>
                    <Button onClick={() => {
                        window.location.href = "/buy/" + props.id;
                    }}>Buy</Button>
                </Box>
            </Sheet>
        </Modal>
    );
}