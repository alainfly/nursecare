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

);