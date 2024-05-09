import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';


const ViewDeck = () => {
    const [deck, setDeck] = useState({})
    const { id } = useParams()
    const [maindeck, setMaindeck] = useState([]);
    const [extradeck, setExtradeck] = useState([]);
    const [sidedeck, setSidedeck] = useState([]);

    useEffect(() => {
        getTargetDeck()
    }, [])

    const getTargetDeck = () => {
        axios.get(`http://localhost:8000/api/decks/${id}`)
            .then((res) => {
                console.log(id)
                console.log(res.data);
                setDeck(res.data);
                setMaindeck(res.data.maindeck.sort((a, b) => a.name - b.name || a.frameType.localeCompare(b.frameType)))
                setExtradeck(res.data.extradeck.sort((a, b) => a.frameType.localeCompare(b.frameType) || a.level - b.level || a.link - b.link))
                setSidedeck(res.data.sidedeck.sort((a, b) => a.name - b.name || a.frameType.localeCompare(b.frameType) || a.level - b.level))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div id="canvas" className="w-full bg-zinc-800">
            <div id="general_container">
                <div id="header_container" className="flex justify-between items-center w-full h-16 p-3 bg-amber-950 border-amber-600 border-2">
                    <h1 className=" font-extrabold text-amber-500 text-3xl">DuelCase - View Deck</h1>
                    <div className="flex justify-around w-1/5">
                        <Link to={`/decks`} className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded">Dashboard</Link>
                        <Link to={`/deck/${id}/edit`} className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded">Edit Deck</Link>
                    </div>
                </div>
                <div id="body_container" className="flex my-5">
                    <div id="column_1" className="flex flex-col justify-start items-center mr-6">
                        <h2 className="text-2xl font-bold text-amber-200 underline mb-10">{deck.name}</h2>
                        <div className="border-2 border-amber-600 p-4 rounded-xl w-3/4 mb-8">
                            <h3 className="text-xl text-amber-500 mb-5 ">Details</h3>
                            <p className="text-amber-200 ">{deck.details}</p>
                        </div>
                        <div className="border-2 border-amber-600 p-4 rounded-xl w-3/4">
                            <h3 className="text-xl text-amber-500 mb-5">Deck Breakdown</h3>
                            <p className="text-amber-200">{deck.breakdown}</p>
                        </div>
                    </div>
                    <div id="column_2" className="flex flex-col justify-evenly w-4/6">
                        <div className="flex flex-col ">
                            <h3 className="text-xl text-amber-500">Main Deck - {maindeck.length} cards</h3>
                            <div className="flex flex-wrap p-3 mb-4 border-2 border-pink-600 bg-pink-300 rounded-xl">
                                {maindeck.map((card, index) => (
                                    <a href={card.ygoprodeck_url} target="_blank" rel="noopener noreferrer" key={index}>
                                        <img src={card.card_images[0].image_url} className="w-16" alt="" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-xl text-amber-500">Extra Deck - {extradeck.length} cards</h3>
                            <div className="flex flex-wrap p-3 mb-4 border-2 border-green-600 bg-green-300 rounded-xl">
                                {extradeck.map((card, index) => (
                                    <a href={card.ygoprodeck_url} target="_blank" rel="noopener noreferrer"  key={index}>
                                        <img src={card.card_images[0].image_url} className="w-16" alt="" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-xl text-amber-500">Side Deck - {sidedeck.length} cards</h3>
                            <div className="flex flex-wrap p-3 mb-4 border-2 border-blue-600 bg-blue-300 rounded-xl">
                                {sidedeck.map((card, index) => (
                                    <a href={card.ygoprodeck_url} target="_blank" rel="noopener noreferrer"  key={index}>
                                        <img src={card.card_images[0].image_url} className="w-16" alt="" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewDeck;