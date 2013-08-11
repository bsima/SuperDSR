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

if ( document.getElementById("breadcrumbs").children.className == "hidden-crumb" ) {
  this.removeAttribute("class");
}
