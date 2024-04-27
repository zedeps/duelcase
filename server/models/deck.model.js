import {model, Schema} from 'mongoose';
const DeckSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required!"],
            minlength: [2, "Names must be at least 2 characters long!"],
            maxlength: [100, "Names must be less than 100 characters long"]
        },
        details: {
            type: String,
            required: [true, "Details are Required!"],
            minlength: [2, "Details must be at least 2 characters long!"],
            maxlength: [2000, "Names must be less than 2000 characters long"]
        },
        breakdown: {
            type: String,
            required: [true, "Breakdown is Required!"],
            minlength: [2, "Breakdown must be at least 2 characters long!"],
            maxlength: [2000, "Breakdown must be less than 2000 characters long"]
        },
        maindeck: {
            type: Array,
            required: [true, "Must have cards in your main deck!"],
            minlength: [40, "Must have at least 40 cards in your main deck!"],
            maxlength: [60, "Cannot have more than 60 cards in your main deck!"]
        },
        extradeck: {
            type: Array,
            minlength: [0, "Must have at least 0 cards in your extra deck!"],
            maxlength: [15, "Cannot have more than 15 cards in your extra deck!"]
        },
        sidedeck: {
            type: Array,
            minlength: [0, "Must have at least 0 cards in your side deck!"],
            maxlength: [15, "Cannot have more than 15 cards in your side deck!"]
        }
    },
    { timestamps: true }
);
const Deck = model("Deck", DeckSchema);
export default Deck;