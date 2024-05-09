import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const CardDetails = () => {
    const {id} = useParams();
    const [targetCard, setTargetCard] = useState({});

    useEffect(() => {
        getCardById;
    }, [])

    const getCardById = () => {
        axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
        .then((res) => {
            console.log(res.data);
            setTargetCard(res.data[0]);
            console.log(targetCard);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <>
            <img src={targetCard.card_images[0].image_url} alt="" />
        </>
    )
}

export default CardDetails;