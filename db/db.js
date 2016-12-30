var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/notesapp';
var collectionName = 'notes';


// //===========================Connect to the database to read============================================//
// var connect = function(){
//     var p1 = new Promise(function(resolve,reject){
//         MongoClient.connect(url).then(function(db){
//             console.log("resolving from mongoclient connect");
//             resolve(db);
//         }).catch(function(err){
//              console.log("rejecting from mongoclient connect");
//         reject(err);
//         });
//     });

//     return p1;
// };


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
        var cursor = collection.find({});
        cursor.each(function(err,doc){
            if(err){
                reject(err);
            }
            else{
                obj.doc = doc;
                resolve(obj);
            }
        });
        
    });
    
    return p1;
};


//===========================Insert the note to the database============================================//

//var insertNote = function(db,title,body){
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






var insertDocument = function(db, callback) {
   db.collection(collectionName).insertOne( {
      "title":"a",
      "body":"b"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};




var insert =function(){

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
};











module.exports = {connect, readAllNotes,insertNote};