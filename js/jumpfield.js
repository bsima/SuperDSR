
/* 
 * @name tcenterSearch
 * @package Jumpfield
 * @package TCenter
 *
 * @TODO I think this can be refactored to be more stable/efficient, and so I'm not repeating myself so much
*/

function tcenterSearch() {

	// Regular expressions. yay.
    var ticketNum = /\b\d{5}\b/g; // Tcenter ticket ID - 5-digit number, surrounded by word boundaries
    var footprintsNum = /\b\d{6}\b/g; // Footprints ticket ID - 6-digit number, surrounded by word boundaries
    var hostname = /\b\w+-\d+\b/g; // Hostname - a series of letters, hyphen, a series of numbers, surrounded by word boundaries
    var username = /\b(\w(?=\D)){2}((\w{3,5})|(\d{4}))\b/g; // Username - 3 letters, followed by 3 or 4 word characters, surrounded by word boundaries
    var serial = /\b[A-Z0-9]{7}\b/g; // Serial - a series of 7 uppercase letters and/or digits, surrounded by word boundaries

    $('input#tcenter-search').on('keyup', function() { 

    	var input = $(this).val();

		if ( input.trim(this).match(ticketNum) ) {
			$('#tcs-tcenterID').addClass('label-success');
			$('input#tcenter-search').attr('name', 'ticketNum');
		} else {
			$('#tcs-tcenterID').attr('class', 'label label-default');
		};

		if ( input.trim(this).match(footprintsNum) ) {
			$('#tcs-footprintsID').addClass('label-success');
			$('input#tcenter-search').attr('name', 'footprintsNum');
		} else {
			$("#tcs-footprintsID").attr('class', 'label label-default');
		};

		if ( input.trim(this).match(hostname) ) {
			$('#tcs-hostname').addClass('label-success');
			$('input#tcenter-search').attr('name', 'hostname');
		} else {
			$("#tcs-hostname").attr('class', 'label label-default');
		};

		if ( input.trim(this).match(username) ) {
			$('#tcs-username').addClass('label-success');
			$('#tcenter-search').attr('name', 'username');
			$('#tcs form').attr('action', 'https://apps.rit.edu/~a-tcent/admin/viewUser.php');
		} else {
			$('#tcs-username').attr('class', 'label label-default');
			$('#tcs form').attr('action', 'https://apps.rit.edu/~a-tcent/admin/search.php');
		};

		if ( input.trim(this).match(serial) ) {
			$('#tcs-serial').addClass('label-success');
			$('input#tcenter-search').attr('name', 'serial');
		} else {
			$('#tcs-serial').attr('class', 'label label-default');
		};

    })

};

function clawsSearch() {

	// Regular expressions. yay.
    var hostname      = /\b\w+-\d+\b/g; // Hostname - a series of letters, hyphen, a series of numbers, surrounded by word boundaries
    var username      = /\b(\w(?=\D)){2}((\w{3,5})|(\d{4}))\b/g; // Username - 3 letters, followed by 3 or 4 word characters, surrounded by word boundaries
    var serial        = /\b[A-Z0-9]{7}\b/g; // Serial - a series of 7 uppercase letters and/or digits, surrounded by word boundaries
    var mac           = /\b^([0-9a-fA-F]{2}(:)){5}([0-9a-fA-F]{2})$\b/g; // MAC Address - 6 couples of 2 hexadecimel numbers
    var uid           = /\b\d{9}\b/g // University ID - a 9-digit number

    $('input#claws-search').on('keyup', function() { 

    	var input = $(this).val();

		if ( input.trim(this).match(uid) ) {
			$('#claws-uid').addClass('label-success');
			$('input#claws-search').attr('name', 'RITUID');
			$('#claws form').attr('action', 'https://claws.rit.edu/admintools/users/idedit.php?ID=&ACTIVATEKEY=&AUTHGN=&AUTHMN=&AUTHSN=&EMAIL=&HOMECITY=&HOMESTATE=&HOMEZIP=&COLLEGE=&PROGRAM=&DEPT=&USERNAME[0]=&AFFILIATION=&NickMatch=true&QuickMatch=true&LongMatch=true&MatchHowMany=MatchMany&ACTION=Find+Match');
		} else {
			$('#claws-uid').attr('class', 'label label-default');
			$('#claws form').attr('action', '');
		};

		if ( input.trim(this).match(username) ) {
			$('#claws-username').addClass('label-success');
			$('input#claws-search').attr('name', 'USERNAME');
			$("#claws form").attr('action', 'https://claws.rit.edu/admintools/users/useredit.php?submit=Submit&ACTION=GETUSER');
		} else {
			$("#claws-username").attr('class', 'label label-default');
			$('#claws form').attr('action', '');

		};

		if ( input.trim(this).match(hostname) ) {
			$('#claws-hostname').addClass('label-success');
			$('input#claws-search').attr('name', 'hostname');
			$('#claws form').attr('action', '');
		} else {
			$("#claws-hostname").attr('class', 'label label-default');
		};

		if ( input.trim(this).match(mac) ) {
			$('#claws-mac').addClass('label-success');
			$('#claws-search').attr('name', 'mac');
		} else {
			$('#claws-mac').attr('class', 'label label-default');
		};

    })
};

function filterBookmarks() {
	console.log('filterBookmarks called');
	$('ul#content-bookmarks li.bookmark').filter(function() {
		$('input#bookmark-search').val();
		console.log('text filtered');

		$(this).css('backgound-color','red');
		console.log('text reded');
	}).css('backgound-color','red');
};

$(document).ready(function() {

	$('#close').focus();

	// Strip leading and trailing spaces in search
	// search boxes on submit or enter press	
	function trimSearch() {
		$('input.search').val( function( i, val ) {
    		return val.trim();
    	});
	};
	$('input.search').on('blur', function(){
		trimSearch();
	});
	$('input.search').keypress(function(e) {
		if ( e.which == 13 ) {
			trimSearch();
		}
	});
	

	// Init tcenter search function
	tcenterSearch();

	// Init claws search function
	clawsSearch();

	// Init bookmarks filter feature
	$('input#bookmark-search').on('keyup', function() {
		console.log('filter input changed');
		filterBookmarks();
	});

	$('#nav-bookmarks').click(function(){
		$('input#bookmark-search').select();
		console.log('Select on the bookmark search field');
	});

	// Jumfield key bindings
	Mousetrap.bind('w', function() { $('input#wiki-search').focus();}, 'keyup'); // Wiki
	Mousetrap.bind('f', function() { $('input#footprints-search').focus(); }, 'keyup'); // Footprints
	Mousetrap.bind('t', function() { $('input#tcenter-search').focus(); }, 'keyup'); // TCenter
	Mousetrap.bind('c', function() { $('input#claws-search').focus(); }, 'keyup'); // CLAWS
	Mousetrap.bind('m', function() { $('input#maps-search').focus(); }, 'keyup'); // Maps
	Mousetrap.bind('l', function() { $('input#ldap-search').focus(); }, 'keyup'); // LDAP

});


