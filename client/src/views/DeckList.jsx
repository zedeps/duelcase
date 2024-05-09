import { useEffect, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const DeckList = () => {
    const [decks, setDecks] = useState([]);
    // const [randomCard, setRandomCard] = useState({});
    // const [randomCardImage, setRandomCardImage] = useState("");

    const navigate = useNavigate()

    const fetchDecks = () => {
        axios.get("http://localhost:8000/api/decks")
            .then((res) => {
                console.log(res.data);
                setDecks(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchDecks();
    }, [])

    const deleteDeck = (id) => {
        axios.delete(`http://localhost:8000/api/decks/${id}`)
            .then((res) => {
                console.log(res.data);
                fetchDecks();
                navigate("/decks");
            })
    }

    // const fetchRandomCard = () => {
    //     axios.get("https://db.ygoprodeck.com/api/v7/randomcard.php")
    //         .then((res) => {
    //             console.log(res.data);
    //             setRandomCard(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // const fetchRandomCardImage = (card) => {
    //     const image = card.card_images[0].image_url_small
    //     setRandomCardImage(image)
    //     console.log(randomCardImage)
    // }

    const randomCardDisplay = (array) => {
        return array[Math.floor((Math.random() * array.length))].card_images[0].image_url_small
    }

    return (
        <>
            <div>
                <div>
                    <div id="header_container" className="flex justify-between items-center w-full h-16 p-3 bg-amber-950 border-amber-600 border-2">
                        <h1 className=" font-extrabold text-amber-500 text-3xl">Welcome to DuelCase!</h1>
                        <div className="flex justify-around w-1/5">
                            <Link to={`/deck/new`} className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded">Create New Deck</Link>
                        </div>
                    </div>
                    <div id="right_column" className="flex flex-col justify-center items-center">
                        <h1 className= "text-amber-300 font-extrabold text-6xl py-2 px-4 underline w-1/3">Decks</h1>
                        <div className="w-3/4 overflow-y-scroll">
                            {decks.map((deck) => (
                                <div key={deck._id} className="flex justify-between items-center">
                                    <div className="w-1/3">
                                        <img src={randomCardDisplay(deck.maindeck)} alt="" className="w-48"/>
                                    </div>
                                    <div className="w-1/3">
                                        <h3 className=" font-extrabold text-amber-400 text-2xl underline overflow-x-clip   ">{deck.name}</h3>
                                        <p className="font-bold text-amber-200 text-sm overflow-y-scroll">{deck.details}</p>
                                    </div>
                                    <div className="w-1/3">
                                            <Link to={`/deck/${deck._id}/view`} className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded">View Deck</Link>
                                            <button onClick={() => deleteDeck(deck._id)} className="bg-red-500 hover:bg-red-400 text-black font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Delete Deck</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeckList;