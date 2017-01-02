$(document).ready(function(){

    // $.get("readall",function (data,status) {
    //     alert("Data: " + data + "\nStatus " + status);
    //   });

    $.get("readall",function (arrayOfNotes) {
        //alert("Data: " + data);
        console.log(arrayOfNotes);
        console.log(arrayOfNotes.length);

        var newHtml = [];

        for(var i=0;i<arrayOfNotes.length;i++){
            newHtml.push('<span><b>' + arrayOfNotes[i].title + '</b></span><br><span>'+ arrayOfNotes[i].body +'</span><br>');
        };

        $(".all_notes_div").html(newHtml.join(""));
        
        // $.each(arrayOfNotes,function(index,value){
        //     $('.all_notes_div').html( $('.element').html() + '<span>' + '2' + '</span>');
        // });


         // $(".all_notes_div").text(data);    

      }).fail(function(jqXHR,textStatus,errorThrown){
          //alert('woops' + textStatus + errorThrown);
          $(".all_notes_div").text(errorThrown);
      });

});


// 2. when that error is solved, use mongod.exe to start db and then check to connect