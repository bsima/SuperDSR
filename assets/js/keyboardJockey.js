/*
 * @name keyboardJockey
 * @description Keyboard shortcuts for executing common actions accross all of ITS's webtools.
 * @requires mousetrap.min.js - http://craig.is/killing/mice
 * @package Global
 *
*/

/*
 *  Name:     ticketJockey
 *  Purpose:  Keyboard shortcuts for footprints
*/

function ticketJockey() {
  if ( document.title.match(/ ^Ticket /g) ) {

    /* Bind the following keyboard shortcuts:
     *
     * 1 Contact Information
     * 2 Add'l Contact Details
     * 3 Ticket Information
     * 4 Description
     * 5 Assignees and Notifications
     * 6 Time Tracking
     * 7 Related Tickets
     * 8 History
     * 9 or e <Edit>
     *
    */

    function switchTo(this) {
      if this
    }

    Mousetrap.bind('1', function switchTo(contactInformation));
    Mousetrap.bind('2', function switchTo(contactDetails));
    Mousetrap.bind('3', function switchTo(ticketInformation));
    Mousetrap.bind('4', function switchTo(ticketDescription));
    Mousetrap.bind('5', function switchTo(ticketAssignees));
    Mousetrap.bind('6', function switchTo(timeTracking));
    Mousetrap.bind('7', function switchTo(relatedTickets));
    Mousetrap.bind('8', function switchTo(ticketHistory));
    Mousetrap.bind('9', function editTicket());

  }
}

/*
 *  Name:    tcenterJockey
 *  Purpose: Keyboard shortcuts for TCenter
*/

function tcenterJockey() {
  if ( document.title.match(/ ^TCenter /g) ) {

  }
}

/////////////////////////////////////////////////////////////////////
                       /* Example moustraps */
/////////////////////////////////////////////////////////////////////
// single keys
Mousetrap.bind('4', function() { highlight(2); });
Mousetrap.bind('x', function() { highlight(3); }, 'keyup');

// combinations
Mousetrap.bind('command+shift+k', function(e) {
    highlight([6, 7, 8, 9]);
    return false;
});

Mousetrap.bind(['command+k', 'ctrl+k'], function(e) {
    highlight([11, 12, 13, 14]);
    return false;
});

// gmail style sequences
Mousetrap.bind('g i', function() { highlight(17); });
Mousetrap.bind('* a', function() { highlight(18); });

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', function() {
    highlight([21, 22, 23]);
});