import Deck from '../models/deck.model.js';

// create new
async function createDeck(req, res) {
    try {
        const newDeck = await Deck.create(req.body);
        res.json(newDeck);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// Fetch all decks
async function getAllDecks(req, res) {
    try {
        const allDecks = await Deck.find(); 
        res.json(allDecks);
    } catch (error) {
        console.log(error);
        res.status(400).json(error); 
    }
}

// Fetch one deck
async function getOneDeck(req, res) {
    try {
        const targetDeck = await Deck.findById(req.params.id);
        res.json(targetDeck);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// Update a deck
async function updateOneDeck(req, res) {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedDeck);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// Delete a deck
async function deleteOneDeck(req, res) {
    try {
        const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
        res.json(deletedDeck);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}





export {
    createDeck, getAllDecks, getOneDeck, updateOneDeck, deleteOneDeck
};
