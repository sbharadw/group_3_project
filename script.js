//Shoelace CSS Notifier
const container = document.querySelector('.alert-toast-wrapper');
let count = 0;
// Always escape HTML for text arguments!
function escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}
// Custom function to emit toast notifications
function notify(message, type = 'danger', icon = 'info-circle', duration = 3000) {
    const alert = Object.assign(document.createElement('sl-alert'), {
        type: type,
        closable: true,
        duration: duration,
        innerHTML: `<sl-icon name="${icon}" slot="icon"></sl-icon> ${escapeHtml(message)}`
    });
    document.body.append(alert);
    return alert.toast();
}
//User seasrch query builder function
function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.foursquare.com/v2/venues/explore?";
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = {
        "client_id": "1HDXUDQB5L2UQQ1ZRT0KDV23AEEVVP4LI1WAP5DNBORPZ2QQ",
        "client_secret": "BOGF0MSBJTTROW4KC0CHB1G43JRKP4X0ZZ0MC0J1MUKHXZF0",
        "intent": "browse",
        "radius": "10000",
        "limit": "2",
        "offset": "0",
        "v": "20190425"
    };
    if ($("#user-search").val() && $("#user-area").val()) {
        // Grab user input add to the queryParams object
        queryParams.query = $("#user-search").val().trim();
        // Grab user provided City/Zipcode, include it in the queryParams object
        queryParams.near = $("#user-area").val().trim();
        // Logging the URL 
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        console.log("---------------\nTHIS API PARAM WAS BUILT BY USER INPUT: " + queryURL + $.param(queryParams) + "\n---------------");
        return queryURL + $.param(queryParams);
    } else {
        notify(`Both input boxes are required fields!`);
    }
}
//****************************************************************************************************************************************//
//Function to clear search results and map results. 
function clear() {
    $("#section").empty();
    $("#map").empty();
}
//****************************************************************************************************************************************//
//User search submit button eventlistner 
$("#user-submit").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    // Empty the input fields (Still need to get this working)
    clear();
    // Build the query URL for the ajax request to Four Square
    var query = buildQueryURL();
    var settings = {
        "url": query,
        "method": "GET",
        "timeout": 0,
    };
    // Make the AJAX request to the FourSquare basic API to get basic info. on search based venues
    $.ajax(settings).done(function (places) {
        // Logging that we are getting API response here 
        console.log(places);
        //Creating an array of the search result's venues[]
        var venueListArray = places.response.groups[0].items;
        console.log(venueListArray);
        venueListArray.forEach((item, index, arr) => {
            var venueId = arr[index].venue.id;
            console.log(venueId);
            var venueName = arr[index].venue.name;
            var venueCategory = arr[index].venue.categories[0].name;
            var venueAddress = arr[index].venue.location.formattedAddress[0] + ', ' + venueListArray[index].venue.location.formattedAddress[1] + ', ' + venueListArray[index].venue.location.formattedAddress[2];
            //Create HTML elements which contain and display some of the selected API info. from the API response
            var section = document.querySelector('#section');
            var card = document.createElement('div');
            card.setAttribute('class', 'card text-white bg-primary mb-3');
            card.classList.add('results-card-width');
            //var cardImage = document.createElement('div');
            //cardImage.setAttribute('class', 'image-pro');
            var cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');
            var cardTitle = document.createElement('h5');
            cardTitle.setAttribute('class', 'card-title');
            var p1Category = document.createElement('p');
            p1Category.setAttribute('class', 'card-text');
            var p2Location = document.createElement('p');
            p2Location.setAttribute('class', 'card-text');
            cardTitle.innerHTML = '<b>' + venueName + '</b>';
            p1Category.innerHTML = venueCategory;
            p2Location.innerHTML = venueAddress;
            card.append(cardBody);
            cardBody.append(cardTitle, p1Category, p2Location);
            section.append(card);

            //Getting rating, url, and phone number from the FourSquare premium API
            var settingsTwo = {
                "url": "https://api.foursquare.com/v2/venues/" + venueId + "?client_id=1HDXUDQB5L2UQQ1ZRT0KDV23AEEVVP4LI1WAP5DNBORPZ2QQ&client_secret=BOGF0MSBJTTROW4KC0CHB1G43JRKP4X0ZZ0MC0J1MUKHXZF0&v=20190425",
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(settingsTwo).done(function (localBusiness) {
                console.log(localBusiness);
                var phoneNumber = localBusiness.response.venue.contact.formattedPhone;
                var imagePre = localBusiness.response.venue.bestPhoto.prefix;
                var imageSuff = localBusiness.response.venue.bestPhoto.suffix;
                var imageSize = "286x180";
                var localBusinessImage = imagePre + imageSize + imageSuff;
                var businessRating = localBusiness.response.venue.rating;
                console.log(businessRating);
                var venueSite = localBusiness.response.venue.shortUrl;
                var imgages = document.createElement('img');
                imgages.setAttribute('class', 'card-img-top img-responsive')
                imgages.setAttribute('alt', 'Local Businesses Image');
                var contact = document.createElement('p');
                contact.setAttribute('class', 'card-text');
                contact.innerHTML = phoneNumber;
                var p3Rating = document.createElement('p');
                p3Rating.setAttribute('class', 'card-text');
                p3Rating.innerHTML = businessRating;
                var url = document.createElement('a');
                url.setAttribute('class', "btn btn-primary");
                url.setAttribute('target', '_blank');
                url.setAttribute('href', venueSite);
                url.innerText = 'Check me out!';
                imgages.setAttribute('src', localBusinessImage);
                card.prepend(imgages);
                cardBody.append(contact, p3Rating, url);
            });
        })
        //Display each venue on a map via google maps API 
        placesMaps(places);
    });
});


//****************************************************************************************************************************************//
//Use of Foursquare API for featured.html page
const apiFetch = async () => {
    const clientId = `&client_id=3SWHQH2LO3XWS4UHXNJOUA52F5WPBLKBOVI5M2F33PXBHO4O`
    const clientSecret = `&client_secret=I03NGIT2WZHSR2YOYJ2ETUXDG3TFNSCFAGF2BOFAVTULQDHK`;
    const v = `&v=20190425`;
    const radius = `&radius=10000`;
    const limit = `&limit=6`;
    const offset = `&offset=0`;
    const near = `&near=DC`;
    let url = `https://api.foursquare.com/v2/venues/explore/?${clientId}${clientSecret}${v}${radius}${limit}${offset}${near}`;
    let response = await fetch(`${url}`);
    let data = await response.json(response);
    await renderData(data);
}
apiFetch()
// button.onclick = apiFetch;
async function renderData(data) {
    for (let i = 0; i < 5; i++) {
        var card = `
                    <div id='cardContainer'>
                <div class="row">
                    <div class="col">
                       <div class="card">
                       <h2>${data.response.groups[0].items[i].venue.name}</h2>
                                     <img src="Images/stores.jpg"
                                        class="card-img-top" alt="..."/>
                               </div>
                           <div class="col">
                               <div class="card-body">
                                 <p class="card-text">
                                      <strong>Address:</strong><br>
                                        ${data.response.groups[0].items[i].venue.location.formattedAddress}, <br>
                                              </p>
                            </div>
                          </div>
                      </div>
                  </div>   
               </div> 
`
        document.querySelector('#body').innerHTML += card;
    }
}



//****************************************************************************************************************************************//
//Function to display local businesses on a map via google maps API 
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



//****************************************************************************************************************************************//
//Helpful code for future use 
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


//Displaying city names when user inputs the name of a city

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