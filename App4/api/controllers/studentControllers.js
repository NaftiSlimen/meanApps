
const mongoose=require("mongoose");
const studentsdb=mongoose.model("SchoolDB");
const showOne=function(req,res){
    const studentId= req.params.studentId;
    console.log(studentId);
    studentsdb.findOne({_id:studentId}).exec(function(err,  student){
        console.log("Found  1 student with Id= ", studentId);
        res.status(200).json(student);
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
module.exports={
    showAll:showAll,
    showOne:showOne
};