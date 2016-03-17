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
	
	 $("#anag").click(function() {
	 	
        $.ajax({
            url : "./anag.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });        
    });
    
     $("#off").click(function() {
	 	
        $.ajax({
            url : "./offerte.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });        
    });
    
    $("#comm").click(function() {
	 	
        $.ajax({
            url : "./commesse.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });        
    });
    
    $("#reports").click(function() {
	 	
        $.ajax({
            url : "./reports.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });        
    });
    
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