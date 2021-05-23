const express=require("express");
const router=express.Router();
const gameController=require("../controllers/gameControllers.js");
router.route("/api/games").get(gameController.showAll)
    .post(gameController.addGame)
    .;
router.route("/api/games/:gameID").get(gameController.showOne);
module.exports=router;