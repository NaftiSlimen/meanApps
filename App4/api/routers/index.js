const express=require("express");
const router=express.Router();
const studentController=require("../controllers/studentControllers.js");
const adressController=require("../controllers/adressControllers");
router.route("/api/students").get(studentController.showAll).post(studentController.addStudent);
router.route("/api/students/:studentId")
    .get(studentController.showOne)
    .delete(studentController.deleteStudent)
    .put(studentController.fullyUpdateStudent)
    .patch(studentController.partiallyUpdateStudent);


router.route("/api/students/:studentId/adresses").get(adressController.showAll).post(adressController.addAdress);
router.route("/api/students/:studentId/adresses/:adressID")
    .get(adressController.showOneByID)
    .delete(adressController.deleteAdress)
    .put(adressController.fullyUpdateAdress)
    .patch(adressController.partiallyUpdateAdress);
module.exports=router;