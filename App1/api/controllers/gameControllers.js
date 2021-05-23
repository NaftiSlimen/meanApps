const { request } = require("express");
const mongoose = require("mongoose");
const gamesdb = mongoose.model("meanGamesGeo");
const showOne = function (req, res) {
    const gameId = req.params.gameID;
    gamesdb.findById(gameId).exec(function (err, game) {
        if (err) res.status(500).json("error" + err);
        else if (game) {
            res.status(200).json(game);
        } else {
            res.status(200).json("game not found");
        }
    });
}
const showAll = function (req, res) {
    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset && req.query.count) {
        offset = parseInt(req.query.offset);
        count = parseInt(req.query.count);
    }

    gamesdb.find().skip(offset).limit(count).exec(function (err, games) {
        console.log("Found  games", games.length);
        res.status(200).json(games);
    });
}
const addGame = function (req, res) {
    gamesdb.create({
        title: req.body.title,
        year: parseInt(req.body.year),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        price: parseFloat(req.body.price),
        designer: req.body.designer,
        publisher: req.body.publisher,
        rate: parseInt(req.body.rate)
    }
        , function (err, game) {
            if (err) {
                console.log("Error creating games");
                res.status(400).json(err);
            }
            else {
                console.log("Game created", game);
                res.status(201).json(game);
            }
        });


}
const fullyUpdateGame = function (req, res) {
    console.log("yo");
    const gameID = req.params.gameID;
    gamesdb.findById(gameID).exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!game) {
            response.status = 404;
            response.message = { "message": "Game not found" };
        }
        if (response.status != 204) {res.status(response.status).json(response.message);}
        else {
                game.title = req.body.title;
                game.year = parseInt(req.body.year);
                game.minPlayers = parseInt(req.body.minPlayers);
                game.maxPlayers = parseInt(req.body.maxPlayers);
                game.price = parseFloat(req.body.price);
                game.designer = req.body.designer;
                game.publisher = req.body.publisher;
                game.rate = parseInt(req.body.rate);
                game.save(function(err,updatedGame){
                    if (err) {
                        response.status=500;
                        response.message=err;}
                res.status(response.status).json(response.message);


                });
        }
    });
}

const partiallyUpdateGame = function (req, res) {
    console.log("yo");
    const gameID = req.params.gameID;
    gamesdb.findById(gameID).exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!game) {
            response.status = 404;
            response.message = { "message": "Game not found" };
        }
        if (response.status != 204) {res.status(response.status).json(response.message);}
        else {
                
                if (req.body.title) game.title = req.body.title;
                if (req.body.year) game.year = parseInt(req.body.year);
                if (req.body.minPlayers) game.minPlayers = parseInt(req.body.minPlayers);
                if (req.body.maxPlayers) game.maxPlayers = parseInt(req.body.maxPlayers);
                if (req.body.price) game.price = parseFloat(req.body.price);
                if (req.body.designer) game.designer = req.body.designer;
                if (req.body.publisher) game.publisher = req.body.publisher;
                if (req.body.rate) game.rate = parseInt(req.body.rate);
                game.save(function(err,updatedGame){
                    if (err) {
                        response.status=500;
                        response.message=err;}
                res.status(response.status).json(response.message);


                });
        }
    });
}
const deleteByID = function (req, res) {
    const gameID = req.params.gameID;
    gamesdb.findByIdAndDelete(gameID).exec(function (err, deletedGame) {
        const response = {
            status: 204,
            message: "game deleted"
        };
        if (err) {

            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        else if (!deletedGame) {

            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        res.status(response.status).json(response.message);
    }
    );
}
module.exports = {
    showAll: showAll,
    showOne: showOne,
    addGame: addGame,
    deleteByID: deleteByID,
    fullyUpdateGame: fullyUpdateGame,
    partiallyUpdateGame:partiallyUpdateGame
};