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

	$('#close').focus();

    // Regular Expressions
    var ticketNum = /\b\d{5}\b/g; // Tcenter ticket ID - 5-digit number, surrounded by word boundaries
    var footprintsNum = /\b\d{6}\b/g; // Footprints ticket ID - 6-digit number, surrounded by word boundaries
    var hostname = /\b\w+-\d+\b/g; // Hostname - a series of letters, hyphen, a series of numbers, surrounded by word boundaries
    var username = /\b(\w(?=\D)){3}\w{3,4}\b/g; // Username - 3 letters, followed by 3 or 4 word characters, surrounded by word boundaries
    var serial = /\b[A-Z0-9]{7}\b/g; // Serial - a series of 7 uppercase letters and/or digits, surrounded by word boundaries


    console.log("vars created");

    $('input#tcenter-search').on('keyup', function() { 

    	var input = $(this).val();

    	console.log("input changed");

		if ( input.match(ticketNum) ) {
			$("#tcs-tcenterID").addClass('label-success');
			$('input#tcenter-search').attr('name', 'ticketNum');

		} else {
			$("#tcs-tcenterID").attr('class', 'label label-default');
		};

		if ( input.match(footprintsNum) ) {
			$("#tcs-footprintsID").addClass('label-success');
			$('input#tcenter-search').attr('name', 'footprintsNum');
		} else {
			$("#tcs-footprintsID").attr('class', 'label label-default');
		};

		if ( input.match(hostname) ) {
			$("#tcs-hostname").addClass('label-success');
			$('input#tcenter-search').attr('name', 'hostname');
		} else {
			$("#tcs-hostname").attr('class', 'label label-default');
		};

		if ( input.match(username) ) {
			$("#tcs-username").addClass('label-success');
			$('#tcenter-search').attr('name', 'username');
			$('#tcs form').attr('action', 'https://apps.rit.edu/~a-tcent/admin/viewUser.php');
		} else {
			$("#tcs-username").attr('class', 'label label-default');
		};

		if ( input.match(serial) ) {
			$("#tcs-serial").addClass('label-success');
			$('input#tcenter-search').attr('name', 'serial');
		} else {
			$("#tcs-serial").attr('class', 'label label-default');
		};

    })

Mousetrap.bind('w', function() { $('input#wiki-search').focus();}, 'keyup'); // Wiki
Mousetrap.bind('f', function() { $('input#footprints-search').focus(); }, 'keyup'); // Footprints
Mousetrap.bind('t', function() { $('input#tcenter-search').focus(); }, 'keyup'); // TCenter
Mousetrap.bind('c', function() { $('input#claws-search').focus(); }, 'keyup'); // CLAWS
Mousetrap.bind('m', function() { $('input#maps-search').focus(); }, 'keyup'); // Maps
Mousetrap.bind('l', function() { $('input#ldap-search').focus(); }, 'keyup'); // LDAP

});

/* 
 * Keybindings 
 *
*/

/* Jump to... */

