var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/notesapp';
var collectionName = 'notes';




//===========================Connect to the database============================================//
var connect = function(obj){
    var p1 = new Promise(function(resolve,reject){
        MongoClient.connect(url).then(function(db){
           
            obj.db = db;
            //resolve(db,title,body);
            resolve(obj);
        }).catch(function(err){
             console.log("rejecting from mongoclient connect");
        reject(err);
        });
    });

    return p1;
};



//===========================Read notes from the database============================================//
var readAllNotes = function(obj){

    var p1 = new Promise(function(resolve,reject){
        var db = obj.db;
        //var cursor = db.collection('restaurants').find();
        //cursor.each().
        var collection = db.collection(collectionName);
        
        collection.find({}).toArray(function(err,docsArray){
            if(err){
                reject(err);
            }
            else{
                //console.log(docsArray);
                obj.docsArray = docsArray;
                resolve(obj);
            }
        });
    });
    
    return p1;
};


//===========================Insert the note to the database============================================//


var insertNote = function(obj){    
    var title = obj.title;
    var body = obj.body;
    var db = obj.db;
    var p1 = new Promise(function(resolve,reject){
        db.collection(collectionName).insertOne({
            "title":title,
            "body":body
        }, function(err,result){
            if(err){
                reject(err);
            }
            else{
                console.log(`this is the log when the data is inserted` );

                var obj = {
                    "result":result,
                    "db":db
                };
                //resolve(result);
                resolve(obj);
            }
        });
    });

    return p1;
};

//===========================Delete the note from the database===========================================//

var deleteNote = function(obj){
    var db = obj.db;
    var title = obj.title;
    var body = obj.body;

    var p1 = new Promise(function(resolve,reject){
        db.collection(collectionName).deleteOne({"title":title,"body":body}, function(err,result){
            if(err){
                reject(err);
            }
            else{
                obj.result = result;
                resolve(obj);
            }
        })

    });

    return p1;
};


module.exports = {connect, readAllNotes,insertNote,deleteNote};