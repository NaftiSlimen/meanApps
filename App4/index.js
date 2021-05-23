require("./api/data/db.js");
var express=require("express");
var app=express();
app.use(express.json());
const path=require("path");

const routes=require("./api/routers");
app.set("port",5000);
app.use(express.static(path.join(__dirname,"public")));

app.use("/",routes);

var server=  app.listen(app.get("port"),  function() {
    var port= server.address().port;
    console.log("Listening  to port "+ port);
});
