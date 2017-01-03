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
            newHtml.push('<div class = "note_div container"><div class="row"><div class="col-xs-2">'+ (i+1) +'</div><div class="col-xs-4"><h4>'+ arrayOfNotes[i].title+'</h4></div><div class="col-xs-6">'+ arrayOfNotes[i].body +'</div></div></div>');
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


function writeNote(){
    var title = $('#title').val();

    var body = $('#body').val();

    $.post("write",{
        "title":title,
        "body":body 
    }, function(data){

        console.log(data);
        if(data.n = 1 || data.ok ==1){
            console.log("added");
        }
    },"json").fail(function(jqXHR,textStatus,errorThrown){
          //alert('woops' + textStatus + errorThrown);
          //$(".all_notes_div").text(errorThrown);
          console.log(errorThrown); 
      });

}
