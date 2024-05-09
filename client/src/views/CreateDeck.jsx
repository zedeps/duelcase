import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CardSearch from '../components/CardSearch';



const CreateDeck = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [breakdown, setBreakdown] = useState("");
    const [maindeck, setMaindeck] = useState([]);
    const [extradeck, setExtradeck] = useState([]);
    const [sidedeck, setSidedeck] = useState([]);
    const [cardView, setCardView] = useState({})
    const [cardViewImage, setCardViewImage] = useState("")
    const [formErrors, setFormErrors] = useState({
        name: "",
        details: "",
        breakdown: ""
    });

    const onNewMaindeck = (addedCard) => {
        let tempDeck = [...maindeck, addedCard];
        const sortedTempDeck = tempDeck.sort((a, b) => a.name - b.name || a.frameType.localeCompare(b.frameType))
        setMaindeck(sortedTempDeck)
        console.log(maindeck)
    }

    const onNewExtradeck = (addedCard) => {
        let tempDeck = [...extradeck, addedCard];
        const sortedTempDeck = tempDeck.sort((a, b) => a.frameType.localeCompare(b.frameType) || a.level - b.level || a.link - b.link)
        setExtradeck(sortedTempDeck)
        console.log(extradeck)
    }

    const onNewSidedeck = (addedCard) => {
        let tempDeck = [...sidedeck, addedCard];
        const sortedTempDeck = tempDeck.sort((a, b) => a.name - b.name || a.frameType.localeCompare(b.frameType) || a.level - b.level)
        setSidedeck(sortedTempDeck)
        console.log(sidedeck)
    }


    const onDeleteCard = (targetCard) => {
        if (maindeck.some((item) => item === targetCard)) {
            let tempDeck = [...maindeck];
            let sortedTempDeck = tempDeck.sort((a) => {
                const id = targetCard.id;
                if (a.id != id) {
                    return -1;
                }
                if (a.id == id) {
                    return 1;
                }

                return 0;
            })
            sortedTempDeck.pop();
            setMaindeck(sortedTempDeck.sort((a, b) => a.name - b.name || a.frameType.localeCompare(b.frameType)))
        }
        else if (extradeck.some((item) => item === targetCard)) {
            let tempDeck = [...extradeck];
            let sortedTempDeck = tempDeck.sort((a) => {
                const id = targetCard.id;
                if (a.id != id) {
                    return -1;
                }
                if (a.id == id) {
                    return 1;
                }

                return 0;
            })
            sortedTempDeck.pop();
            setExtradeck(sortedTempDeck.sort((a, b) => a.name > b.name ? 1 : -1))
        }
        else if (sidedeck.some((item) => item === targetCard)) {
            let tempDeck = [...sidedeck];
            let sortedTempDeck = tempDeck.sort((a) => {
                const id = targetCard.id;
                if (a.id != id) {
                    return -1;
                }
                if (a.id == id) {
                    return 1;
                }

                return 0;
            })
            sortedTempDeck.pop();
            setSidedeck(sortedTempDeck.sort((a, b) => a.name > b.name ? 1 : -1))
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/decks/new', {
            name,
            details,
            breakdown,
            maindeck,
            extradeck,
            sidedeck
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/decks");
            })
    }

    const handleCardSelect = (card) => {
        setCardView(card)
        setCardViewImage(card.card_images[0].image_url)

    }

    const handleName = (e) => {
        setName(e.target.value);
        const value = e.target.value.trim();
        let errorMsg = '';
        if (value) {
            if (value.length < 2) {
                errorMsg = 'Name must be at least 2 characters!';
            }
            else if (value.length > 99) {
                errorMsg = 'Name must be less than 100 characters!';
            }
        }
        else {
            errorMsg = 'Name is required!';
        }
        setFormErrors({ ...formErrors, name: errorMsg })


    }

    const handleDetails = (e) => {
        setDetails(e.target.value);
        const value = e.target.value.trim();
        let errorMsg = '';
        if (value) {
            if (value.length < 2) {
                errorMsg = 'Details must be at least 2 characters!';
            }
            else if (value.length > 2000) {
                errorMsg = 'Details must be less than 2000 characters!';
            }
        }
        else {
            errorMsg = 'Details are required!';
        }
        setFormErrors({ ...formErrors, details: errorMsg })


    }

    const handleBreakdown = (e) => {
        setBreakdown(e.target.value);
        const value = e.target.value.trim();
        let errorMsg = '';
        if (value) {
            if (value.length < 2) {
                errorMsg = 'Breakdown must be at least 2 characters!';
            }
            else if (value.length > 2000) {
                errorMsg = 'Breakdown must be less than 2000 characters!';
            }
        }
        else {
            errorMsg = 'Breakdown is required!';
        }
        setFormErrors({ ...formErrors, breakdown: errorMsg })


    }

    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '');
    }

    return (
        <div>
        <div className='flex flex-col justify-start items-center'>
            <div id="header_container" className="flex justify-between items-center w-full h-16 p-3 bg-amber-950 border-amber-600 border-2">
                <h1 className=" font-extrabold text-amber-500 text-3xl">DuelCase - Create Deck</h1>
                <div className="flex justify-around w-1/5">
                    <Link to={`/decks`} className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded">Dashboard</Link>
                </div>
            </div>
            <div className='flex w-5/6'>
                <div className='w-1/3'>
                    <form onSubmit={submitHandler} className='flex flex-col justify-center items-center w-full text-center'>
                        <div className='flex flex-col justify-center items-center w-3/4'>
                            <label htmlFor="name" className="text-xl text-amber-500 mb-5 "> Deck Name </label>
                            <input type="text" id='name' value={name} onChange={handleName} className=' w-3/4 p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500' />
                            {formErrors.name ? <p className='text-red-400'>{formErrors.name}</p> : null}
                        </div>
                        <div className='flex flex-col justify-center items-center w-full'>
                            <label htmlFor="details" className="text-xl text-amber-500 mb-5 "> Deck Details </label>
                            <textarea value={details} id='details' onChange={handleDetails} className=' w-3/4 p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500' />
                            {formErrors.details ? <p className='text-red-400'>{formErrors.details}</p> : null}
                        </div>
                        <div className='flex flex-col justify-center items-center w-full'>
                            <label htmlFor="breakdown" className="text-xl text-amber-500 mb-5 "> Deck Breakdown </label>
                            <textarea type="textfield" id='breakdown' value={breakdown} onChange={handleBreakdown} className=' w-3/4 p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500' />
                            {formErrors.breakdown ? <p className='text-red-400'>{formErrors.breakdown}</p> : null}
                        </div>
                        <button type='submit' value="Submit" disabled={!validateForm()} className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded mt-8"> Submit Deck </button>

                    </form>
                </div>
                <div className="flex flex-col justify-start w-1/3">
                    <div id='main_deck'>
                        <h3 className="text-xl text-amber-500">Main Deck - {maindeck.length} cards</h3>
                        <div className="flex flex-wrap p-3 mb-4 border-2 border-pink-600 bg-pink-300 rounded-xl">
                            {maindeck.map((card, index) => (
                                <img src={card.card_images[0].image_url_small} key={index} onClick={() => handleCardSelect(card)} className="w-14" alt="" />
                            ))}
                        </div>
                    </div>
                    <div id='extra_deck'>
                        <h3 className="text-xl text-amber-500">Extra Deck - {extradeck.length} cards</h3>
                        <div className="flex flex-wrap p-3 mb-4 border-2 border-green-600 bg-green-300 rounded-xl">
                            {extradeck.map((card, index) => (
                                <img src={card.card_images[0].image_url_small} key={index} onClick={() => handleCardSelect(card)} className="w-14" alt="" />
                            ))}
                        </div>
                    </div>
                    <div id='side_deck'>
                        <h3 className="text-xl text-amber-500">Side Deck - {sidedeck.length} cards</h3>
                        <div className="flex flex-wrap p-3 mb-4 border-2 border-blue-600 bg-blue-300 rounded-xl">
                            {sidedeck.map((card, index) => (
                                <img src={card.card_images[0].image_url_small} key={index} onClick={() => handleCardSelect(card)} className="w-14" alt="" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-1/3'>
                    <div id='Card Search' className='flex flex-col justify-center items-center'>
                    <h2 className="text-2xl font-bold text-amber-500  mt-7 py-2 px-4  mb-10">Card Search</h2>

                        <CardSearch
                            onNewMaindeck={onNewMaindeck}
                            onNewExtradeck={onNewExtradeck}
                            onNewSidedeck={onNewSidedeck}
                            onDeleteCard={onDeleteCard}
                            handleCardSelect={handleCardSelect}
                            cardView={cardView}
                            cardViewImage={cardViewImage}
                        />
                    </div>
                </div>


            </div>
        </div>
    </div>
    )
}

export default CreateDeck