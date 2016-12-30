const express = require('express');
const bodyParser = require('body-parser');


var app = express();

//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


var connect = require('./db/db').connect;
var readAllNotes = require('./db/db').readAllNotes;
var insertNote = require('./db/db').insertNote;
var connectToWrite = require('./db/db').connectToWrite;





//insert();


//================================== GET request to read all the notes=================================================//
app.get('/readall',function(req,res){

    //connect().then(function(db){
    connectToWrite({}).then(function(obj){
    //var db = obj.db;    
    //console.log(db);
    readAllNotes(obj).then(function(obj){
        var db = obj.db;
        var doc = obj.doc;
         console.log("doc is thisssssssssssssssssssssssssssssssssssssssssssssssssssssss");
                console.log(`${doc}`);
               
         console.log("resolving after readAllNotes");
        res.send(doc);
        db.close();
    }).catch(function(err){
         console.log("rejecting after readAllNotes");
        console.log(err);
        res.send(500,{error:err});
        //db.close();
    });
}).catch(
    function(err){
        console.log(err);
    }
);

});

//======================================== POST request to write the note ==========================================//

app.post('/write',function(req,res){

    var title= "first note";
    var body = "first note body";
    var obj = {
        "title":title,
        "body":body
    };

    connectToWrite(obj).then(function(obj){
       //console.log(`the title and the body are ${title} and ${body}`);
        //insertNote(db,title,body).then(function(result){
            //insertNote(obj).then(function(result){
                insertNote(obj).then(function(obj){
                    var db = obj.db;
                    var result = obj.result;
             console.log(`the title and the body are ${title} and ${body}`);
            console.log("after inserting the note");
            console.log(result);
            db.close();
        }).catch(function(err){
            console.log(err);
        });
    }).catch(function(err){
        console.log(err);
    });



});

app.listen(3000);







