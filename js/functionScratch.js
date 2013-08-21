var search-input = $('');
var user_input = '';
var ID = '';
var form = '';
var form_action = '';

function autoSearch() {

	if ( input.trim(this).match( user_input ) ) {
	
		$(ID).addClass('label-success');
		$(search-input).attr('name', user_input);
		$(form).attr('action', form_action);
	
	} else {
	
		$(ID).attr('class', 'label label-default');
		$(form).attr('action', form_action);
	
	}

};



	// Regular expressions. yay.
    var ticketNum     = /\b^\d{5}\b$/g; // Tcenter ticket ID - 5-digit number, surrounded by word boundaries
    var footprintsNum = /\b^\d{6}\b$/g; // Footprints ticket ID - 6-digit number, surrounded by word boundaries
    var hostname      = /\b^\w+-\d+\b$/g; // Hostname - a series of letters, hyphen, a series of numbers, surrounded by word boundaries
    var username      = /\b^(\w(?=\D)){2}((\w{3,5})|(\d{4}))\b$/g; // Username - 3 letters, followed by 3 or 4 word characters, surrounded by word boundaries
    var serial        = /\b^[A-Z0-9]{7}\b$/g; // Serial - a series of 7 uppercase letters and/or digits, surrounded by word boundaries
    var mac           = /\b^([0-9a-fA-F]{2}(:)){5}([0-9a-fA-F]{2})$\b/g; // MAC Address - 6 couples of 2 hexadecimel numbers
    var uid           = /\b^\d{9}$\b/g // University ID - a 9-digit number