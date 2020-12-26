//User seasrch query builder function

function buildQueryURL() {
    // queryURL is the url we'll use to query the API

    var queryURL = "https://api.foursquare.com/v2/venues/search?";

    // Begin building an object to contain our API call's query parameters
    // Set the API key

    var queryParams = {
        "client_id": "1HDXUDQB5L2UQQ1ZRT0KDV23AEEVVP4LI1WAP5DNBORPZ2QQ",
        "client_secret": "BOGF0MSBJTTROW4KC0CHB1G43JRKP4X0ZZ0MC0J1MUKHXZF0",
        "intent": "browse",
        "radius": "20000",
        "limit": "3",
        "offset": "5",
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


//****************************************************************************************************************************************//


//Function to clear the input fields (Still need to get this working) 

function clear() {

    $('#clear-input').empty();

}


//****************************************************************************************************************************************//

//User search submit button eventlistner 

$("#user-submit").on("click", function (event) {

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

    $.ajax(settings).done(function (places) {

        // Logging that we are getting API response here 

        console.log(places);

        //Create the search results plage here 




    

        //Run this function to get ratings 

        var venueListArray = places.response.venues;
        console.log(venueListArray);
        ratingFinder(venueListArray);
        
    });

    //.then(nextPage);

    // Empty the input fields (Still need to get this working)

    //clear();


});


//****************************************************************************************************************************************//

//Get images of the locations via Google API 

/*
var imageURL = "https://maps.googleapis.com/maps/api/streetview?size=350x350&location=41.15534232485074,-81.35807997085445&size=456x456&fov=60&heading=70&pitch=0&key=AIzaSyBcdEQ1k7qY05LUQ9BK5byzXlguE7S0d2U"

$.ajax({
    type: "Get",
    url: imageURL,
          
    
}).then(function(response){

console.log(response)

});
*/


//****************************************************************************************************************************************//


//Function to get rating from the Details venue API provided by Four Square

function ratingFinder(venueList) {

   /* venueList.forEach((item, index, arr) => {

        var venueId = arr[index].id;
        console.log(venueId);

        var settingsTwo = {
            "url": "https://api.foursquare.com/v2/venues/" + venueId + "?client_id=1HDXUDQB5L2UQQ1ZRT0KDV23AEEVVP4LI1WAP5DNBORPZ2QQ&client_secret=BOGF0MSBJTTROW4KC0CHB1G43JRKP4X0ZZ0MC0J1MUKHXZF0&v=20190425",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settingsTwo).done(function (localBusiness) {
            console.log(localBusiness);

            var businessName = localBusiness.response.venue.name;

            var businessRating = localBusiness.response.venue.rating;

            console.log(businessName + ": " + businessRating);

        });

    }) */

    placesMaps(venueList);

};


//****************************************************************************************************************************************//

//Function to display local business on a map via google API 

function placesMaps(venues) {

    var userAREA = $("#user-area").val();

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -34.397, lng: 150.644 },
        
      });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: userAREA }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });

      for (var i in venues){
        var venue = venues[i];       
        // place the a marker on the map
        marker = new google.maps.Marker({

            position: new google.maps.LatLng(venue.location.lat,venue.location.lng),
            map: map
          });
    }

};