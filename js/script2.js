$("document").ready(function(){
	
	$("anag").click(function(){
		
	/*var data = {
	"action": "test"
	};
	*/
	
	data = $(this).serialize() + "&" + $.param(data);
	
	$.ajax({
	type: "POST",
	dataType: "json",
	url: "anagrafiche.php", //Relative or absolute path 
	data: data,
	success: function(data) {
	$(".main").html(data);
	);
	
	}
	});
	
	
		
	 $("#ha").click(function() {
	 	
        $.ajax({
            url : "./anagrafiche.html",
            dataType: "html",
            success : function (data) {
                $(".main").html(data);
            
            }
            
        });
        
    }); 
    
    
	
	
	
});