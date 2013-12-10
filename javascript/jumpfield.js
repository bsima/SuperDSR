/*
 * @name tcenterSearch
 * @package Jumpfield
 * @package TCenter
 *
 * @TODO I think this can be refactored to be more stable/efficient, and so I'm not repeating myself so much
*/
function tcenterSearch() {

	// Regular expressions. yay.
    var ticketNum     = /\d{5}/;                             // Tcenter ticket ID - 5-digit number
    var footprintsNum = /\d{6}/;                             // Footprints ticket ID - 6-digit number
    var hostname      = /\w+-\d+/;                          // Hostname - a series of letters, hyphen, a series of numbers
    var username      = /(\w(?=\D)){2}((\w{3,5})|(\d{4}))/; // Username - 3 letters, followed by 3 or 4 word characters
    var serial        = /[A-Z0-9]{7}/;                       // Serial - a series of 7 uppercase letters and/or digits
    
    $('input#tcenter-search').on('keyup', function() {

    	var input = $(this).val();

		if ( input.trim(this).match(ticketNum) ) {
			$('#tcs-tcenterID').addClass('green');
			$('input#tcenter-search').attr('name', 'ticketNum');
		} else {
			$('#tcs-tcenterID').removeClass('green');
			//$('#tcs-tcenterID').attr('class', 'ui label');
		};

		if ( input.trim(this).match(footprintsNum) ) {
			$('#tcs-footprintsID').addClass('green');
			$('input#tcenter-search').attr('name', 'footprintsNum');
		} else {
			$("#tcs-footprintsID").attr('class', 'ui label');
		};

		if ( input.trim(this).match(hostname) ) {
			$('#tcs-hostname').addClass('green');
			$('input#tcenter-search').attr('name', 'hostname');
		} else {
			$("#tcs-hostname").attr('class', 'ui label');
		};

		if ( input.trim(this).match(username) ) {
			$('#tcs-username').addClass('green');
			$('#tcenter-search').attr('name', 'username');
			$('#tcs form').attr('action', 'https://apps.rit.edu/~a-tcent/admin/viewUser.php');
		} else {
			$('#tcs-username').attr('class', 'ui label');
			$('#tcs form').attr('action', 'https://apps.rit.edu/~a-tcent/admin/search.php');
		};

		if ( input.trim(this).match(serial) ) {
			$('#tcs-serial').addClass('green');
			$('input#tcenter-search').attr('name', 'serial');
		} else {
			$('#tcs-serial').attr('class', 'ui label');
		};

    })

};

/**
 *
 * CLAWS Search
 *
 */
function clawsSearch() {

	// Regular expressions. yay.
    var hostname = /\w+-\d+/;                             // Hostname - a series of letters, hyphen, a series of numbers
    var username = /([A-Za-z]){3}([A-Za-z]{3,}|\d{4})/;         // Username - 3 letters, followed by 3 or 4 word characters
    var serial   = /[A-Z0-9]{7}/;                         // Serial - a series of 7 uppercase letters and/or digits
    var mac      = /(^([0-9a-fA-F]{2}(:|-)){5}([0-9a-fA-F]{2})$)|(^([0-9a-fA-F]{2}){6}$)/; // MAC Address - 6 couples of 2 hexadecimel numbers, separated (or not) by a colon
    var uid      = /\d{9}/;                               // University ID - a 9-digit number
    var printer  = /pr[A-Za-z]{2,4}\d{1,}/;               // Printers - "PR" followed by 2-4 word characters, followed by 1 or more digit


    $('input#claws-search').on('keyup', function() {

      var input = $(this).val();

      if ( input.trim(this).match(uid) ) {
        $('#claws-uid').addClass('green');
        // $('input#claws-search').attr('name', 'RITUID');
        $('#claws form').attr('action', 'https://claws.rit.edu/admintools/users/usersearch.php?ldap_modifier_USERNAME=Contains&ldap_USERNAME=&ldap_modifier_IDENTITY=Is&ldap_IDENTITY='+input+'&ldap_modifier_HOMEPAGEURL=Contains&ldap_HOMEPAGEURL=&ldap_modifier_CRMPERSONID=Is&ldap_CRMPERSONID=&ldap_modifier_ALLFIELDS=Contains&ldap_ALLFIELDS=&ldap_modifier_Name=Contains&ldap_Name=&ldap_modifier_Email_Address=Contains&ldap_Email_Address=&ldap_modifier_Address=Contains&ldap_Address=&ldap_match=2&ldap_group%5B%5D=-1&ACTION=SEARCH');
      } else {
        $('#claws-uid').attr('class', 'ui label');
      };

      if ( input.trim(this).match(username) ) {
        $('#claws-username').addClass('green');
        // $('input#claws-search').attr('name', 'USERNAME');
        $('#claws form').attr('action', 'https://claws.rit.edu/admintools/users/useredit.php?USERNAME='+input+'&submit=Submit&ACTION=GETUSER');
      } else {
        $('#claws-username').attr('class', 'ui label');
      };

      if ( input.trim(this).match(hostname) || input.trim(this).match(printer) ) {
        $('#claws-hostname').addClass('green');
        // $('input#claws-search').attr('name', 'hostname');
        $('#claws form').attr('action', 'https://claws.rit.edu/admintools/computers/computerSearch.php?DDNSHostname='+input+'%&ACTION=SEARCH');
      } else {
        $("#claws-hostname").attr('class', 'ui label');
      };

      if ( input.trim(this).match(mac) ) {
        $('#claws-mac').addClass('green');
        // $('input#claws-search').attr('name', 'STRING');
        $('#claws form').attr('action', 'https://claws.rit.edu/admintools/computers/computerSearch.php?MAC='+input+'&ACTION=SEARCH');
      } else {
        $('#claws-mac').attr('class', 'ui label');
      };

    })
};

/**
 * 
 * Start your engines...
 *
 */
$(document).ready(function() {

	// Load the view
	$('#content').delay(100).fadeIn(600);

	// Init dropdown items
	$('.ui.selection.dropdown')
  		.dropdown()
	;

	// Strip leading and trailing spaces in search
	// boxes on submit or enter press
	function trimSearch() {
		$('input.search')
			.val( function( i, val ) {
    			return val.trim();
    		});
	};
	$('input.search')
		.on('blur', function(){
			trimSearch();
		});
	$('input.search')
		.keypress(function(e) {
			if ( e.which == 13 ) {
				trimSearch();
			}
		});

	// Init search functions
	tcenterSearch();
	clawsSearch();

    /**
     * JSON for building list of links
     *
     * First, we get the data from the `links.json` file. Then, we build
     * an `<li>` element with a child anchor element and append it to the
     * `ul#content-bookmarks` element. Finally, we target the `<a>` element
     * we just generated and insert the relevent attribute data.
     *
     */
    $.getJSON('./data/links.json', function(data) {
    	var item = [];
    	$.each(data, function(key,val) {
    		var url           = this.url;                    //console.log(url);
			var title         = this.title;                  //console.log(title);
			var titleSmall    = title.toLowerCase();         //console.log(titleSmall);
			var id            = title.replace(/\s+/g, '');   //console.log(id);

			$('<a>')
				.attr({
					class:        'item link',
					'href':       url,
					'title':      title,
					'target':     '_blank',
					'id':         id,
					'data-index': titleSmall
				})
				.text(title)
				.appendTo('#content-links')
			;
    	});
    });

    /**
     * Main menu tabs
     *
     *
     */
    $('nav .tab')
    	.click(function() {
    		$('section.tab').hide();
    		$('.active').removeClass('active');

    		var newtab = this.getAttribute('data-tab');
    		$(this).addClass('active');
    		$('section[data-tab="' + newtab + '"]')
    			.fadeIn()
    		;
    	})
    ;

    /**
     * jQuery code for search a la CSS-filtering. Allows for filtering of
     * the links.
     * http://jzhang.io/add-search-to-jekyll
     */
    searchStyle = $("style#search-style");
 	$("input#link-search").on("keyup", function() {
 	  if (this.value === "") {
 	    searchStyle.html("");
 	  } else {
 	    searchStyle.html("a.link:not([data-index*=\"" + (this.value.toLowerCase().replace(/\\/g, "")) + "\"]) { display: none !important; }");
 	  }
 	});
	$('#nav-links').click(function(){
		$('input#link-search').select();
	});

    $('.link > a').attr('target', '_blank'); // Make links open in a new window.

	/**
	 * Keyboard shortcuts
	 *
	 * These are pretty self-expalnatory.
	 *
	 * For documentation on the Mousetrap library, see here:
	 * http://craig.is/killing/mice
	 */
	Mousetrap.bind('w', function() { $('input#wiki-search').focus();}, 'keyup'); // Wiki
	Mousetrap.bind('f', function() { $('input#footprints-search').focus(); }, 'keyup'); // Footprints
	Mousetrap.bind('t', function() { $('input#tcenter-search').focus(); }, 'keyup'); // TCenter
	Mousetrap.bind('c', function() { $('input#claws-search').focus(); }, 'keyup'); // CLAWS
	Mousetrap.bind('m', function() { $('input#maps-search').focus(); }, 'keyup'); // Maps
	Mousetrap.bind('l', function() { $('input#ldap-search').focus(); }, 'keyup'); // LDAP
});