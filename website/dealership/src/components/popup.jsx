import {Modal, ModalClose, Typography, Sheet, AspectRatio, Box} from "@mui/joy";
import React, {useEffect, useState} from 'react';
import {formatPrice} from "../tools/formatPrice";

export default function Popup({
                                  open = true, onClosed = () => {
    }, props = {}
                              }) {
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
            //center to mid
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
                    />
                </AspectRatio>
                <Box>
                    <Typography fontSize={"2rem"} fontWeight="md">{props.make} - {props.model}</Typography>
                    <Typography>{props.description}</Typography>
                    <Typography>{props.year}</Typography>
                    <Typography>{formatPrice(props.price)}</Typography>
                    <Typography>{props.mileage != undefined ? props.mileage : "{unknown}"} km</Typography>
                    <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
                        {props.vin}
                    </Typography>
                </Box>
            </Sheet>
        </Modal>
    );
}