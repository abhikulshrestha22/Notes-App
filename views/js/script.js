$(document).ready(function(){


    $.get("readall",function (arrayOfNotes) {

        console.log(arrayOfNotes);
        console.log(arrayOfNotes.length);

        var newHtml = [];

        for(var i=arrayOfNotes.length;i>0;i--){
            newHtml.push('<div class = "note_div container"><div class="row"><div class="col-xs-2">'+ (arrayOfNotes.length-i+1) +'</div><div class="col-xs-4"><h4>'+ arrayOfNotes[i-1].title+'</h4></div><div class="col-xs-6">'+ arrayOfNotes[i-1].body +'</div></div></div>');
 
    };


        $(".all_notes_div").html(newHtml.join(""));
        
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
          console.log(errorThrown); 
      });

}
