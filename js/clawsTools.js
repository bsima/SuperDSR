/*
 * @name clawsTools
 * @description A collection of functions that makes searching the dreaded CLAWS into a breeze.
 * @package CLAWS
 * @namespace https://claws.rit.edu/admintools
 * @include https://claws.rit.edu/admintools/*
*/


// Get maincontent div
var maincontent = document.getElementById("maincontent");

// Create a div to hold all Custom search bars
var customBar = document.createElement("div");
customBar.id = "CustomBar";
customBar.style.border = "1px solid #B9A646";
customBar.style.margin = "0 -30px 0 -50px";
customBar.style.minWidth = "1180px";

// Insert custom search bar before main content
maincontent.insertBefore( customBar, maincontent.firstChild)


/**
 * Helper function to add UID search
 *
 */
function addUIDSearch() {

	/*
	 * Searching Identites by UID
	 */

    // Create a form
	var enclosingForm = document.createElement("form");
	enclosingForm.style.display= "inline";
	enclosingForm.action = "#";

    // On submit, perform validation and send
	enclosingForm.onsubmit = function () {
		var customUID = document.getElementById("custombarUID");
        // Replace invalid characters
		var uidValue = customUID.value.replace(/[^0-9]/g, '').trim();

        // If less than 9 digits, invalid UID
		if( uidValue.length < 9 )
		{
			alert("Invalid UID");
			unWait();
			return false;
		}
		else
		{
			// Simple set location to the result of the GET request
            // Snagged by monitoring the HTTP GET request using Firebug
			window.document.location="https://claws.rit.edu/admintools/users/idedit.php?ID=&RITID="+uidValue+
			"&ACTIVATEKEY=&AUTHGN=&AUTHMN=&AUTHSN=&EMAIL=&HOMECITY=&HOMESTATE=&HOMEZIP=&COLLEGE=&PROGRAM=&DEPT=&USERNAME[0]=&AFFILIATION=&"+
			"NickMatch=true&QuickMatch=true&LongMatch=true&MatchHowMany=MatchMany&ACTION=Find+Match";
			return false;
		}
	};

    // Create label for the search field
	var formLabel = document.createElement("label");
	formLabel.innerHTML = "Search UID";

    // Create input element to receive UID
	var uidInput = document.createElement("input");
	uidInput.id = "custombarUID";

    // Monitor input for invalid characters or length > 9 digits
	uidInput.onkeyup = function(){
		this.value = this.value.replace(/[^0-9]/g, '').trim();
		if( this.value.length > 9 )
		{
			this.value = this.value.substr(0,9);
		}
	};

    // Enclose form elements in a span to keep all elements together
	var enclosingSpan = document.createElement("span");
	enclosingSpan.style.border = "1px solid #000";
	enclosingSpan.style.padding = ".25em 0 .25em 0";
	enclosingSpan.style.marginRight = "10px";
	enclosingForm.appendChild(formLabel);
	enclosingForm.appendChild(uidInput);
	enclosingSpan.appendChild(enclosingForm);

    // Add form to custom bar
	customBar.appendChild(enclosingSpan);

}

/*
 * Searching Accounts
 */
function addAccountSearch() {

	var enclosingForm = document.createElement("form");
	enclosingForm.id = "quickAccountForm"
	enclosingForm.style.display= "inline";
	enclosingForm.action = "#";
	enclosingForm.onsubmit = function () {
		var customAccount = document.getElementById("custombarAccount");
		var accountValue = customAccount.value.trim();
		if( accountValue.length < 1 )
		{
			alert("Invalid Username");
			unWait();
			return false;
		}
		else
		{
			window.document.location="https://claws.rit.edu/admintools/users/useredit.php?USERNAME="+accountValue+
								"&submit=Submit&ACTION=GETUSER";
			return false;
		}
	};
	var formLabel = document.createElement("label");
	formLabel.innerHTML = "Search Account";
	var accountInput = document.createElement("input");
	accountInput.id = "custombarAccount";
	accountInput.maxLength = "25";
	var enclosingSpan = document.createElement("span");
	enclosingSpan.style.border = "1px solid #000";
	enclosingSpan.style.padding = ".25em 0 .25em 0";
	enclosingSpan.style.marginRight = "10px";
	enclosingForm.appendChild(formLabel);
	enclosingForm.appendChild(accountInput);
	var hiddenAction = document.createElement("input");
	hiddenAction.name="ACTION";
	hiddenAction.type="hidden";
	hiddenAction.value="GETUSER";
	enclosingForm.appendChild(hiddenAction);
	enclosingSpan.appendChild(enclosingForm);

	customBar.appendChild(enclosingSpan);

}

/*
 * Search by MAC Address
 */
function addDHCPSearch() {

	var enclosingForm = document.createElement("form");
	enclosingForm.id = "dhcpSearchForm"
	enclosingForm.style.display= "inline";
	enclosingForm.action = "#";

	enclosingForm.onsubmit = function () {
		var searchStr = document.getElementById("dhcpSearchInput");
		searchStr = searchStr.value.trim();
        if( searchStr.match(/^[0-9a-fA-F]{12}$/gi) ) {
			for( var i = 10; i > 0; i = i - 2 ) {
				searchStr = searchStr.slice(0,i) + ":" + searchStr.slice(i);
			}
		}
		searchStr = searchStr.replace(/-/gi,":");
		if( searchStr.length < 1 || !searchStr.match(/^([0-9a-fA-F]{2}:){5}([0-9a-fA-F]{2})$/gi) )
		{
			alert("Invalid MAC Address");
			unWait();
			return false;
		}
		else
		{
			window.document.location="https://claws.rit.edu/admintools/computers/logSearch.php?file=dhcpd.log&STRING="+
									 searchStr+"&ACTION=SEARCH&LIMIT=10&submit=Submit";
			return false;
		}
	};

	var formLabel = document.createElement("label");
	formLabel.innerHTML = "Search DHCP Log";
	var dhcpSearch = document.createElement("input");
	dhcpSearch.id = "dhcpSearchInput";
	var enclosingSpan = document.createElement("span");
	enclosingSpan.style.border = "1px solid #000";
	enclosingSpan.style.padding = ".25em 0 .25em 0";
	enclosingSpan.style.marginRight = "10px";
	enclosingForm.appendChild(formLabel);
	enclosingForm.appendChild(dhcpSearch);

	enclosingSpan.appendChild(enclosingForm);

	customBar.appendChild(enclosingSpan);
}

/*
 * Search by hostname
 */
function addHostNameSearch() {

	var enclosingForm = document.createElement("form");
	enclosingForm.id = "hostNameForm"
	enclosingForm.style.display= "inline";
	enclosingForm.action = "#";

	enclosingForm.onsubmit = function () {
		var hostname = document.getElementById("hostNameSearch");
		hostname = hostname.value.trim();
		if( hostname.length < 1 )
		{
			alert("Invalid hostname");
			unWait();
			return false;
		}
		else
		{
			window.document.location="https://claws.rit.edu/admintools/computers/computerSearch.php?DDNSHostname="+
									 hostname+"%&ACTION=SEARCH";
			return false;
		}
	};

	var formLabel = document.createElement("label");
	formLabel.innerHTML = "Search Hostname";
	var hostname = document.createElement("input");
	hostname.id = "hostNameSearch";
	var enclosingSpan = document.createElement("span");
	enclosingSpan.style.border = "1px solid #000";
	enclosingSpan.style.padding = ".25em 0 .25em 0";
	enclosingSpan.style.marginRight = "10px";
	enclosingForm.appendChild(formLabel);
	enclosingForm.appendChild(hostname);

	enclosingSpan.appendChild(enclosingForm);

	customBar.appendChild(enclosingSpan);
}

/*
 * Search by hostname
 */
function addMACSearch() {

	var enclosingForm = document.createElement("form");
	enclosingForm.id = "macSearchForm"
	enclosingForm.style.display= "inline";
	enclosingForm.action = "#";

	enclosingForm.onsubmit = function () {
		var searchStr = document.getElementById("macSearchInput");
		searchStr = searchStr.value.trim();
		if( searchStr.length < 1 || !searchStr.match(/^([0-9a-fA-F]{2}[-:]?){5}([0-9a-fA-F]{2})$/gi) )
		{
			alert("Invalid MAC Address");
			unWait();
			return false;
		}
		else
		{
			window.document.location="https://claws.rit.edu/admintools/computers/computerSearch.php?MAC="+
									 searchStr+"&ACTION=SEARCH";
			return false;
		}
	};

	var formLabel = document.createElement("label");
	formLabel.innerHTML = "Search MAC";
	var macSearch = document.createElement("input");
	macSearch.id = "macSearchInput";
	var enclosingSpan = document.createElement("span");
	enclosingSpan.style.border = "1px solid #000";
	enclosingSpan.style.padding = ".25em 0 .25em 0";
	enclosingSpan.style.marginRight = "10px";
	enclosingForm.appendChild(formLabel);
	enclosingForm.appendChild(macSearch);

	enclosingSpan.appendChild(enclosingForm);

	customBar.appendChild(enclosingSpan);
}

addUIDSearch();

addAccountSearch();

addHostNameSearch();

addMACSearch();

addDHCPSearch();
