const mongoose = require("mongoose");
const gamesdb = mongoose.model("meanGamesGeo");

const addPublisher = function (req, res) {
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
        if (response.status != 204) { res.status(response.status).json(response.message); }
        else {
            console.log("adding");
            if (req.body.name && req.body.country) {

                game.publisher = {};
                console.log("before" + game.publisher);
                a = req.body.name;
                b = req.body.country;
                game.publisher = { "name": a, "country": b };
                console.log(game.publisher);
            }
            game.save(function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);


            });
        }
    });



}


const showPublisher = function (req, res) {
    const gameId = req.params.gameID;
    const response = { status: 200 };
    gamesdb.findById(gameId).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (game) {
            if (game.publisher) {
                response.status = 200;
                response.message = game.publisher;
            }
            else {
                response.status = 404;
                response.message = { "messgae": "publisher not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "game not found" };
        }
        res.status(response.status).json(response.message);
    });



}


const deletePublisher = function (req, res) {
    const gameId = req.params.gameID;
    gamesdb.findById(gameId).exec(function (err, game) {
        const response = { status: 200 };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!game.publisher) {
            response.status = 404;
            response.message = { "message": "Publisher not found" };
        }
        else if (game) {
            game.publisher.remove();
            game.save(function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                else {
                    response.status = 200;
                    response.message = { "message": "publisher deleted" };
                }
            })


        } else {
            response.status = 200;
            response.message = { "message": "game not found" };
        }
        res.status(response.status).json(response.message);
    });
}


const partiallyUpdatePublisher = function (req, res) {
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
        if (response.status != 204) { res.status(response.status).json(response.message); }
        else {
            console.log("adding");
            if (req.body.name || req.body.country) {

              
                if (req.body.name) game.publisher.name = req.body.name;
                if (req.body.country) game.publisher.country = req.body.country;

                console.log(game.publisher);
            }
            game.save(function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);


            });
        }
    });



}



module.exports = {
    addPublisher: addPublisher,
    showPublisher: showPublisher,
    deletePublisher: deletePublisher,
    partiallyUpdatePublisher: partiallyUpdatePublisher
}