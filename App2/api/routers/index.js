const express=require("express");
const router=express.Router();
const gameController=require("../controllers/gameControllers.js");
const publisherController=require("../controllers/publisherController.js");
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
    .patch(publisherController.partiallyUpdatePublisher);
module.exports=router;