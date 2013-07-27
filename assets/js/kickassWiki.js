/* Ugh. This needs a lot of work.
 *
 *
 *
 * @name kickassWiki
 * @description A collection of JavaScript functions and CSS classes that make Confluence's (semi-)crappy wiki better.
 * @package Wiki
 *
*/


/* Auto-expand breadcrumbs
 * =======================
 * Add class li#ellipsis.hidden-crumb
 *
**/

function expandBreadcrumbs() {
  if ( document.getElementById("breadcrumbs").children.className == "hidden-crumb" ) {
    this.className = "";
  } else if ( document.getElementById("breadcrumbs").children.className != "hidden-crumb" ) {
    this.className = "hidden-crumb"
  }

}



/* Auto-expand child pages
 * =======================
 * Show ul.more-children
 *
**/
GM_addStyle(".showme{display:block}")
document.getElementsByClassName("more-children").className="showme";


