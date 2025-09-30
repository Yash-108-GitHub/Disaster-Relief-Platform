const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema ({
    requester : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    waterCoverage :{
        type : String,
        required: true
    },
    victimCount :{
        type : Number,
        required: true
    },
    firePresence :{
        type: String, // true = Yes, false = No
        enum : ["Yes" , "No"],
        required: true
    },
    damageLevel :{
        type:String,
        enum: ["low", "moderate", "high"],
        required: true
    },
    location:{
        type: String,
        required: true
    },
    image :{
        type:String 
    },
    resourcesNeeded :{
        food: { type: String, enum: ["Yes", "No"], default: "No" },
        water: { type: String, enum: ["Yes", "No"], default: "No" },
        shelter: { type: String, enum: ["Yes", "No"], default: "No" },
        medical: { type: String, enum: ["Yes", "No"], default: "No" },
        rescue: { type: String, enum: ["Yes", "No"], default: "No" }
    },
    status :{
        type: String,
        enum: ["pending", "in-progress", "fulfilled", "cancelled"],
        default: "pending"
    }
});

module.exports = mongoose.model("Requests", requestSchema);