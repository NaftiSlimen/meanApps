const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameControllers.js");
const publisherController = require("../controllers/publisherController.js");
const reviewController = require("../controllers/reviewController.js");
router.route("/api/games")
    .get(gameController.showAll)
    .post(gameController.addGame)

router.route("/api/games/:gameID")
    .get(gameController.showOne)
    .delete(gameController.deleteByID)
    .put(gameController.fullyUpdateGame)
    .patch(gameController.partiallyUpdateGame);
router.route("/api/games/:gameID/publisher")
    .post(publisherController.addPublisher)
    .get(publisherController.showPublisher)
    //.put(publisherController.fullyUpdatePublisher)
    .patch(publisherController.partiallyUpdatePublisher)
    .delete(publisherController.deletePublisher);
router.route("/api/games/:gameID/reviews")
    .post(reviewController.addreview)
    .get(reviewController.showreviews);
    //.put(reviewController.fullyUpdatePublisher)
    //.patch(reviewController.partiallyUpdatePublisher);
    router.route("/api/games/:gameID/reviews/:reviewID")
    .delete(reviewController.deleteReview)
    .get(reviewController.showOneReview)
    .put(reviewController.fullyUpdatereview)
    .patch(reviewController.partiallyUpdatereview);
module.exports = router;