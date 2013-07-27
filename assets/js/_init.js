/*
 * @name _init
 * @description Defines functions and variables that the components may use. This is essentially a library.
 * @package Global
 *
 * @TODO Maybe: create a global variable/function that turns on and off various debugging tools within the components.
 *
*/

/* @function currentURL
 * @purpose Simply grabs the URL and sets it as a variable that can be regex'd
 *
 * @TODO Verify that this function works!
*/

var currentURL;

function getURL(regex) {

  var href = window.location.href;

  currentURL = new String(href);

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
