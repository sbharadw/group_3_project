//User seasrch query builder function

function buildQueryURL() {
    // queryURL is the url we'll use to query the API

    var queryURL = "https://api.foursquare.com/v2/venues/explore?venuePhotos=1&";

    // Begin building an object to contain our API call's query parameters
    // Set the API key

    var queryParams = {
        "client_id": "1HDXUDQB5L2UQQ1ZRT0KDV23AEEVVP4LI1WAP5DNBORPZ2QQ",
        "client_secret": "BOGF0MSBJTTROW4KC0CHB1G43JRKP4X0ZZ0MC0J1MUKHXZF0",
        "intent": "browse",
        "radius": "10000",
        "limit": "13",
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
        //Creating an array of the search result's venues[]
        var venueListArray = places.response.groups[0].items;
        console.log(venueListArray);

        venueListArray.forEach((item, index, arr) => {
            //to be done late - Ratings, Phone Number, URL, Image 
            var venueName = arr[index].venue.name;
            var venueCategory = arr[index].venue.categories[0].name;
            var venueAddress = arr[index].venue.location.formattedAddress[0] + ', ' + venueListArray[index].venue.location.formattedAddress[1] + ', ' + venueListArray[index].venue.location.formattedAddress[2];

            var imagePre = arr[index].venue.categories[0].icon.prefix;
            var imageSuff = arr[index].venue.categories[0].icon.suffix;
            var imageSize = "200x200";
            var localBusinessImage = imagePre + imageSize + imageSuff;


            //Create HTML elements containing which contain and display some of the selected API info. from the API response
            var section = document.querySelector('#section');
            var card = document.createElement('div');
            card.setAttribute('class', 'card text-white bg-primary mb-3');
            card.classList.add('results-card-width');
            var cardImage = document.createElement('div');
            cardImage.setAttribute('class', 'image-pro');
            var imgages = document.createElement('img');
            imgages.setAttribute('class', 'card-img-top img-responsive')
            imgages.setAttribute('alt', 'Local Businesses Image');
            var cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');
            var cardTitle = document.createElement('h5');
            cardTitle.setAttribute('class', 'card-title');
            var p1Category = document.createElement('p');
            p1Category.setAttribute('class', 'card-text');
            var p2Location = document.createElement('p');
            p2Location.setAttribute('class', 'card-text');
            var p3Rating = document.createElement('p');
            p3Rating.setAttribute('class', 'card-text');
            var url = document.createElement('a');
            url.setAttribute('class', 'class="btn btn-primary');
            url.setAttribute('href', '#')
            url.innerText = 'Check me out!';

            imgages.setAttribute('src', localBusinessImage);

            cardTitle.innerHTML = '<b>' + venueName + '</b>';

            p1Category.innerHTML = venueCategory;

            p2Location.innerHTML = venueAddress;

            card.append(cardImage, imgages, cardBody);

            cardBody.append(cardTitle, p1Category, p2Location);

            section.appendChild(card);


        })

        //Find ratings of each venue 

        ratingFinder(venueListArray);

        //Display each venue on google maps via google maps API 

        placesMaps(places);

    });

    //.then(nextPage);

    // Empty the input fields (Still need to get this working)

    //clear();


});

// YAZE CODING HERE
//Grabbing Div Element with Id of featuredLocal. 

let featuredDiv = $('#featuredLocal');

//Might add parameters of my own to reduce lengthy apiUrl. 

const apiFetch = async () =>{
    let apiUrl = 'https://api.foursquare.com/v2/venues/&client_id=3SWHQH2LO3XWS4UHXNJOUA52F5WPBLKBOVI5M2F33PXBHO4O&client_secret=I03NGIT2WZHSR2YOYJ2ETUXDG3TFNSCFAGF2BOFAVTULQDHK'
    let response = await fetch(apiUrl);
    let arr = await response.json(response)
    
    await renderData(arr);
}

// Await allows function to run asynchronous. Passing arr as a parameter that contains parsed JSON. 
// await function renderData(arr){



// }





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
    /*
       venueList.forEach((item, index, arr) => {

            var venueId = arr[index].venue.id;
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

        }) 

    */
};


//****************************************************************************************************************************************//

//Function to display local business on a map via google API 

function placesMaps(places) {

    var userAREA = places.response.geocode.center;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: userAREA
    });


    var venues = places.response.groups[0].items;

    for (var i in venues) {
        var exactLocation = venues[i];
        // place the a marker on the map
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(exactLocation.venue.location.lat, exactLocation.venue.location.lng),
            map: map
        });
    }

};



//Another way to work on this is by using Geocoder by google to get the LatLng info. by using the string input of the user 
/*

function addMarkers (venues) {

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: userAREA }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });

      

      for (var i in venues){
        var exactLocation = venues[i];       
        // place the a marker on the map
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(exactLocation.venue.location.lat,exactLocation.venue.location.lng),
            map: map
          });
    }


}

*/


//Displaying city names when user inputs the name of a city 
/*
function area () {
    var locInput = document.getElementById("user-area");
    var options = {
      types: ["(cities)"],
      componentRestrictions: {
        country: "us"
      }
    };

    var areaSuggestions = new google.maps.places.Autocomplete(locInput, options);
  }
  */