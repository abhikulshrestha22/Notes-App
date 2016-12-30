const express = require('express');
const bodyParser = require('body-parser');


var app = express();

//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


var connect = require('./db/db').connect;
var readAllNotes = require('./db/db').readAllNotes;
var insert = require('./db/db').insert;



//insert();



app.get('/readall',function(req,res){

    connect().then(function(db){

    //console.log(db);
    readAllNotes(db).then(function(data){
         console.log("resolving after readAllNotes");
        res.send(data);
    }).catch(function(err){
         console.log("rejecting after readAllNotes");
        console.log(err);
        res.send(500,{error:err});
    });


}).catch(
    function(err){
        console.log(err);
    }
);

})

app.listen(3000);







