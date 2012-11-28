$(document).ready(function() {  // Handler for .ready() called.

    //Resets
    var currentIdx = '';
    var submitEntries = "";    
    $('#tags_3').click(function(){
        $(this).focus().val('');
    });

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
        $.each(tags, function(index, value){
            markup += '<li>' + "+ " + value + '</li>'
            var entry = { type:currentIdx, val:value};
            submitEntries += currentIdx+"="+value+"&";
        });
        submitEntries += "*";
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
        $.get('server/dataInput.php', {'data' : submitEntries}, function(data){
            window.location = "http://www.fragmentedform.com/dtc/dev1/mood.html";
            console.log(data);
        });
        console.log(submitEntries);
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