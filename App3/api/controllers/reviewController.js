const mongoose = require("mongoose");
const gamesdb = mongoose.model("meanGamesGeo");
const addreview = function (req, res) {
    if (req.body.name && req.body.review && !isNaN(req.body.year)) {
        const gameId = req.params.gameID;
        revName = req.body.name;
        revContent = req.body.review;
        revDate = parseInt(req.body.year);

        gamesdb.findOneAndUpdate(
            { _id: gameId },
            { $push: { reviews: { "name": revName, "review": revContent, "date": revDate } } },
            function (err, game) {

                if (err) {
                    console.log(err);
                } else {
                    console.log(game);
                }

            });
        res.status(200).json({ "message": "review added" });
    }

    res.status(400).json({ "message": "error" });
}
const showreviews = function (req, res) {
    const gameId = req.params.gameID;
    const response = { status: 200 };
    gamesdb.findById(gameId).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (game) {
            if (game.reviews) {
                response.status = 200;
                response.message = game.reviews;
            }
            else {
                response.status = 404;
                response.message = { "messgae": "reviews not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "game not found" };
        }
        res.status(response.status).json(response.message);
    });
}
const showOneReview = function (req, res) {
    const gameId = req.params.gameID;
    const reviewId = req.params.reviewID;
    const response = { status: 200 };
    gamesdb.findById(gameId).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (game) {
            if (game.reviews.id(reviewId)) {
                response.status = 200;
                response.message = game.reviews.id(reviewId);
            }
            else {
                response.status = 404;
                response.message = { "messgae": "reviews not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "game not found" };
        }
        res.status(response.status).json(response.message);
    });
}
const deleteReview = function (req, res) {
    const gameId = req.params.gameID;
    const reviewId = req.params.reviewID;
    const response = { status: 200 };
    gamesdb.findById(gameId).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (game) {
            if (game.reviews.id(reviewId)) {
                game.reviews.remove(reviewId);
                response.status = 200;
                response.message = { "messgae": "reviews removed" };
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
            }
            else {
                response.status = 404;
                response.message = { "messgae": "reviews not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "game not found" };
        }
        res.status(response.status).json(response.message);
    });
}
const fullyUpdatereview = function (req, res) {
    const gameId = req.params.gameID;
    const reviewId = req.params.reviewID;
    const response = { status: 200 };
    gamesdb.findById(gameId).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (game) {
            if (game.reviews.id(reviewId)) {
                if (req.body.name && req.body.review && !isNaN(req.body.date)) {
                    game.reviews.id(reviewId).name = req.body.name;
                    game.reviews.id(reviewId).review = req.body.review;
                    game.reviews.id(reviewId).date = req.body.date;
                    response.status = 200;
                    response.message = { "message": "reviews removed" };
                    game.save(function (err, updatedGame) {
                        if (err) {
                            response.status = 500;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = { "message": "reviews updated" };
                        }
                    })
                } else {
                    response.status = 400;
                    response.message = { "message": "error updating" };
                }

            }
            else {
                response.status = 404;
                response.message = { "messgae": "review not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "game not found" };
        }
        res.status(response.status).json(response.message);
    });
}
const partiallyUpdatereview = function (req, res) {
    const gameId = req.params.gameID;
    const reviewId = req.params.reviewID;
    const response = { status: 200 };
    gamesdb.findById(gameId).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (game) {
            if (game.reviews.id(reviewId)) {
                if (req.body.name || req.body.review || !isNaN(req.body.date)) {
                    if (req.body.name) game.reviews.id(reviewId).name = req.body.name;
                    if (req.body.review) game.reviews.id(reviewId).review = req.body.review;
                    if (!isNaN(req.body.date))  game.reviews.id(reviewId).date = req.body.date;
                    response.status = 200;
                    response.message = { "message": "reviews removed" };
                    game.save(function (err, updatedGame) {
                        if (err) {
                            response.status = 500;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = { "message": "reviews updated" };
                        }
                    })
                } else {
                    response.status = 400;
                    response.message = { "message": "error updating" };
                }

            }
            else {
                response.status = 404;
                response.message = { "messgae": "review not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "game not found" };
        }
        res.status(response.status).json(response.message);
    });
}
module.exports = {
    addreview: addreview,
    showreviews: showreviews,
    showOneReview: showOneReview,
    deleteReview: deleteReview,
    fullyUpdatereview: fullyUpdatereview,
    partiallyUpdatereview: partiallyUpdatereview
}