const mongoose = require("mongoose");
const studentsdb = mongoose.model("SchoolDB");

const showAll = function (req, res) {
    const studentID = req.params.studentId;
    studentsdb.findOne({ _id: studentID }, { '_id': false }).select("Adresses").exec(function (err, students) {
        console.log("Found  adresses ", students.Adresses.length);
        res.status(200).json(students);
    });
}
const showOneByID = function (req, res) {
    const studentID = req.params.studentId;
    const adressId = req.params.adressID;
    studentsdb.findOne({ _id: studentID }, { '_id': false }).select("Adresses")
        .exec(function (err, students) {
            console.log("Found  adress at zip ", adressId);
            const c = students.Adresses.id(adressId);
            console.log(c);
            res.status(200).json(c);
        });
}

const deleteAdress = function (req, res) {
    const studentID = req.params.studentId;
    const adressId = req.params.adressID;
    const response = { status: 200 };
    studentsdb.findById(studentID).exec(function (err, student) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (student) {
            if (student.Adresses.id(adressId)) {
                student.Adresses.remove(adressId);
                response.status = 200;
                response.message = { "message": "adress with ID "+adressId+" was removed" };
                student.save(function (err, updatedGame) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                        console.log(err);
                    }
                    else {
                        response.status = 200;
                        response.message = { "message": "adress deleted" };
                    }
                })
            }
            else {
                response.status = 404;
                response.message = { "message": "adress not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "student not found" };
        }
        res.status(response.status).json(response.message);
    });
}



const addAdress = function (req, res) {

    const studentID = req.params.studentId;
    const response = { status: 200 };
    if (req.body.street && req.body.city && req.body.state && !isNaN(req.body.zip)) {
        console.log("inside");
        studentsdb.findOneAndUpdate(
            { _id: studentID },
            { $push: { Adresses: { "street":req.body.street, "city": req.body.city, "state": req.body.state, "zip": parseInt((req.body.zip)) } } },
            function (err, game) {

                if (err) {
                    console.log(err);
                } else {
                    console.log(game);
                }

            });
    } else {
        response.status=500;
        response.message={ "message": "error adding adress" };
    }
    res.status(response.status).json(response.message);
}

const partiallyUpdateAdress=function(req,res){
    const studentID = req.params.studentId;
    const adressId = req.params.adressID;
    const response = { status: 200 };
    studentsdb.findById(studentID).exec(function (err, student) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (student) {
            if (student.Adresses.id(adressId)) {
                if(req.body.street || req.body.city || req.body.state || !isNaN(req.body.zip)){
                    if (req.body.street) student.Adresses.id(adressId).street=req.body.street;
                    if (req.body.city) student.Adresses.id(adressId).city=req.body.city;
                    if (req.body.state) student.Adresses.id(adressId).state=req.body.state;
                    if (!isNaN(req.body.zip)) student.Adresses.id(adressId).zip=parseInt((req.body.zip));
                    response.status = 200;
                    response.message = { "message": "adress with ID "+adressId+" was modified" };
                    student.save(function (err, updatedGame) {
                        if (err) {
                            response.status = 500;
                            response.message = err;
                            console.log(err);
                        }
                        else {
                            response.status = 200;
                            response.message = { "message": "adress modified" };
                        }
                    })
                }
            }
            else {
                response.status = 404;
                response.message = { "message": "adress not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "student not found" };
        }
        res.status(response.status).json(response.message);
    });
}

const fullyUpdateAdress=function(req,res){
    const studentID = req.params.studentId;
    const adressId = req.params.adressID;
    const response = { status: 200 };
    studentsdb.findById(studentID).exec(function (err, student) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (student) {
            if (student.Adresses.id(adressId)&&req.body.street && req.body.city && req.body.state && !isNaN(req.body.zip)) {
                student.Adresses.id(adressId).street=req.body.street;
                student.Adresses.id(adressId).city=req.body.city;
                student.Adresses.id(adressId).state=req.body.state;
                student.Adresses.id(adressId).zip=parseInt((req.body.zip));
                response.status = 200;
                response.message = { "message": "adress with ID "+adressId+" was modified" };
                student.save(function (err, updatedGame) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                        console.log(err);
                    }
                    else {
                        response.status = 200;
                        response.message = { "message": "adress modified" };
                    }
                })
            }
            else {
                response.status = 404;
                response.message = { "message": "adress not found" };
            }
        } else {
            response.status = 404;
            response.message = { "message": "student not found" };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    showAll: showAll,
    showOneByID: showOneByID,
    addAdress: addAdress,
    deleteAdress:deleteAdress,
    partiallyUpdateAdress:partiallyUpdateAdress,
    fullyUpdateAdress:fullyUpdateAdress
};
