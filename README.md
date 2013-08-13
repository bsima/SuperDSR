SuperDSR
========

A little extension to make an RIT Desktop Support Representative's life just super.

Contents
--------

* Footprints
    * **biggerDescription.js** - Increases the size of the previous description area in edit ticket mode.
    * **largerAssignees.js** - Increases the size of the assignees section on the Footprints ticket page.
    * **quickAssign.js** - Adds buttons to side of assignees box to allow assigning of tickets with one click
    * **userSearach.js** - Add Search bar to Footprints that allows searching all tickets by username
    * **tcenterLove.js** - Adds a link to jump to a Tcenter ticket.
* Wiki
    * **kickassWiki.js** - A collection of JavaScript functions and CSS classes that make Confluence's (semi-)crappy wiki better. (Not much in this yet, but it will grow with time.)
* CLAWS
    * **clawsTools.js** - A collection of functions that makes searching the dreaded CLAWS into a breeze.
* Jumpfield
    * By clicking on the SuperDSR button, you can access a quick-search field.
        * Search the Wiki - working
        * Search Footprints - **not working**
        * Search Tcenter - working
        * Search CLAWS - **not working**
        * Search RIT Maps - working
        * Search LDAP - working
    * Keyboard shortcuts make it quicker to navigate the Jumpfield
        * Alt+S opens the Jumpfield, then:
        * w selects the Wiki search
        * f selects the Footprints search
        * t selects the TCenter search
        * c selects the CLAWS search
        * m selects the Maps search
        * l selects the LDAP search

Installation
------------

1. Use [Chrome](http://google.com/chrome)
2. Download this entire directory using the download button to the right
3. In Chrome: Enable developer mode in Settings > Extensions
4. Install this directory as an extension ("Load unpacked extension" button)

TODO's and Future Features
--------------------------

To see all open TODO's in the code documentation, run the command `grep -rn "@TODO" *`

* Jumpfield.
    * When you click on the SuperDSR button on the Chrome bar, a popup displays that lets you search the wiki, etc. Only the wiki search and the Maps search currently works. The other search boxes need work.
* TCenter Autofill
    * Javascript. Put a button on the ticket creation page of TCenter that looks up a ticket in Footprints and pulls certain information from the ticket, then enters it into the TCenter ticket.
* Authentication. Have the DRS sign in with their employee username and password, authenticate with shibolleth, then autofill/login everywere one needs to be logged in

Comments, Questions, Suggestions?
---------------------------------

Post 'em here in GitHub, or send an email to bwshelp(at)rit.edu