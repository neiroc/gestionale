$(document).ready(function(){

	var upUs;
	
	upUser();
	$(".dropdown-toggle").dropdown();
	
	//Full Calendar
	    $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyBQ34QWTgrT3ZGrwB65VTlR35lsuaNvHXo',
        events: {
            googleCalendarId: 'm5dg1m8lb635cmvarnhn995ieo@group.calendar.google.com'
        },
        header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			editable: true,
    });
	/*
	 $("#anag").click(function(e) {
	 	e.preventDefault();

        $.ajax({
            url : "./anag.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });        
    });
    
     $("#off").click(function(e) {
	 	e.preventDefault();

        $.ajax({
            url : "./offerte.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });        
    });
    
    $("#comm").click(function(e) {
	 	e.preventDefault();

        $.ajax({
            url : "./commesse.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });        
    });
    
    $("#reports").click(function(e) {
	 	//e.preventDefault();
	 	//e.preventDefault();
                $("#cont").load("./reports.html");
        /*$.ajax({
            url : "./reports.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
            }
        });       
    });*/
   
  $('.nav-sidebar li a').click(function() {
      $('.nav-sidebar li').removeClass();
      $(this).parent().addClass("active");
  });
  
    //aggiorna l'user in navbar
function upUser(){
	upUs=$.cookie('nome');
	$('#navuser1').html('<span class="glyphicon glyphicon-user"></span> ' + upUs);
}
	
	
	
});