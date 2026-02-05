const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const helpSchema = new Schema({
    victim:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    helpType:{
        type:String,
        enum: ["Food", "Medical", "Rescue", "Shelter", "Water"],
        required: true
    },

    Quantity: {
        type: Number,
        default: 0
    },

     assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

});

module.exports = mongoose.model("Help", helpSchema);