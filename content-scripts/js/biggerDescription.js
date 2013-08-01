/* The following script was adapted by Ben Sima from a Greasemonkey script
 * by Zachary Sherwin and Ankit Patel
 * (https://apps-staging.rit.edu/its/itshd/noauth/BiggerDescription.user.js)
 *
 * @name biggerDescription
 * @namespace https://footprints*.main.ad.rit.edu/MRcgi/MRTicketPage.pl*
 * @description Increases the size of the previous description area in edit ticket mode.
 * @include https://footprints*.main.ad.rit.edu/MRcgi/MRTicketPage.pl*
 * @author Zachary Sherwin (zsshelp)
 * @author Ankit Patel (axphelp)
 * @package Footprints
*/


// Regex that selects for Footprints ticket pages only
var re = /.*footprints.*.main.ad.rit.edu/MRcgi/MRTicketPage.pl.*/g;

// Execute only if the URL matches the regex
if ( window.location.href.match(re) ) {

  var allDescsFrame = document.getElementsByName("ALL_DESCS")[0]; // Get the description box
  allDescsFrame.style.width = "836px"; // Set the width
  allDescsFrame.style.minWidth= "400px"; // Set the minimum width
  allDescsFrame.height = 800; // set the height

  // I'm not sure if this is even necessary... whatever it still needs to be coverted to jQuery
  // @TODO Convert this line to jQuery. And figure out in general how to edit CSS with jQuery.
  GM_addStyle("#descrpt_tbl{width:75%;min-width:400px;}");
};
