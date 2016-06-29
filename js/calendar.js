$(document).ready(function(){

	    //Full Calendar
	    $('#calendar').fullCalendar({
	    lang: 'it',
	    header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
	    },
		
       events: function (start, end, timezone, callback) {
            $.ajax({

                url: '/gestionale/cgi-bin/calEvents.php',
                type: "GET",
                datatype: 'json',
                success: function (response) {
                	  var doc = $.parseJSON(response);
                    var events = [];
                    if ( doc != undefined && doc.length > 0 ) { 
                    doc.forEach( function( entry ) {
			            events.push({
			            	 //id : entry.id,
			                title: "Operatore : "+ entry.operatore,
			                start: entry.data,
			                description: "Sede : " +entry.sede+"<br>  Ore Lavoro: "+entry.ore_std,
			               // end:   entry.end
			            });
        				 });
    				 }
    				 callback(events);
                },error: function (err) {
                    alert('Error in fetching data');
                }
            });
        },
        eventColor: '#d9edf7',
        eventTextColor: '#31708f',
        eventBorderColor: '#bce8f1',
        eventRender: function(event, element) { 
        element.qtip({
            content: event.description
        });
          
          },  

        
 
    });
	

});