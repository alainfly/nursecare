/*  jQuery ready function. Specify a function to execute when the DOM is fully loaded.  */
$(document).ready(

$('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
})

$('#infolistpatient').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});


		
			/*
				date store today date.
				d store today date.
				m store current month.
				y store current year.
			*/

			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();
			
			/*
				Initialize fullCalendar and store into variable.
				Why in variable?
				Because doing so we can use it inside other function.
				In order to modify its option later.
			*/

			
	


);