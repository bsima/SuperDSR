/*
 * @name tcenterLove
 * @author Ben Sima, the philosopher who oh-by-the-way can code and stuff too
 * @description Adds a link to jump to a Tcenter ticket.
 * @package Footprints
 * @package TCenter
 * @namespace https://footprints*.main.ad.rit.edu/MRcgi/MRTicketPage.pl*
 * @include https://footprints*.main.ad.rit.edu/MRcgi/MRTicketPage.pl*
 *
 * @TODO Convert this to jQuery and get rid of the Greasemonkey stuff.
*/

GM_addStyle("#ContentWrapper{box-shadow:0px;}");

/*
 * ============
 * DESCRIPTION
 * ============
 *
 * This script will search the HTML code of a ticket in Footprints,
 * parse the Tcenter ticket number from the following line:
 *     [--- TCENTER TICKET #: 15660 ---]
 * and then create a link to the Tcenter ticket that floats
 * in the upper right-hand portion of the screen.
*/

// Adds the style for the created link
// @TODO Convert this to jQuery
GM_addStyle("#tcenterJump{position:fixed;top:40%;right:0;width:40px;height:150px;background-color:#A7DCAC;}")
GM_addStyle("#tcenterJump:hover{background-color:#d0ecd3;}")
console.log("Style #tcenterJump created");

/*****************************************
 *        Name: parseData
 *  Parameters: ticketNumber
 *     Purpose: Takes the content from the
 *              selected elements, and uses
 *              regular expressions to find
 *              the Tcenter ticket number
*****************************************/
function parseData(ticketNumber) {

  // Grab the HTML content of the object
  var ticketNumber = ticketNumber.innerHTML;
  console.log(ticketNumber);

  // First match the tag for Tcenter tickets
  var ticketNumber = ticketNumber.match(/---TCENTER TICKET #: [0-9][0-9][0-9][0-9][0-9] ---/g);
  console.log(ticketNumber);

  // If a positive match is found, extract the ticket number
  // Then, create the ticket
  // If no ticket is found, log it in the console
  if (ticketNumber != null) {

    // First convert it to a string
    var ticketNumber = new String(ticketNumber);

    // Then match a 5-digit number (i.e. the ticket number)
    var ticketNumber = ticketNumber.match(/[0-9][0-9][0-9][0-9][0-9]/g);

    console.log(ticketNumber);
    create(ticketNumber);
  } else {
    console.log("No Tcenter ticket!");
  }
};

/*****************************************
 *        Name: start
 *  Parameters: allUpdates
 *     Purpose: Creates a loop for running
 *              the updates through the
 *              parseData function
*****************************************/
function start(allUpdates) {
  for (var i = 0; i < allUpdates.length; i++) {
    var parsedData = parseData(allUpdates[i]);
 }
};

/*****************************************
 *        Name: create
 *  Parameters: ticket
 *     Purpose: Makes the actual link to
 *              the tcenter ticket
*****************************************/
function create(ticket) {
    var link = document.createElement("a");
    link.href   = "https://apps.rit.edu/~a-tcent/admin/ticket.php?t_id=" + ticket[0];
    link.id     = "tcenterJump";
    link.target = "_blank";
  document.body.appendChild(link);
};

// Select the targeted elements and run them through
// the start function
var updates = document.getElementsByClassName("description");
start(updates);