/*
 * @name quickAssign
 * @description Adds buttons to side of assignees box to allow assigning of tickets with one click
 * @include https://footprints*.main.ad.rit.edu/MRcgi/MRTicketPage.pl*
 * @package Footprints
 *
 * @TODO This script relies on GM-specific code. Refactoring needs to be done. See other @TODO's in this script
 *         GM_getValue()
 *         GM_setValue()
 *
*/

/** Debugging Tools
 *
 * Can't figure this shit out, so I'm making some debugging stuff
 * Set debugMode to 1 to show error messages, 0 to hide messages.
 */
var debugMode = 1;
function dbmsg(message) {
    if ( debugMode == 1 ) {
        var date = new Date();
        var time = date.getHours() + ':' 
            + date.getMinutes() + ':' 
            + date.getSeconds();
        console.log('DBM - ' + time + ': ' + message);
        if ( chrome.runtime.lastError ) {
            console.log('DBM lastError - ' + chrome.runtime.lastError);
        }
    } else if ( debugMode == 0 ) {
        return;
    }
}
if ( debugMode == 1 ) {
    console.log('Debug mode is currently ON. Each debug message is preceeded with "DBM" and the time the message was generated.');

    // Listen for changes in storage
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
            var storageChange = changes[key];
            dbmsg('Storage key "%s" in namespace "%s" changed. ' +
                  'Old value was "%s", new value is "%s".',
                  key,
                  namespace,
                  storageChange.oldValue,
                  storageChange.newValue);
        }
    });
} 


dbmsg('Init quickAssign.js script.');

/** 
 * customQA
 * This creates an empty JS object and then loads it with the previously-saved
 * data from Chrome.
 */
var customQA = {}; // Create an empty object
chrome.storage.sync.get(customQA,function() {
    dbmsg('customQA = '+customQA)
});

/**
 * If customQA is still empty, this browser is running this script for
 * the first time
 */
if ( customQA == {} ) {
    dbmsg('This is the first time this browser is running quickAssign.js.');
    // Load default values
    loadDefaults();
    dbmsg('Defaults loaded into undefinded customQA.');
} else {
    dbmsg('This browser has saved data.');
}

/** loadDefaults
*
* Loads the default options into the JSON object and then saves the object
* to Chrome's storage.
*/
function loadDefaults() {
    dbmsg('Begin loadDefaults()');
    // Default for Service Desk ( Still caled Helpdesk )
    customQA[0] = [ 'Service Desk',
        '<option value="HelpDesk">HelpDesk</option>'];

    // Default for Service Desk Full Timers. If these change, PLEASE update the defaults here
    // The format for members of the team is straight forward
    customQA[1]=
        ['Service Desk - FTE',
        '<option value="HelpDesk">HelpDesk</option>'+
        '<option class="member" value="gcchelp">Geoffrey Cabrera</option>'+
        '<option class="member" value="jjmhelp">John Mander</option>'+
        '<option class="member" value="mcmhelp">Mike Mistretta</option>'+
        '<option class="member" value="aapppt">Ardelia Parker-Killings</option>'+
        '<option class="member" value="odphelp">Omar Phillips</option>'];

    // Special request from Geoff Cabrera
    customQA[2]=
        ['PS-Access',
        '<option value="PS__b__u__bAccess__bApprovers\">PS - Access Approvers</option>'+
        '<option class="member" value="dhhrgr">Doug Hausner</option>'+
        '<option class="member" value="nhsrgr2">Nancy Simonds</option>'];

    // Desktop Support quick assign button
    customQA[3]=
        ['Desktop',
        '<option value="Desktop__bSupport">Desktop Support</option>'];

    // Systems support
    customQA[4]=
        ['Systems Support',
        '<option value="Systems__bSupport">Systems Support</option>'];

    // Command Center
    customQA[5]=
        ['Command Center',
        '<option value="Command__bCenter">Command Center</option>'];

    // Network Communications
    customQA[6]=
        ['Network Communications',
        '<option value="Network__bCommunications">Network Communications</option>'];

    chrome.storage.sync.set(customQA,function() {
        dbmsg('customQA has been set.')
    });

    dbmsg('End loadDefaults()');
}

/** addQuickAssignee - Add a new quick assign button
*
* Params:
*      name - Name of the button
*      html - HTML data that will become the contents of the assignees list
*
*/
function addQuickAssignee(name, html) {
    // Create the quickassign Input button element
    var newAssignee = document.createElement('input');

    // Set the ID of the element to be the name of the assignee
    // The RegEx removes all whitespace characters
    // The final result is the id = quickAssignNameYouSpecified
    newAssignee.id = 'quickAssign'+name.replace(/\s/g, '').trim();

    // Specifies type of input element
    // Submit type is a clickable button
    newAssignee.type = 'submit';

    // The value of the button will be the name of the assignee
    newAssignee.value = name;

    // This used to be onClick, but due to an issue with Footprints
    // triggering the onclick action inadvertantly, this has been changed
    // to an onMouseUp action.
    newAssignee.onmouseup = function() {
        // Set the assignees to the specified list
        assigneeList.innerHTML = html;
    };

    // Add new assignee to the list of assignees
    qassignCell.appendChild(newAssignee);
}


/**
 * Draws the QuickAssign management menu on screen
 *
 * Optional parameters:
 *  tempJSON - String representation of current JSON object containing
 *             all quick assignees
 *  itemCount - Total number of JSON items contained in tempJSON
 *
 */
function makeMenu(tempJSON, itemCount) {
    // If tempJSON is a string, parse to JSON
    if ( typeof tempJSON == 'string' ) {
        tempJSON = JSON.parse(tempJSON);
    } else {
        // Make copy of customQA
        tempJSON  = {};
        itemCount = 0;
        // Copy elements into tempJSON
        for( var qassignName in customQA ) {
            tempJSON[qassignName] = [
                                        customQA[qassignName][0],
                                        customQA[qassignName][1]
                                    ];
            ++itemCount;
        }
    }

    // Get main content div
    var content = document.getElementById('ContentWrapper');

    // Create new content container for management interface
    var newEl = document.createElement('div');
    // Element is 75% of window window height and width
    newEl.style.width = '75%';
    newEl.style.height = '75%';

    // Position is fixed
    newEl.style.position = 'fixed';

    // Thus, the element will always be centered on the screen
    newEl.style.top = '12.5%';
    newEl.style.left = '12.5%';
    newEl.style.backgroundColor = '#fff';
    newEl.style.border = '1px solid #000';
    newEl.style.overflow = 'auto';

    // Close button
    var closeButton = document.createElement('div');

    // Position element on right side of management interface
    closeButton.style.cssFloat = 'right';

    // Snag image from Footprints set of images
    closeButton.innerHTML = '<a href="#"><img src="/MRimg/cancel.gif"></a>';

    // Close button handler
    closeButton.onclick = function() {
        if( confirm('Any unsaved changes will be lost. Are you sure you want to close this window?') ) {
            content.removeChild(newEl);
        }
    };

    // Add close button to content container
    newEl.appendChild(closeButton);

    // Create table to hold contacts
    var contactTable = document.createElement('table');
    contactTable.style.border = '1px solid #000';
    contactTable.style.borderSpacing = '0';
    contactTable.style.marginLeft = '25%';
    contactTable.style.width = '50%';

    // Use counter to track odd/even
    var count = 0;

    // Function pointer to handle onclick events for the quick assignee name
    var editOnClick = function() {
        var fnPtr = this.onclick;

        // Clear current onclick handler
        this.onclick = null;

        // Get current innerHTML data
        var value = this.innerHTML;

        // Create new input element
        var nameEdit = document.createElement('input');

        // Type will be text
        nameEdit.type='text';

        // Set value to name of assignee
        nameEdit.value = value;
        this.innerHTML = '';

        // Onblur triggers when the element loses focus
        nameEdit.onblur = function() {
            // Clear onblur handler
            this.onblur = null;
            // Set value
            var val = this.value;

            // Change onclick function
            this.parentNode.onclick = editOnClick;

            // Update configuration and state variables
            var nodeNum = this.parentNode.parentNode.id;
            tempJSON[nodeNum][0] = val;
            this.parentNode.innerHTML = val;

        };

        // Append edit text box
        this.appendChild(nameEdit);

        // Give it focus
        nameEdit.focus();
    };


    // Iterate over all elements in JSON object
    for ( var qassignName in tempJSON ) {

        // Create a row
        var row = document.createElement('tr');

        // set rowID to quickAssign name
        row.id = qassignName;

        // Check odd/even
        if ( count % 2 == 1 ) {
            row.style.backgroundColor = '#EFEFEF';
        }

        // Create new table cell
        var edit = document.createElement('td');

        // If possible to have a swap up action
        if ( count > 0 ) {

            // Create anchor
            var swapUp = document.createElement('a');
            swapUp.href = '#';
            swapUp.innerHTML = '<img src="/MRimg/up.gif">';

            // Onlick function performs swap and redraws menu window
            swapUp.onclick = function() {
                var number = this.parentNode.parentNode.id;
                var i = parseInt(number);

                // Sanity check
                if( i > 0 ) {
                    // Swap names
                    var temp = tempJSON[(i+'')][0];
                    tempJSON[(i+'')][0] = tempJSON[((i-1)+'')][0];
                    tempJSON[((i-1)+'')][0] = temp;

                    // Swap innerHTML for assignee
                    temp = tempJSON[(i+'')][1];
                    tempJSON[(i+'')][1] = tempJSON[((i-1)+'')][1];
                    tempJSON[((i-1)+'')][1] = temp;

                    // Unload window
                    content.removeChild(newEl);

                    // Redraw
                    makeMenu(JSON.stringify(tempJSON), itemCount);
                }

            };

            // Add swap up to edit cell
            edit.appendChild(swapUp);
        }
        // Add padding
        edit.appendChild(document.createElement('br'));

        // If possible to do a swap down
        if ( count < (itemCount-1) ) {
            // Create anchor
            var swapDown = document.createElement('a');
            swapDown.href = '#';
            swapDown.innerHTML = '<img src="/MRimg/down.gif">';

            // onclick handles swap
            swapDown.onclick = function() {
                var number = this.parentNode.parentNode.id;
                var i = parseInt(number);

                if( i < (itemCount-1) ) {
                    // Swap names
                    var temp = tempJSON[(i+'')][0];
                    tempJSON[(i+'')][0] = tempJSON[((i+1)+'')][0];
                    tempJSON[((i+1)+'')][0] = temp;

                    // Swap innerHTML
                    temp = tempJSON[(i+'')][1];
                    tempJSON[(i+'')][1] = tempJSON[((i+1)+'')][1];
                    tempJSON[((i+1)+'')][1] = temp;

                }
                // Unload window
                content.removeChild(newEl);

                // Redraw
                makeMenu(JSON.stringify(tempJSON), itemCount);

            };

            edit.appendChild(swapDown);
        } else {
            // If no option, add padding
            edit.appendChild(document.createElement('br'));
        }
        row.appendChild(edit);

        // Create table cell to hold quick assign name
        var name = document.createElement('td');
        name.onclick = editOnClick;

        name.innerHTML = tempJSON[qassignName][0];
        row.appendChild(name);

        // Create cell for remove option
        var remove = document.createElement('td');
        remove.innerHTML = '<a href="#">Remove</a>' ;

        // Onclick handler
        remove.onclick = function() {
            var number = this.parentNode.id;
            var i = parseInt(number);
            while ( tempJSON[(i+'')] ) {
                if ( tempJSON[((i+1)+'')] ) {
                    // Move next element to current position
                    tempJSON[(i+'')][0] = tempJSON[((i+1)+'')][0];
                    tempJSON[(i+'')][1] = tempJSON[((i+1)+'')][1];
                } else {
                    // Delete final element
                    delete tempJSON[(i+'')];
                }
                i++;
            }
            // Unload window
            content.removeChild(newEl);

            // Redraw
            makeMenu(JSON.stringify(tempJSON), itemCount-1);

        };

        // Add remove element to row
        row.appendChild(remove);

        // Add row to table
        contactTable.appendChild(row);

        // Increment count
        count++;
    }

    // Add table to window
    newEl.appendChild(contactTable);

    // Save button
    var saveChanges = document.createElement('input');
    saveChanges.type = 'submit';
    saveChanges.value = 'Save Changes';
    saveChanges.style.marginLeft = '25%';
    saveChanges.onclick = function() {
        // Really save values
        customQA = tempJSON;
        chrome.storage.sync.set(customQA, function() {
            // Notify that the changes are saved.
            var msg = 'Quick Assignees settings saved successfully.';
            message(msg);
            dbmsg(msg); 
        });

        // Clear old fields
        var quickAssignTD = document.getElementById('quickAssignTd');
        quickAssignTD.innerHTML = '';

        // Redraw quickassign section
        customQA = chrome.storage.sync.get('customQA',function() {
            dbmsg('Redrawing quickassing section.')
        });
        for ( var qassignName in tempJSON ) {
            addQuickAssignee(tempJSON[qassignName][0], tempJSON[qassignName][1]);
        }

    };
    // Add save button to window
    newEl.appendChild(saveChanges);

    // Reset button to restore default settings
    var reset            = document.createElement('input');
    reset.type           = 'submit';
    reset.value          = 'Load Defaults Assignees';
    reset.style.right    = '25%';
    reset.style.position = 'absolute';
    reset.onclick        = function() {
        if ( !confirm("Are you sure you want to reset the quick assignees list?") ) {
            return false;
        }

        var quickAssignTd = document.getElementById('quickAssignTd');
        quickAssignTd.innerHTML = '';
        //customQA = JSON.parse('{}');

        loadDefaults();

        for ( var qassignName in customQA ) {
            addQuickAssignee(customQA[qassignName][0], customQA[qassignName][1]);
        }

        // GM_setValue("customQA", JSON.stringify(customQA));
        chrome.storage.sync.set(customQA, function() {
            var msg = 'Quick Assignees list reset successfully.';
            message(msg);
            dbmsg(msg);
        });

        // Unload window
        content.removeChild(newEl);

        // Redraw
        makeMenu(null);
    };

    // Add save button to window
    newEl.appendChild(reset);

    // Add window to main page
    content.appendChild(newEl);
}

/**
 * This segment here is for converting older versions of the custom Assignees
 * configuration variable to the newer format.
 * 
 * ===== I don't think this section is necessary anymore =====
var doConvert = false;
// Convert old style assignees
for ( var qassignName in customQA ) {
    if ( isNaN(parseInt(qassignName)) ) {
        doConvert = true;
    }
}

if ( doConvert ) {
    var el = 0;
    var tempJSON = JSON.parse(JSON.stringify(customQA));

    customQA = JSON.parse("{}");

    for( var qassignName in tempJSON ) {
        customQA[el+""] = [ qassignName, tempJSON[qassignName] ];
        ++el;
    }

}
*/

// Get the list of assignees element
var assigneeList = document.getElementById('assgnee');

// Get the assign row by the same method as above.
var assignRow = document.getElementById('pmember').parentElement.parentElement;

// Get the label row
// Work outwards from the pmember element
var labelRow = assignRow.previousElementSibling;

// blank cell
labelRow.appendChild(document.createElement('td'));

// Create a label for the quick assign cell
var qassignLabel = document.createElement('label');
qassignLabel.htmlFor   = 'qassign';
qassignLabel.className = 'tinytext';
qassignLabel.innerHTML = 'Quick Assign';

// Add a link to launch management console
var manageA = document.createElement('a');
manageA.href = '#';
manageA.onclick = function() {
    makeMenu();
};
manageA.innerHTML = '[Manage]';

// Create quick assign label cell
var qassignLabelCell = document.createElement('td');

// Add label
qassignLabelCell.appendChild(qassignLabel);

// Add management link
qassignLabelCell.appendChild(manageA);

// Add cell to row
labelRow.appendChild(qassignLabelCell);

// Create the instant save function
var qassignSaveCell = document.createElement('td');
qassignSaveCell.innerHTML = ' <label class="tinytext"> Save </label> ';

// Create anchor
var saveAnchor = document.createElement('a');
// BEGIN saveAnchor CREATION CODE
    // Set onclick function
    saveAnchor.onclick = function() {
        var name = document.getElementById('assgnee').children[0] == null?
            'New Element':
            document.getElementById('assgnee').children[0].innerHTML;

        // Get new Assignee name
        var name = prompt('Quick assign name?',name);
        if ( name == null ) {
            return false;
        } else if ( name == '' ) {
            alert('You must enter a name!');
            return false;
       }

       // Get assignees
        var assignees = assigneeList.innerHTML;

        // Add quickAssignee
        addQuickAssignee(name, assignees);

        // Get length of JSON object
        var count = 0;
        for( var qassignName in customQA ) {
            ++count;
        }

        // Store assignee
        customQA[(count+'')] = [name, assignees];

        // Save custom assignee to Chrome sync storage
        // customQA = JSON.stringify(customQA); // I don't think this is necessary...
        chrome.storage.sync.set(customQA,function() {
            dbmsg('Saving custom assignee list.'); 
        });
        //GM_setValue("customQA", JSON.stringify(customQA));
    };

    // Create Image for graphical new assignee creation
    saveAnchor.innerHTML = '<img border="0" align="absmiddle" src="/MRimg/next.png" alt="Add Selected Users to Assignee List" id="assgnadd_image">';

    // Replicate Footprints style mouse styles
    saveAnchor.onmouseover= function() {this.style.border='2px outset threedhighlight';};
    saveAnchor.onmouseout=function() {this.style.border='none';};
    saveAnchor.onmouseup=function() {this.style.border='none';};
    saveAnchor.onmousedown=function() {
        this.style.border='2px inset threedhighlight';
    };

// END saveAnchor CREATION CODE

// Add anchor to cell
qassignSaveCell.appendChild(saveAnchor);

assignRow.appendChild( qassignSaveCell );

// Create the final cell for the assign row
var qassignCell        = document.createElement('td');
    qassignCell.id     = 'quickAssignTd';
    qassignCell.valign = 'top';
    qassignCell.align  = 'center';

/*
    Load buttons
*/
for( var qassignName in customQA ) {
    addQuickAssignee(customQA[qassignName][0], customQA[qassignName][1]);
}

// Add quick assign cell to the table row
assignRow.appendChild(qassignCell);
