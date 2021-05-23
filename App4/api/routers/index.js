const express=require("express");
const router=express.Router();
const studentController=require("../controllers/studentControllers.js");
const adressController=require("../controllers/adressControllers");
router.route("/api/students").get(studentController.showAll);
router.route("/api/students/:studentId").get(studentController.showOne);
router.route("/api/students/:studentId/adresses").get(adressController.showAll).post(adressController.addAdress);
router.route("/api/students/:studentId/adresses/:adressID")
    .get(adressController.showOneByID)
    .delete(adressController.deleteAdress)
    .put(adressController.fullyUpdateAdress)
    .patch(adressController.partiallyUpdateAdress);
module.exports=router;