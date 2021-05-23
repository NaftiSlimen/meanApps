const express=require("express");
const router=express.Router();
const gameController=require("../controllers/gameControllers.js");
router.route("/api/games")
    .get(gameController.showAll)
    .post(gameController.addGame)
    
router.route("/api/games/:gameID")
    .get(gameController.showOne)
    .delete(gameController.deleteByID)
    .put(gameController.fullyUpdateGame)
    .patch(gameController.partiallyUpdateGame);
module.exports=router;