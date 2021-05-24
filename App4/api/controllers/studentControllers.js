
const mongoose=require("mongoose");
const studentsdb=mongoose.model("SchoolDB");
const showOne=function(req,res){
    const studentId= req.params.studentId;
    
    studentsdb.findOne({_id:studentId}).exec(function(err,  student){
        const response = { status: 200,message:"student updated" };
        if (err) {
            response.status=500;
            response.message=err;
        }
        else if (!student){
            response.status=404;
            response.message={"message":"Student not found"};
        }
        response.message=student;
        res.status(response.status).json(response.message);
    });
}
const showAll=function(req,res){
    var offset=0;
    var count=5;
    if (req.query && req.query.offset && req.query.count){
        offset=parseInt(req.query.offset);
        count=parseInt(req.query.count);
    }
  
    studentsdb.find().skip(offset).limit(count).exec(function(err,  students){
        console.log("Found  students", students.length);
        res.status(200).json(students);
    });
}

const addStudent=function(req,res){
    studentsdb.create({
        name: req.body.name,
        GPA: parseInt(req.body.GPA),
        Adresses: req.body.Adresses
    }
        , function (err, game) {
            if (err) {
                console.log("Error creating games");
                console.log(err);
                res.status(400).json(err);
            }
            else {
                console.log("Game created", game);
                res.status(201).json(game);
            }
        });
}

const deleteStudent=function(req,res){
    const studentId= req.params.studentId;
    const response = { status: 204,message:"student deleted" };
    studentsdb.findByIdAndDelete(studentId).exec(function(err,  deletedStudent){

        if (err) {
            response.status=500;
            response.message=err;
        }
        else if (!deletedStudent) {
            response.status=404;
            response.message={"message":"Student not found"};
        };
        res.status(response.status).json(response.message);
    });
}


const fullyUpdateStudent=function(req,res){
    const response = { status: 200,message:"student fully updated" };
    const studentId= req.params.studentId;
    
    studentsdb.findOne({_id:studentId}).exec(function(err,  student){
        if (err) {
            response.status=500;
            response.message=err;
        }
        else if (!student){
            response.status=404;
            response.message={"message":"Student not found"};
        }
        else{
            if (req.body.name&&req.body.GPA&&req.body.Adresses){
                student.name=req.body.name;
                student.GPA=req.body.GPA;
                student.Adresses=req.body.Adresses;
                student.save(function (err, updatedstudent) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                        console.log(err);
                    }
                    else {
                        response.status = 200;
                        response.message = { "message": "Student fully modified" };
                    }
                })
            }else{
                response.status=400;
                response.message={"message":"Inputs are incorrect/missing"};
            }
        }
        res.status(response.status).json(response.message);
    });
}


const partiallyUpdateStudent=function(req,res){
    const response = { status: 200,message:"student partially updated" };
    const studentId= req.params.studentId;
    
    studentsdb.findOne({_id:studentId}).exec(function(err,  student){
        if (err) {
            response.status=500;
            response.message=err;
        }
        else if (!student){
            response.status=404;
            response.message={"message":"Student not found"};
        }
        else{
            if (req.body.name||req.body.GPA||req.body.Adresses){
                if (req.body.name) student.name=req.body.name;
                if (req.body.GPA) student.GPA=req.body.GPA;
                if (req.body.Adresses) student.Adresses=req.body.Adresses;
                student.save(function (err, updatedstudent) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                        console.log(err);
                    }
                    else {
                        response.status = 200;
                        response.message = { "message": "Student partially modified" };
                    }
                })
            }else{
                response.status=400;
                response.message={"message":"Inputs are incorrect/missing"};
            }
        }
        res.status(response.status).json(response.message);
    });
}

module.exports={
    showAll:showAll,
    showOne:showOne,
    addStudent:addStudent,
    deleteStudent:deleteStudent,
    fullyUpdateStudent:fullyUpdateStudent,
    partiallyUpdateStudent:partiallyUpdateStudent
};