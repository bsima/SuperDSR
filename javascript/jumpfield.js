$(document).ready(function() {

    /*
     * @name tcenterSearch
     * @package Jumpfield
     * @package TCenter
     *
     * @TODO I think this can be refactored to be more stable/efficient, and so I'm not repeating myself so much:
     *       - I could probably make each `if` statement in the search functions much more condensed.
     *          - Maybe make it a `switch` statement instead. `switch` tends to be faster:
     *            http://stackoverflow.com/questions/2922948/javascript-switch-vs-if-else-if-else
     *            http://oreilly.com/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html
     *       - I should be able to make one set of master regex's and reuse them in each search function.
     *          - Then again, each search function might have different requirements for what they are filtering...
     *            so it might be beneficial (and more robust) to have different sets of regex's.
     *       - Maybe the search functions should be placed in a separate file.
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
     * Create a settings dialog box for certain 
     * elements of the app.
     *
     * @TODO This needs to be expanded upon. I could put some seriously useful settings in here. Some ideas:
     *       - Add your own links and sync them to Chrome's storage area
     *       - A notepad for quick notes
     *       - Activating and deactivating elements (not everyone uses TCenter)
     */
    function settingsSidebar() {
      
        // Initialize settings sidebar
        $('#setting').click(function() {
            $('.sidebar')
                .sidebar('toggle')
            ;
        });
        $('#close-sidebar').click(function() {
            $('.sidebar')
                .sidebar('toggle')
            ;
        });
        
        // Initialize toggle animations
        $('.ui.checkbox')
            .checkbox()
        ;
    
        // Saves options to localStorage.
        function save_options() {
            var select              = document.getElementById("color");
            var options             = select.children[select.selectedIndex].value;
            localStorage["options"] = options;
    
            // Update status to let user know options were saved.
            var status = document.getElementById("status");
            status.innerHTML = "Options Saved.";
            setTimeout(function() {
                status.innerHTML = "";
            }, 750);
        }
    
        // Restores select box state to saved value from localStorage.
        function restore_options() {
            var favorite = localStorage["options"];
            if (!favorite) {
                return;
            }
            var select = document.getElementById("color");
            for (var i = 0; i < select.children.length; i++) {
                var child = select.children[i];
                if (child.value == favorite) {
                    child.selected = "true";
                    break;
                }
            }
        }
        //document.addEventListener('DOMContentLoaded', restore_options);
        //document.querySelector('#save').addEventListener('click', save_options);
    }
    
    /**
     * Strip leading and trailing spaces in search
     * boxes on submit or enter press
     */
    function trimSearch() {
    	$('input.search')
    		.val( function( i, val ) {
       			return val.trim();
       		});
    };
    
    /******** Here is where the content is actually beginning to be generated ****/ 
	/**
     * Load the view
     *
     * We use a 100 milisecond delay and a 
     * 600 milisecond fade-in because that's
     * what I think looks cool.
     */
	$('#content')
        .delay(100)
        .fadeIn(600)
    ;

	/**
     *  Initialize the dropdown items
     */
	$('.ui.selection.dropdown')
  		.dropdown()
	;

    /**
     * Main menu tabs
     *
     * Whenever you click on a `.tab` in the `nav` element,
     * a few things happen:
     *     1. Both section tabs are hidden and the active
     *        class is removed.
     *     2. The `data-tab` attribute is acquired from the
     *        clicked element.
     *     3. We add the `active` class to the clicked element
     *        and then fade-in the respective tab content.
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
     * Whenever we press a key in a search field,
     * we should clean up the code. This lets us 
     * do the cool regex-powered real-time highlighting
     * of labels and awareness of what the user is
     * typing.
     */
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

	/** 
    * Init search functions and sidebar
    */
	tcenterSearch();
	clawsSearch();
    settingsSidebar();

    /**
     * JSON for getting current version
     *
     */
    $.getJSON('./manifest.json', function(data) {
        console.log(data.version);
        $('#version').text('Version ' + data.version);
    }); 

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
     * jQuery code for search a la CSS-filtering. Allows for filtering of
     * the links.
     *
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
     * Initialize notepad settings loader and save function
     *
     */
    var notepadContent = $('#notepad');

    function notepadChanged(newContent) {
       oldContent = newContent;
    }

    notepad.addEventListener('keyup', function(e) {
        var notes = notepadContent.val();
        e.preventDefault();
       
        chrome.storage.sync.set({
            myValue: notes,
            timestamp: Date.now()
        }, function() {
            console.log("Notes saved: " + notes);
            $('#notepad-status').delay(3000).fadeIn().fadeOut(); 
        });            
    });

    chrome.storage.onChanged.addListener(function(changes, namespace){
        if (changes.notepadContent) {
            notepadChanged(changes.myValue.newValue);
        }
    });
    chrome.storage.sync.get('myValue', function(result) {
        notepadChanged(result.myValue);
    });

	/**
	 * Keyboard shortcuts
	 *
	 * These are pretty self-expalnatory.
	 *
	 * For documentation on the Mousetrap library, see here:
	 * http://craig.is/killing/mice
	 */
	Mousetrap.bind('w', function() { $('input#wiki-search').focus();}, 'keyup');        // Wiki
	Mousetrap.bind('f', function() { $('input#footprints-search').focus(); }, 'keyup'); // Footprints
	Mousetrap.bind('t', function() { $('input#tcenter-search').focus(); }, 'keyup');    // TCenter
	Mousetrap.bind('c', function() { $('input#claws-search').focus(); }, 'keyup');      // CLAWS
	Mousetrap.bind('m', function() { $('input#maps-search').focus(); }, 'keyup');       // Maps
	Mousetrap.bind('l', function() { $('input#ldap-search').focus(); }, 'keyup');       // LDAP
    Mousetrap.bind('1', function() { $('section[data-tab=searches]').focus(); }, 'keyup'); // Focus on Searches tab
    Mousetrap.bind('2', function() { $('section[data-tab=links]').focus(); }, 'keyup'); // Focus on Links tab
});
