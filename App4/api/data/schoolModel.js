const mongoose=require("mongoose");
const adressSchema=new mongoose.Schema(
    {
        "street":String,
        "city":String,
        "zip":Number,
        "state":String
    }
);
const gameSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    GPA:{
        type:Number,
        required:true
    },
    Adresses:[adressSchema]
});


mongoose.model("SchoolDB", gameSchema,"Students");

