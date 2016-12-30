var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var connect = function(){
    var p1 = new Promise(function(resolve,reject){
        MongoClient.connect(url).then(function(db){
            console.log("resolving from mongoclient connect");
            resolve(db);
        }).catch(function(err){
             console.log("rejecting from mongoclient connect");
        reject(err);
        });
    });

    return p1;
};

var readAllNotes = function(db){
    var p1 = new Promise(function(resolve,reject){
        //var cursor = db.collection('restaurants').find();
        //cursor.each().
        var collection = db.collection('restaurants');
        var cursor = collection.find({});
        cursor.each(function(err,doc){
            if(err){
                reject(err);
            }
            else{
                resolve(doc);
            }
        });
        
    });
    
    return p1;
};











var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
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











module.exports = {connect, readAllNotes,insert};