/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import axios from 'axios';



const CardSearch = (props) => {
    // eslint-disable-next-line react/prop-types
    const { onNewMaindeck, onNewExtradeck, onNewSidedeck, onDeleteCard, handleCardSelect, cardView, cardViewImage } = props;


    const [searchText, setSearchText] = useState("");
    const [fullCardList, setFullCardList] = useState([]);
    const [targetCardList, setTargetCardList] = useState([]);
    




    useEffect(() => {
        getAllCards();
        console.log(fullCardList[10]);
    }, [])

    useEffect(() => {
        if (searchText != "") {
            setTargetCardList(fullCardList.filter(card => card.name.toLowerCase().includes(searchText.toLowerCase())))
        }
    }, [searchText, fullCardList])



    const getAllCards = () => {
        axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
            .then((res) => {
                console.log(res.data.data);
                setFullCardList(res.data.data);
            })
            .catch((err) => {
                console.log(err)
            })

    }

    

    // const checkIfMonster = () => {
    //     const targetType = cardView.type;
    //     const includesBool = targetType.toLowerCase.includes("monster");
    //     if (includesBool){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }

    const addCardExtra = () => {
        if (
            cardView.frameType === "fusion" ||
            cardView.frameType === "synchro" || 
            cardView.frameType === "xyz" || 
            cardView.frameType === "link" || 
            cardView.frameType === "fusion_pendulum" ||
            cardView.frameType === "synchro_pendulum" ||
            cardView.frameType === "xyz_pendulum") {
            onNewExtradeck(cardView);
            console.log(cardView)
        }
        else {
            return null
        }
    }

    const addCardMain = () => {
        if (
            cardView.frameType === "normal" ||
            cardView.frameType === "effect" || 
            cardView.frameType === "ritual" || 
            cardView.frameType === "spell" || 
            cardView.frameType === "trap" ||
            cardView.frameType === "normal_pendulum" ||
            cardView.frameType === "effect_pendulum" ||
            cardView.frameType === "ritual_pendulum") {
            onNewMaindeck(cardView);
            console.log(cardView)
        }
        else {
            return null
        }
    }

    const addCardSide = () => {
        onNewSidedeck(cardView);
        console.log(cardView)
    }

    const removeCard = () => {
        onDeleteCard(cardView);
    }

    

    // const handleSelect = (e) => {
    //     if (e.target.innerText !== selection && e.target.innerText !== "") {
    //         setSelection(e.target.innerText);
    //     }
    //     setSearchText("");
    // }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
        setTargetCardList(fullCardList.filter(card => card.name.toLowerCase().includes(searchText.toLowerCase())))
    }


    return (
        <>
            <div className=" ml-4 p-4 flex flex-col justify-center items-center">
                <div>
                    <input type="text"
                        placeholder="SEARCH..."
                        onChange={handleSearchChange}
                        value={searchText}
                        className=' w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500'
                    />
                </div>
                <div className=" border-1 border-slate-300 rounded-xl mb-3">
                    <ul className="overflow-y-scroll h-64 mt-3">
                        {targetCardList.map(item => (
                            <li key={item.id}>
                                <div>
                                    <button onClick={() => handleCardSelect(item)} className="bg-transparent hover:bg-amber-500 text-white font-semibold text-sm hover:text-black py-2 px-4 border border-slate-500 hover:border-transparent rounded">{item.name}</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                <div className="flex items-center justify-center">
                    <div >
                        <a href={cardView.ygoprodeck_url} target="_blank" rel="noopener noreferrer" >
                            <img src={cardViewImage} alt="" className="w-48 hover:scale-300 transition ease-in duration-200" />
                        </a>
                    </div>
                    <div className="flex flex-col ">
                        <button onClick={addCardMain} className="bg-pink-500 hover:bg-pink-400 text-black font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded"> Main Deck</button>
                        <button onClick={addCardExtra} className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"> Extra Deck</button>
                        <button onClick={addCardSide} className="bg-blue-500 hover:bg-blue-400 text-black font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"> Side Deck</button>
                        <button onClick={removeCard} className="bg-slate-500 hover:bg-slate-400 text-black font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded">Remove</button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )





}

export default CardSearch