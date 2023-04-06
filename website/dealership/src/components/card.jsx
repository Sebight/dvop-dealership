import React, {useState} from 'react';
import {AspectRatio, Card, Chip, Link, Typography} from "@mui/joy";
import Popup from "./popup.jsx";
import {formatPrice} from "../tools/formatPrice";



export default function CardButton(props) {
    const [carPopupShown, setCarPopupShown] = useState(false);

    function handleClickCarCard() {
        setCarPopupShown(true);
    }

    function handlePopupClosed() {
        setCarPopupShown(false);
    }

    return (
        <Card
            onClick={handleClickCarCard}
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: 320,
                gap: 2,
                '&:hover': {boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder'},
            }}
        >
            <AspectRatio ratio="1" sx={{width: 90}}>
                <img
                    src={props.car.image}
                    srcSet={props.car.image}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <div>
                <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
                    {props.car.make} {props.car.model}
                </Typography>
                <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
                    <Link
                        overlay
                        underline="none"
                        href="#interactive-card"
                        sx={{color: 'text.tertiary'}}
                    >
                        {props.car.year}
                    </Link>
                </Typography>
                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{pointerEvents: 'none'}}
                >
                    {formatPrice(props.car.price)}
                </Chip>
            </div>
            <Popup open={carPopupShown} onClosed={handlePopupClosed} props={props.car}/>
        </Card>
    );
}