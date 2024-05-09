import { Router } from "express";
import {createDeck, getAllDecks, getOneDeck, updateOneDeck, deleteOneDeck} from "../controllers/deck.controller.js";


const router = Router();

router.route("/decks/:id")
    .get(getOneDeck)
    .put(updateOneDeck)
    .delete(deleteOneDeck)

router.route("/decks")
    .get(getAllDecks)

router.route("/decks/new")
    .post(createDeck)


export default router;