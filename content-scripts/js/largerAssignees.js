/*
 * @name largerAssignees
 * @description This increases the size of the assignees section on the Footprints ticket page. The list of available assignees and the list of current assignees is increased in size.
 * @package Footprints
 * @namespace https://footprints*.main.ad.rit.edu/
 * @include https://footprints*.main.ad.rit.edu/MRcgi/MRTicketPage.pl*
*/

// Get list of possible assignees
var assigneeSelectStyle = document.getElementById("pmember").style;

// Make it grow
assigneeSelectStyle.minWidth = "300px";
assigneeSelectStyle.minHeight = "300px";

// Get assignees list
var assigneeStyle = document.getElementById("assgnee").style;

// Make it grow
assigneeStyle.minWidth = "300px";
assigneeStyle.minHeight = "300px";