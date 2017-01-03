$(document).ready(function(){

    readAllNotes();

});


function readAllNotes(){
    $.get("readall",function (arrayOfNotes) {

        console.log(arrayOfNotes);
        console.log(arrayOfNotes.length);

        var newHtml = [];

        for(var i=arrayOfNotes.length;i>0;i--){
            newHtml.push('<div class = "note_div"><div class="row'+ (arrayOfNotes.length-i+1)+'"><div class="col-xs-1">'+ (arrayOfNotes.length-i+1) +'</div><div class="col-xs-3 title_div"><h4>'+ arrayOfNotes[i-1].title+'</h4></div><div class="col-xs-5 body_div">'+ arrayOfNotes[i-1].body +'</div><div class="col-xs-3"><button type="button" class="btn btn-default btn-primary" onclick="delbtnclick(this.id);" id="delbtn'+ (arrayOfNotes.length-i+1) +'">Delete</button></div></div></div>');
 
    };


        $(".all_notes_div").html(newHtml.join(""));
        
      }).fail(function(jqXHR,textStatus,errorThrown){
          //alert('woops' + textStatus + errorThrown);
          $(".all_notes_div").text(errorThrown);
      });
}

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

function delbtnclick(id){

numId = id.replace(/^\D+/g,'');

var i=numId;
var title = $(`.row${i}`).find('.title_div').text();
var body = $(`.row${i}`).find('.body_div').text();

    $.post("delete",{
            "title":title,
            "body":body
        }, function(data){

            console.log(data);
            if(data.n = 1 || data.ok ==1){
                console.log("removed");
                readAllNotes();
            }
        },"json").fail(function(jqXHR,textStatus,errorThrown){
            console.log(errorThrown); 
        });


}
