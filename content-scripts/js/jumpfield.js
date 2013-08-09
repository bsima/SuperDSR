//Session key for footprints

var MRPvalue = getElementsByName("MRP")[0].value;


var oMenu;
var menuItems;   
        
YAHOO.util.Event.onContentReady("splitbuttonfrommarkup", function () {
  menuItems = [ 
    { text: "Title", 
      value: "TITLE", 
      checked: ("KEYWORD" == "TITLE"), 
      onclick: { fn: onAdvancedSearchMenuClick } 
    },  
    { text: "Keyword", 
      value: "KEYWORD", 
      checked: ("KEYWORD" == "KEYWORD"), 
      onclick: { fn: onAdvancedSearchMenuClick } 
    }
 
  ];

  oMenu = new YAHOO.widget.Menu("basicmenu", { itemdata: menuItems, zindex: 2000});

  oMenu.render('QuickSearchMenu');

  var oSplitButton1 = new YAHOO.widget.Button("splitbutton1", { type: "split",
                                                                menu: oMenu,
                                                                onclick: { fn: submitQuickSearch },
                                                                title: "See Advanced Search for a list of fields included in Keyword search"
                                                              }                                
  );

  oSplitButton1.SPLITBUTTON_DEFAULT_TITLE = "See Advanced Search for a list of fields included in Keyword search";
  oSplitButton1.SPLITBUTTON_OPTION_VISIBLE_TITLE = "Search";

  //  "click" event listener for the Button's Menu instance 
  var onAdvancedSearchMenuClick = function (p_sType, p_aArgs) { 
 
    var oEvent = p_aArgs[0],    //  DOM event 
    oMenuItem = p_aArgs[1]; //  MenuItem instance that was the target of the event  
    if (oMenuItem) {               
       document.quickSearch.WSEARCH.value = oMenuItem.value;

       for(var i=0; i<=menuItems.length-1; i++) {
          oMenu.getItem(i).cfg.setProperty("checked", false);  
       }
    
       oMenuItem.cfg.setProperty("checked", true);
    
       submitQuickSearch();
    }      
  }; 
 
  //  Add a "click" event listener for the Button's Menu   
  oSplitButton1.getMenu().subscribe("click", onAdvancedSearchMenuClick);
});
        

function showNumaraAmpSearchWindow(searchTerms) {
  // Escape the search terms so when they are passed as the URL query string, they work correctly.
  searchTerms = encodeURIComponent(searchTerms);
  
  //read the settings from the cookie.
  var cookieStr = "homepageNampSearchWindowbwshelp";
  var jsonStr = YAHOO.util.Cookie.get(cookieStr);
  var oWindowAttrs;
  if (jsonStr)
  {
     oWindowAttrs = YAHOO.lang.JSON.parse(jsonStr);
  }
  else
  {
      var nampSearchWindowHeight = 650;
      var nampSearchWindowWidth = 850;
      
      var nampSearchWindowLeft = (screen.availWidth - nampSearchWindowWidth)/2;
      if (nampSearchWindowLeft < 0)
      {
          nampSearchWindowLeft  = 0;
      }
      
      var nampSearchWindowTop =  (screen.availHeight - nampSearchWindowHeight)/2;
      if (nampSearchWindowTop < 0)
      {
          nampSearchWindowTop  = 0;
      }
     
     //default window size
     oWindowAttrs = {
        Width: nampSearchWindowWidth
       ,Height: nampSearchWindowHeight
       ,Top: nampSearchWindowTop
       ,Left: nampSearchWindowLeft
     };
  }

  var nampSearchWindowAttributes = 
      'toolbar=no,'      + 
      'location=no,'     + 
      'directories=yes,' +
      'resizable=yes,'   + 
      'scrollbars=yes,'  +
      'status=no,'       +  
      'width='           + oWindowAttrs.Width  + ',' +
      'height='          + oWindowAttrs.Height + ',' +
      'left='            + oWindowAttrs.Left   + ',' +
      'top='             + oWindowAttrs.Top;
  
  var searchResultsUrl =
      'MRNampSearchResults.pl?' +
      'NAMP_SEARCH_TERMS='      + searchTerms                          + '&' +
      'USER='                   + escape(document.quickSearch.USER.value)      + '&' +
      'PROJECTID='              + escape(document.quickSearch.PROJECTID.value) + '&' +
      'MRP='                    + escape(document.quickSearch.MRP.value);               
  
  var searchResultsWindow = window.open(searchResultsUrl, 'NampSearchResults', nampSearchWindowAttributes);
  searchResultsWindow.focus();


}
     
function submitQuickSearch() {  
   
   document.quickSearch.SEARCHS.value = document.quickSearch.SEARCHS.value.replace(/^\s+|\s+$/g, '');
   var searchValue = document.quickSearch.SEARCHS.value;

   if (!searchValue || !searchValue.match(/\S/))
      return;

   if (document.quickSearch.WSEARCH.value == 'NAMP') {
      showNumaraAmpSearchWindow(searchValue);
      return;
   }

   // detect numeric input
   // one number, no delimiters. Just load details page. No form submit.
   if (searchValue.match(/^\d+$/)) {

      var number = parseInt(searchValue, 10);
      if (number < 1)
         return alert('All Ticket numbers must be positive integers.');


      var url  = '/MRcgi/MRTicketPage.pl?USER=bwshelp&PROJECTID=2&MRP=QWIU1bLE&MAXMININC=&MAJOR_MODE=DETAILS&RUNNING_IN_POPUP=1';
      url += '&MR=' + number;

      if ('multiWindowMode' && true)
         window.open(url,
                     'details' + number,
                     'top=50,left=75,scrollbars=yes,toolbar=yes,status=yes,navigation=no,height=' + (screen.availHeight * 0.75) + ',width=' + (screen.availWidth * 0.85) + ',resizable=yes');
      else
         self.location = url;

      return;
   }
   else if (searchValue.match(/^(\d+,*\s*)+$/)) {

      // in case spaces used as delimeter switch space to comma
      searchValue = searchValue.replace(/,?\s+/g, ',');
      var nums = searchValue.split(',');
    
      // eliminate nulls from the results of the split
      var goodNums = new Array();
      for (var i = 0; i < nums.length; i++)
         if (nums[i] > 0)
            goodNums.push(nums[i]);
      searchValue = goodNums.join(',');      

      document.quickSearch.WSEARCH.value = 'NUM';
      appendHidden(document.quickSearch, 'MR', searchValue);
   }
   else if (document.quickSearch.WSEARCH.value == 'ASSIGNEE') {
      appendHidden(document.quickSearch, 'ASSIGNEDTO', searchValue );
   }
   else if (document.quickSearch.WSEARCH.value == 'TITLE') {
      appendHidden(document.quickSearch, 'TITLE', searchValue);
   }
   else if (document.quickSearch.WSEARCH.value == 'KEYWORD') {
      appendHidden(document.quickSearch, 'KEYWORDPHRASE', searchValue);
   }
   else if (document.quickSearch.WSEARCH.value == 'SLB_CUSTOM_ISSUE_NUMBER') {
      // we are searching on SLB_CUSTOM_ISSUE_NUMBER and it must be an int
      if (isNaN(searchValue))
         return alert("Please enter a positive integer number");
      // further treatment of the search string will occur after form is submitted
   }
   else if (document.quickSearch.WSEARCH.value == 'CUSTOM') {
      null;
      // further treatment of the search string will occur after form is submitted
   }

   document.quickSearch.submit();
}
     
function appendHidden(formRef, name, value) {
   var newInput = document.createElement('input');
   newInput.setAttribute('name', name);
   newInput.setAttribute('type', 'hidden');
   newInput.setAttribute('value', value);
   formRef.appendChild(newInput);
}