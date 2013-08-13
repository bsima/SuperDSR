/* TCenter Search */

/* check the input via regex
 * change input name attribute to corresponding value:
 * 
 *    ticketNum     = Tcenter Ticket Number
 *    footprintsNum = Footprints ID
 *    hostname      = Hostname
 *    username      = Username
 *    serial        = Serial Number
*/




$(document).ready(function() {
	console.log("document ready");
    // Regular Expressions
    var ticketNum = /\b\d{5}\b/g; // Tcenter ticket ID - 5-digit number, surrounded by word boundaries
    var footprintsNum = /\b\d{6}\b/g; // Footprints ticket ID - 6-digit number, surrounded by word boundaries
    var hostname = /\b\w+-\d+\b/g; // Hostname - a series of letters, hyphen, a series of numbers, surrounded by word boundaries
    var username = /\b(\w(?=\D)){3}\w{3,4}\b/g; // Username - 3 letters, followed by 3 or 4 word characters, surrounded by word boundaries
    var serial = /\b[A-Z0-9]{7}\b/g; // Serial - a series of 7 uppercase letters and/or digits, surrounded by word boundaries


    console.log("vars created");

    $('input#tcSearch').on('keyup', function() { 

    	var input = $(this).val();

    	console.log("input changed");

		if ( input.match(ticketNum) ) {
			$("#tcs-tcenterID").addClass('label-success');
			$('input#tcSearch').attr('name', 'ticketNum');

		} else {
			$("#tcs-tcenterID").attr('class', 'label label-default');
		};

		if ( input.match(footprintsNum) ) {
			$("#tcs-footprintsID").addClass('label-success');
			$('input#tcSearch').attr('name', 'footprintsNum');
		} else {
			$("#tcs-footprintsID").attr('class', 'label label-default');
		};

		if ( input.match(hostname) ) {
			$("#tcs-hostname").addClass('label-success');
			$('input#tcSearch').attr('name', 'hostname');
		} else {
			$("#tcs-hostname").attr('class', 'label label-default');
		};

		if ( input.match(username) ) {
			$("#tcs-username").addClass('label-success');
			$('#tcSearch').attr('name', 'username');
			$('#tcs form').attr('action', 'https://apps.rit.edu/~a-tcent/admin/viewUser.php');
		} else {
			$("#tcs-username").attr('class', 'label label-default');
		};

		if ( input.match(serial) ) {
			$("#tcs-serial").addClass('label-success');
			$('input#tcSearch').attr('name', 'serial');
		} else {
			$("#tcs-serial").attr('class', 'label label-default');
		};

    })
});

/* 
 * Keybindings 
 *


* Jump to...
Mousetrap.bind('w', $('a#wiki-link').trigger('click');); // Wiki
Mousetrap.bind('g f', function() { $('#footprints-link').click(); }); // Footprints
Mousetrap.bind('g t', function() { $('#tcenter-link').click(); }); // TCenter
Mousetrap.bind('g c', function() { $('#claws-link').click(); }); // CLAWS
Mousetrap.bind('g m', function() { $('#maps-link').click(); }); // Maps
Mousetrap.bind('g l', function() { $('#ldap-link').click(); }); // LDAP


$('input#tcSearch').attr('name', 'ticketNum');
$('span#tcHint').hide();
$('span#tcStatus').text().replace('','TCenter Ticket ID'); */