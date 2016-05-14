$(document).ready(function(){

	
	$(".dropdown-toggle").dropdown();
	
	//Full Calendar
	    $('#calendar').fullCalendar({
	    		    lang: 'it',
	    header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
	    },
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
	

});