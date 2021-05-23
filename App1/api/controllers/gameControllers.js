const { request } = require("express");
const mongoose=require("mongoose");
const gamesdb=mongoose.model("meanGamesGeo");
const showOne=function(req,res){
    const gameId= req.params.gameID;
    gamesdb.findById(gameId).exec(function(err,  games){
        if(err) res.status(500).json("error" + err);
        else if (games){
            res.status(200).json(games);
        }else{
        res.status(200).json("game not found");}
    });
}
const showAll=function(req,res){
    var offset=0;
    var count=5;
    if (req.query && req.query.offset && req.query.count){
        offset=parseInt(req.query.offset);
        count=parseInt(req.query.count);
    }
  
    gamesdb.find().skip(offset).limit(count).exec(function(err,  games){
        console.log("Found  games", games.length);
        res.status(200).json(games);
    });
}
const addGame=function(req,res){
    gamesdb.create({
        title: req.body.title,
        year: parseInt(req.body.year),
        minPlayers: parseInt(req.body.minPlayers), 
        maxPlayers: parseInt(req.body.maxPlayers),
        price: parseFloat(req.body.price),
        designer: req.body.designer,
        publisher: req.body.publisher,
        rate: parseInt(req.body.rate)}
        ,function(err,game){
            if (err) {console.log("Error creating games");
            res.status(400).json(err);} 
            else {console.log("Game created", game);
            res.status(201).json(game);}
        });


}

const deleteByID = function(req,res){
    const gameID=req.params.gameID;
    console.log("1");
    gamesdb.findByIdAndDelete(gameID).exec(function(err,deletedGame){
        console.log("2");
        const response= {status: 204,
        message:"game deleted"};
        if (err) {
            console.log("3");
            console.log("Error finding game");
            response.status=  500;
            response.message=  err;} 
        else if(!deletedGame) {
            console.log("4");
            response.status=  404;
            response.message=  {"message" : "Game ID not found"};
        }
        res.status(response.status).json(response.message);}
    );
}
module.exports={
    showAll:showAll,
    showOne:showOne,
    addGame:addGame,
    deleteByID:deleteByID
};