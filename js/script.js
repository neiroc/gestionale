$(document).ready(function(){
	
	   $('#calendar').fullCalendar({
        // put your options and callbacks here
    })
	
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
    
        
    $('.nav li a').click(function() {
      $('.nav li').removeClass();
      $(this).parent().addClass("active");
        
        });
    
    
	
	
	
});