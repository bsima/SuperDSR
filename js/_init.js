/*
 * @name _init
 * @description Defines functions and variables that the components may use. This is essentially a library.
 * @package Global
 *
 * @TODO Maybe: create a global variable/function that turns on and off various debugging tools within the components.
 *
*/

/* @function getURL
 * @purpose Simply grabs the URL and sets it as a variable that can be regex'd
 *
 * @TODO Verify that this function works!
*/

var currentURL; // Needs to be a global variable.

function getURL(regex) {

  // Specific to Chrome. Get current tab URL and store in variable tablink
  var tablink;
  chrome.tabs.getSelected(null,function(tab) { var tablink = tab.url; });

  currentURL = new String(tablink);

  if ( regex != null ) {

    currentURL = currentURL.match(regex);
    return currentURL;
    console.log("The current regex'd URL is " . currentURL);

  } else {

    return currentURL;
    console.log("The current URL is " . currentURL);

  };

};













// Made with love. Internet style.
