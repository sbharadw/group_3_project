function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.foursquare.com/v2/venues/search?";
  
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = { "client_id": "1HDXUDQB5L2UQQ1ZRT0KDV23AEEVVP4LI1WAP5DNBORPZ2QQ",
                        "client_secret": "BOGF0MSBJTTROW4KC0CHB1G43JRKP4X0ZZ0MC0J1MUKHXZF0", 
                        "intent": "browse",
                        "radius": "20000",
                        "limit": "5",
                        "offset": "0",
                        "v": "20190425"
                       };
  
    // Grab user input add to the queryParams object
    queryParams.query = $("#user-search").val().trim();
  
    // Grab user provided City/Zipcode, include it in the queryParams object
    queryParams.near = $("#user-area").val().trim();

  
    // Logging the URL 
    console.log("---------------\nURL: " + queryURL + "\n---------------");

    console.log("------------------------------------\nTHIS API PARAM WAS BUILT BY USER INPUT: " + queryURL + $.param(queryParams) + "\n-----------------------------------");
    return queryURL + $.param(queryParams);
  }



  //Function to clear the input fields (Still need to get this working) 
  function clear() {
    $('#clear-input').empty();
  }




  $("#user-submit").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // Build the query URL for the ajax request to Four Square
    var query = buildQueryURL();

    var settings = {
        "url": query,
        "method": "GET",
        "timeout": 0,
    };
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the nextPage function
    $.ajax(settings).done(function (response) {
        console.log(response);
      });
    //.then(nextPage);

    // Empty the input fields (Still need to get this working)
    //clear();
  });



 // DO NOT TOUCH FOR NOW!!  
/*

var settings = {
    "url": "https://api.foursquare.com/v2/venues/search?client_id="+ clientId + "&client_secret=" + secret + "&v=20190425&near=44240&intent=browse&radius=20000&query=Grocery&limit=5&offset=0",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  */