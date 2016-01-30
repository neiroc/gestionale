$(document).ready(function(){
	
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
            url : "./commesse.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });        
    });
    
        
    $('.nav li a').click(function() {
      $('.nav li').removeClass();
      $(this).parent().addClass("active");
        
        });
    
    
	
	
	
});