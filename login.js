$(document).ready(function() {
    /*
    var socket = io.connect('http://10.21.246.247:3002');
    socket.on('connect', function(){ alert("Connected!"); });
    socket.on('event', function(data){ alert("New data: " + data); });
    socket.on('disconnect', function(){ alert("Disconnected"); });
    socket.send("Test!");
    */

    $('#createScreen').hide();
    $('#incorrect').hide();

    $("#creategame").click(function() {
            
       // $( "#joingame" ).hide();
        $( "#mainScreen" ).hide();
        $( "#createScreen" ).fadeIn();
        $( "#gamePin" ).text("Waiting...");
        GetPin();
        //alert("Hello");
    });
    $("#joingame").click(function() {
        PostPin($("#pin").val());
    });
    $("#back").click(function() {
        $( "#mainScreen" ).fadeIn();
        $( "#createScreen" ).hide();
    });
    
    function GetPin() {
        $.get("http://10.21.246.247:3000/create-room/",
        function(data,status){
            $( "#gamePin" ).text(data);
        });
    }
    
    function PostPin(val) {
        $.post("http://10.21.246.247:3000/join-room/",
        {
            pin: val.toLowerCase()
        },
        function(data,status){
            if (data == "not found") {
                $('#incorrect').show();
            } else {
                alert(data);
                $('#incorrect').hide();
                $( "#gamePin" ).text("Waiting...");
                $( "#pin" ).text("");
            }
        });
        
    }
    
});
