const { request } = require("express");
const mongoose=require("mongoose");
const gamesdb=mongoose.model("meanGamesGeo");
const showOne=function(req,res){
    const gameId= req.params.gameID;
    gamesdb.findById(gameId).exec(function(err,  games){
        console.log("Found  games", games.length);
        res.status(200).json(games);
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
module.exports={
    showAll:showAll,
    showOne:showOne
};