$(document).ready(function(){
	
	 $("#anag").click(function() {
	 	
        $.ajax({
            url : "./anag.html",
            dataType: "html",
            success : function (data) {
                $("#cont").html(data);
                
            }
            
        });
        
    }); 
    
    
	
	
	
});