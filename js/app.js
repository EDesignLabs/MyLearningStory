$(document).ready(function() {  // Handler for .ready() called.
    //Resets
    var currentIdx = '';
    var submitEntries = "";    
    $('#tags_3').click(function(){
        $(this).focus().val('');
    });
    
    var serverPayload = {
        name: "",
        research: [],
        read: [],
        wrote: [],
        collaborate: [],
        plan: [],
        created: []
    };
    
    $("#tag-input").hide(); //Initally hide tags


    //Navigation bar animation
    var navDuration = 100; 
    var navJumpHeight = "0.45em";
    $('#overview ul li').hover(function() {
        $(this).animate({ top : "-="+navJumpHeight }, navDuration);            
        }, 
    function() {
        $(this).animate({ top : "15px" }, navDuration);
    });
    
    var sampleTags = ['Vampires','Shackleton','Shakespeare','Hamlet']; //Static values for now

    //Setup tags
    $('#tags_3').tagit({
        availableTags: sampleTags,
        allowSpaces: true
    });


    //Append tags to navigation itesm and prepare tags for server submission
    $('input#submit1').click(function() {
        var tags = $('#tags_3').tagit("assignedTags");    
        var markup = '<ul class="section-tags">';
        var recursiveEncoded = $.param(submitEntries);
        var el = String(currentIdx);
        el = el.replace("nav-", "");
        console.log(el);
        var moodMarkup = "<select class=\"mood-picker\"><option>(Choose Mood)</option><option value=\"1\">Excited</option><option value=\"2\">Neutral</option><option value=\"3\">Confused</option><option value=\"4\">Upset</option><option value=\"5\">Bored</option></select></br>";
        $.each(tags, function(index, value){
            markup += '<li>' + moodMarkup + value + '</li>'
//            var entry = { val:value, mood:3};
//            serverPayload[el].push(entry);
            //submitEntries += currentIdx+"="+value+",";
        });
        markup += '</ul>';
        $('#'+currentIdx).append(markup);
    });


    //Tagging form setup 
    $('#overview ul li').click(function(){
        $("#tags_3").tagit("removeAll");
        $('#today-i-title').text('Today I ');
        $('#today-i-title').append($(this).text() + "...");	    
        $('#tag-input').animate(
            {"opacity": "show"}, 
            { "duration": "slow"
        })
        currentIdx = $(this).attr('id');
    });



    //Submission event
    $('#continue-nav').submit(function() {
        if($("#name-entry").val() === ""){
            alert("Please enter your name.");
            return false;
        }
        serverPayload["name"] = $("#name-entry").val();
        //Where the new payload building code is going to go
        $("#overview ul li ul li").each(function(idx, li) {

            var items = $(li + "select.mood-picker option:selected");   
            var task  =  $(li).clone()    //clone the element
                             .children() //select all the children
                             .remove()   //remove all the children
                             .end()  //again go back to selected element
                             .text();    //get the text of element);
                             
            var behavior = $((items).get(idx)).parent().parent().parent().parent().children('.t-bar').attr('id');
            var mood     = $((items).get(idx)).val();
            var entry = { val:task, mood:mood};
            serverPayload[behavior].push(entry);
            console.log(behavior);
            console.log(task);
            console.log(mood);
            
        });
        console.log(serverPayload);
        $.post('../test.php', serverPayload, function(data){
            window.location = "http://www.fragmentedform.com/dtc/dev3/profile2.html";
            console.log(data);
        });
//         console.log(serverPayload);
    //    console.log(submitEntries);
        /*
        $.post('server/dataInput.php', {'myphpvariable[]': submitEntries }, function(data){
            console.log(data);
            // do something with received data!
        });       
        */
        //Return false for now to prevent page from contining. 
        //Will want to 
        return false;
    });
    
});