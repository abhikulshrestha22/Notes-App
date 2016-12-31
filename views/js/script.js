$(document).ready(function(){

    $.get("readall",function (data,status) {
        alert("Data: " + data + "\nStatus " + status);
      });
});


// 1. in this script try to load the error in the alert 
// the error is when the mongodb server is not connected

// 2. when that error is solved, use mongod.exe to start db and then check to connect