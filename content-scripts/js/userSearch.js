/* @name userSearch
 * @description Add Search bar to Footprints that allows searching all tickets by username
 * @namespace https://footprints*.main.ad.rit.edu/*
 * @include https://footprints*.main.ad.rit.edu/MRcgi/MRhomepage.pl*
 * @package Footprints
 *
 * I don't see any Greasemonkey-specific code, so this should work without
 * any modifications, but even so...
 * @TODO Verify that this works without modification for GM-specific code.
*/

// Create Search form
var form = document.createElement('form');

// Search is a POST request
form.method="post";

// This is the script that handles the search
form.action="/MRcgi/MRhomepage.pl";


/**
 * Utility function to add hidden parameters to the form
 *
 *  name - Name of the element
 *  value - Optional value of the element
 *
 */
function addHiddenParam(name, value)
{
	var el = document.createElement("input");
	el.name = name;
	if( value != undefined )
	{
		el.value = value;
	}
	el.type = "hidden";
	form.appendChild(el);
}

addHiddenParam("ABMASTER","2");
addHiddenParam("ANDOR","and");
addHiddenParam("ANYALL","or");
addHiddenParam("ASSIGNEE_TO_ADD");
addHiddenParam("ATTACHMENTFILENAMES");
addHiddenParam("CREATE_EDIT_DATESELECTION","SPECIFIC");
addHiddenParam("DATERANGEOP","on");
addHiddenParam("DATERANGEWHAT","created");
addHiddenParam("DATESELECTIONSLA__bDue__bDate","SPECIFIC");
addHiddenParam("DATESELECTIONSLA__bResponse__bTime","SPECIFIC");
addHiddenParam("DATESELECTIONWork__bScheduled__bDate","SPECIFIC");
addHiddenParam("DATESELECTION__LAST_CLOSED__","SPECIFIC");
addHiddenParam("DAYS","0");
addHiddenParam("DEBUGSEARCHSTRING");
addHiddenParam("DOWHAT","SEARCH");
addHiddenParam("DayInput_HIGHDATE");
addHiddenParam("DayInput_LOWDATE");
addHiddenParam("DayInput_SLA__bDue__bDate");
addHiddenParam("DayInput_SLA__bDue__bDate2");
addHiddenParam("DayInput_SLA__bResponse__bTime");
addHiddenParam("DayInput_SLA__bResponse__bTime2");
addHiddenParam("DayInput_Work__bScheduled__bDate");
addHiddenParam("DayInput_Work__bScheduled__bDate2");
addHiddenParam("DayInput___LAST_CLOSED__");
addHiddenParam("DayInput___LAST_CLOSED__2");
addHiddenParam("FROM","SEARCH");
addHiddenParam("FROM2","SEARCH");
addHiddenParam("HOURS","0");
addHiddenParam("KEYWORDPHRASE");
addHiddenParam("MAINFRAMEONLY","1");
addHiddenParam("MASTERTICKET","on");

// This appears to be a session key for footprints. Snag this value from the page
addHiddenParam("MRP",document.getElementsByName("MRP")[0].value);

// The Following are the statuses of tickets - Update as needed
addHiddenParam("MULTIPLESTATUS","Open");
addHiddenParam("MULTIPLESTATUS","Work__bScheduled");
addHiddenParam("MULTIPLESTATUS","Work__bIn__bProgress");
addHiddenParam("MULTIPLESTATUS","Pending__bCustomer");
addHiddenParam("MULTIPLESTATUS","Pending__bVendor");
addHiddenParam("MULTIPLESTATUS","Pending__bITS");
addHiddenParam("MULTIPLESTATUS","Customer__bResponded");
addHiddenParam("MULTIPLESTATUS","Updated__bby__bEmail");
addHiddenParam("MULTIPLESTATUS","Subtasks__bClosed");
addHiddenParam("MULTIPLESTATUS","Verification__bRequired");
addHiddenParam("MULTIPLESTATUS","Reopened");
addHiddenParam("MULTIPLESTATUS","_INACTIVE_");
addHiddenParam("MULTIPLESTATUS","Closed");
addHiddenParam("MULTIPLESTATUS","_REQUEST_");
addHiddenParam("MULTIPLESTATUS","_PENDING_SOLUTION___public");
addHiddenParam("MULTIPLESTATUS","_SOLVED___public");
addHiddenParam("MULTIPLESTATUS","_PENDING_SOLUTION___internal");
addHiddenParam("MULTIPLESTATUS","_SOLVED___internal");
addHiddenParam("MonthInput_HIGHDATE");
addHiddenParam("MonthInput_LOWDATE");
addHiddenParam("MonthInput_SLA__bDue__bDate");
addHiddenParam("MonthInput_SLA__bDue__bDate2");
addHiddenParam("MonthInput_SLA__bResponse__bTime");
addHiddenParam("MonthInput_SLA__bResponse__bTime2");
addHiddenParam("MonthInput_Work__bScheduled__bDate");
addHiddenParam("MonthInput_Work__bScheduled__bDate2");
addHiddenParam("MonthInput___LAST_CLOSED__");
addHiddenParam("MonthInput___LAST_CLOSED__2");
addHiddenParam("NONASSIGNEE_TO_ADD");
addHiddenParam("NUMBERBOUNDARYHIGH");
addHiddenParam("NUMBERBOUNDARYLOW");
addHiddenParam("OPSLA__bDue__bDate","on");
addHiddenParam("OPSLA__bResponse__bTime","on");
addHiddenParam("OPWork__bScheduled__bDate","on");
addHiddenParam("OP__LAST_CLOSED__","on");
addHiddenParam("PHRASE");

// Project ID is the ID number of the workspace. Modify as needed.
// Defaults to current project/workspace
addHiddenParam("PROJECTID",document.getElementsByName("PROJECTID")[0].value);

addHiddenParam("REGULARTICKET","on");
addHiddenParam("SAVEAS");
addHiddenParam("SAVETYPE","PERSONAL");
addHiddenParam("SEARCH","on");
addHiddenParam("SORTD0","ascending");
addHiddenParam("SORTD1","ascending");
addHiddenParam("SORTDIRECTION","descending");
addHiddenParam("SORTF0","none");
addHiddenParam("SORTF1","none");
addHiddenParam("SORTFIELD","mr");
addHiddenParam("SUBTASKTICKET","on");
addHiddenParam("TEXTAlternate__bPhone");
addHiddenParam("TEXTBreached__bFCR","Ignore");
addHiddenParam("TEXTCampus__bAddress");
addHiddenParam("TEXTCollege__uDivision");
addHiddenParam("TEXTDNS__bHostname");
addHiddenParam("TEXTDepartment");
addHiddenParam("TEXTDepartment__bNumber");
addHiddenParam("TEXTEmail__bAddress");
addHiddenParam("TEXTFastPass","Ignore");
addHiddenParam("TEXTFirst__bEdited__bBy");
addHiddenParam("TEXTFirst__bName");
addHiddenParam("TEXTInactive__b4__bWeeks","Ignore");
addHiddenParam("TEXTInternal__bNotes");
addHiddenParam("TEXTLast__bName");
addHiddenParam("TEXTMAC__bAddress");
addHiddenParam("TEXTPhone");
addHiddenParam("TEXTSerial__bNumber");

addHiddenParam("TITLE");

// Fun fact. USER is the current agent
addHiddenParam("USER",document.getElementsByName("USER")[0].value);

addHiddenParam("WHEN","greater than");
addHiddenParam("WRITECACHE","1");
addHiddenParam("YearInput_HIGHDATE");
addHiddenParam("YearInput_LOWDATE");
addHiddenParam("YearInput_SLA__bDue__bDate");
addHiddenParam("YearInput_SLA__bDue__bDate2");
addHiddenParam("YearInput_SLA__bResponse__bTime");
addHiddenParam("YearInput_SLA__bResponse__bTime2");
addHiddenParam("YearInput_Work__bScheduled__bDate");
addHiddenParam("YearInput_Work__bScheduled__bDate2");
addHiddenParam("YearInput___LAST_CLOSED__");
addHiddenParam("YearInput___LAST_CLOSED__2");
addHiddenParam("flatASSIGNEDTO","0");
addHiddenParam("flatNOT_ASSIGNED","0");

// Create input element for User ID
var user = document.createElement("input");
user.type="text";
user.name="TEXTUser__bID";
user.value="Username Search";
user.style.color="#888";

// Change text and color on focus/blur
user.onclick = function() {
    if( this.value == "Username Search" )
    {
        this.value = "";
        user.style.color="#000";
    }
};
user.onblur = function() {
    if( this.value == "" )
    {
        this.value = "Username Search";
        user.style.color="#888";
    }
};
form.appendChild(user);

// Create submit button
var submit = document.createElement("input");
submit.type="submit";
submit.value="Search";
form.appendChild(submit);

// Create div for search
var searchDiv = document.getElementById('Search');

var list = searchDiv.firstElementChild.firstElementChild;

// Create new list element
var li = document.createElement("li");
// Add form to it
li.appendChild(form);

// Append form to list of search elements
list.appendChild(li);