const mongoose=require("mongoose");
const geo=require("geolocation");
/*const publisherSchema=new mongoose.Schema({
    "name":String,
    "location":{
        //type:"Point",
        "coordinates":[Number]
    }
});*/
const gameSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:Number,
    price:Number,
    designers:[String],
    players:{
        type: Number,
        min:1,
        max:10,
    },
    //"publisher":publisherSchema,
    rate:{
        type:Number,
        min:1,
        max:5,
        "default":1
    },
    reviews:[String],
    minAge:Number,
    minPlayers:Number,
    maxPlayers:Number
});

mongoose.model("meanGamesGeo", gameSchema,"games");
