<script>
//GLOBAL VARS
var apiKey = 'PViDAE5Q58';
var apiUrl = 'https://secure2.convio.net/mda/site/CRTeamraiserAPI';
var eventType = 'General';
var viewportWidth = $(window).width();

$(document).ready(function(){    
    [[?[[?[[S8]]::splash::T::]][[?[[S8]]::front::T::]]::T::
        instagramFeed();
        [[?[[S151:general_feature_1]]::TRUE::
            //FEATURE PARTICPANT ROTATOR            
            $("#owl-example").owlCarousel({ 
                navigation : true, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
            var leftArrow = 'Back <div class="borderWrap"><div class="borderOutline"><div class="borderLeft"></div></div></div>';
            var rightArrow = 'Next <div class="borderWrap"><div class="borderOutline"><div class="borderLeft"></div></div></div>';
            $('.owl-prev').html(leftArrow);
            $('.owl-next').html(rightArrow);
            $('.owl-buttons > div').addClass('customBtn');
        ::
        ]]
    ::
    ]]
    // When user clicks submit button, show results from zip search rather than geo location 
    $('#zipSubmit').click(function() {
        var theInputZip = $('#inputZip').val();
        var inputType = "Zip";
        cleanResults();
        getNearbyCities(inputType,theInputZip);    
    });
    //adding onFocus of input, enter will submit api search, not able to do through form submit as could clash with login form
    $("#inputZip").keyup(function(event){
        if(event.keyCode == 13){
            $("#zipSubmit").click();
        }
    });

    [[?[[?[[S8]]::splash::T::]][[?[[S8]]::front::T::]][[?[[S8]]::events::T::]]::T::
        getLocation();
        
    ::]]

    [[?xtruex::x[[S334:allEvents]]x::
        allEvents('all', 'United States');
    ::]]

    //hide event donation link in donation search
    [[?x22180x::x[[S334:fr_id]]x::
        [[?xpfindx::x[[S334:pg]]x::
            $('#give_hdr_container').remove();
            $('.search-content').css("color","white");
        ::]]
    ::]]
    
});

function instagramFeed(){
    if (viewportWidth < 568) {
        var feedFrame = '<iframe src="https://snapwidget.com/in/?u=bWRhX3VzYXxpbnwxMjV8MXwzfHxub3w1fG5vbmV8b25TdGFydHx5ZXN8eWVz&ve=050216" title="Instagram Widget" class="snapwidget-widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:100%;"></iframe>';
        $(feedFrame).appendTo('.instagramFeed');

    }else{
        var feedFrame = '<iframe src="https://snapwidget.com/in/?u=bWRhX3VzYXxpbnwxMjV8NnwyfHxub3w1fG5vbmV8b25TdGFydHx5ZXN8eWVz&ve=050216" title="Instagram Widget" class="snapwidget-widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:100%;"></iframe>';
        $(feedFrame).appendTo('.instagramFeed');
    }

}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function getNearbyCities(inputType,theLocation){
    console.log("entered getNearbyCities ",inputType,theLocation);
    $.ajax({
      type: 'GET',
      url: apiUrl, 
      data: {
        method: 'getTeamraisersByDistance',
        api_key: apiKey,
        v: '1.0',
        starting_postal: theLocation,
        distance_units: 'mi',
        search_distance: '100',
        event_type: 'General',
        list_sort_column: 'event_date',
        list_ascending: 'true',
        response_format: 'json'
      },
      dataType: 'json'
    }).done(function(data){
        cleanResults();
        processReturnedData(data,inputType,theLocation);
    });
}
function getNearbyState(inputType,stateAbb){
    console.log("entered getNearbyState ",inputType,stateAbb);
    $.ajax({
        type: 'GET',
        url: apiUrl, 
        data: {
        method: 'getTeamraisersByInfo',
        api_key: apiKey,
        v: '1.0',
        state: stateAbb,
        event_type: 'General',
        list_sort_column: 'event_date',
        list_ascending: 'true',
        response_format: 'json'
        },
        dataType: 'json'
    }).done(function(data){
        cleanResults();
        processReturnedData(data,inputType,stateAbb);
    });    
}
function eventSearch (inputType,city) {
    console.log('entered event search ',inputType,city);
    $.ajax({
        type: 'GET',
        url: apiUrl, 
        data: {
        method: 'getTeamraisersByInfo',
        api_key: apiKey,
        v: '1.0',
        city: city,
        event_type: 'General',
        list_sort_column: 'event_date',
        list_ascending: 'true',
        response_format: 'json'
        },
        dataType: 'json'
    }).done(function(data){
        cleanResults();
        processReturnedData(data,inputType,city);
    });
}
function allEvents (inputType, country) {
    $.ajax({
        type: 'GET',
        url: apiUrl, 
        data: {
        method: 'getTeamraisersByInfo',
        api_key: apiKey,
        v: '1.0',
        country: country,
        event_type: 'General',
        list_sort_column: 'event_date',
        list_ascending: 'true',
        list_page_size: '500',
        response_format: 'json'
        },
        dataType: 'json'
    }).done(function(data){
        processReturnedData(data,inputType,country);
    });
}
function processReturnedData(data,inputType,theLocation){
    console.log(data);
    // Process array data, convert dates, build strings of upcoming and past events
    var frIdArray = new Array();
    var regUrlArray = new Array();
    var nameArray = new Array();
    var urlArray = new Array();
    var cityArray = new Array();
    var stateArray = new Array();
    var dateArray = new Array();
    var regTeamArray = new Array();
    var regIndArray = new Array();
    var locationArray = new Array();
    var mapArray = new Array();
    var mapLinkArray = new Array();
    var mapLink = new Array();
    var streetArray = new Array();
    var zipArray = new Array();
    var offsetFromNow = new Array();
    var tomorrowDate = Date.now() + 86400000; // (86400000 ms in a day) added to avoid same day event confusion.
    var excludeDate = -15552000000;  // 86400000 ms/day * 180 days
    //console.log("tomorrowDate = ",tomorrowDate);
    //console.log("excludeDate = ",excludeDate);
    
    var futureEventString = "<div id='futureEvents'>";
    var eventStringLine = "";
    var eventCounter = 0;  
    var j = 0;
    var k = 0;

    if(data.getTeamraisersResponse.totalNumberResults == "0"){
        cleanResults();
        noResults();
        
    }else if(data.getTeamraisersResponse.totalNumberResults == "1"){
        console.log('returned  1 results');
        if(data.getTeamraisersResponse.teamraiser.accepting_registrations == "true" || data.getTeamraisersResponse.teamraiser.accepting_donations == "true"){
            frIdArray[j] = data.getTeamraisersResponse.teamraiser.id;
            urlArray[j] = data.getTeamraisersResponse.teamraiser.greeting_url;
            nameArray[j] = data.getTeamraisersResponse.teamraiser.name;
            cityArray[j] = data.getTeamraisersResponse.teamraiser.city;
            stateArray[j] = data.getTeamraisersResponse.teamraiser.state;
            dateArray[j] = data.getTeamraisersResponse.teamraiser.event_date;
            regTeamArray[j] = data.getTeamraisersResponse.teamraiser.reg_new_team_url;
            regIndArray[j] = data.getTeamraisersResponse.teamraiser.reg_indiv_url;
            locationArray[j] = data.getTeamraisersResponse.teamraiser.location_name;
            streetArray[j] = data.getTeamraisersResponse.teamraiser.street_address;
            zipArray[j] = data.getTeamraisersResponse.teamraiser.zip;
            mapArray[j] = locationArray[j]+','+streetArray[j]+','+cityArray[j]+','+stateArray[j];
            mapLinkArray[j] = encodeURI(mapArray[j]);
            mapLink[j] = 'http://maps.google.com/?q='+mapLinkArray[j];
            j += 1;
        }
    }
    else{
        $.each(data.getTeamraisersResponse.teamraiser, function() {  
            console.log('returned multiple results');         
            if(this.accepting_registrations == "true" || this.accepting_donations == "true"){
                frIdArray[j] = this.id;
                urlArray[j] = this.greeting_url;
                nameArray[j] = this.name;
                cityArray[j] = this.city;
                stateArray[j] = this.state;
                dateArray[j] = this.event_date;
                regTeamArray[j] = this.reg_new_team_url;
                regIndArray[j] = this.reg_indiv_url;
                locationArray[j] = this.location_name;
                streetArray[j] = this.street_address;
                zipArray[j] = this.zip;
                mapArray[j] = locationArray[j]+','+streetArray[j]+','+cityArray[j]+','+stateArray[j];
                mapLinkArray[j] = encodeURI(mapArray[j]);
                mapLink[j] = 'http://maps.google.com/?q='+mapLinkArray[j];
                j = j+1;
            }
        });
    }
    console.log("j = ",j);
    // if j>0 we have a result, process.  If j=0 we have no result, so skip computations and proceed with closing up the divs.
    if (j > 0){ 
        var i = 0; 
        for(k = 0;k <  j; k++){
            // Split out dates manually because IE7/8 doesn't handle UTC well
            var dateStr=dateArray[k]; 
            var a=dateStr.split("T");
            var d=a[0].split("-");
            var t=a[1].split(":");
            t[2] = t[2].slice(0,2); // Chopping off trailing numbers
            var fullDate = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);    
            offsetFromNow[k] = fullDate.valueOf() - tomorrowDate.valueOf();
            dateArray[k] = (fullDate.getMonth()+1)+"."+fullDate.getDate()+"."+(fullDate.getFullYear()-2000);
            if(inputType === 'all'){
                if(cityArray[k] == null || cityArray[k] == 'None') {
                    console.log('not valid');                    
                                    
                }else{
                    if (offsetFromNow[k] < excludeDate){
                        continue;
                    }      
                    if (offsetFromNow[k] > 0){          
                        eventStringLine = "";
                        eventStringLine += "<div class='eventEntry'><div class='left'><p><a href='"+urlArray[k]+"'>"+nameArray[k]+"</a><br /><span class='eventCity'>"+cityArray[k]+", "+stateArray[k]+"</span></p></div><div class='right'><p><span class='eventDate'>"+dateArray[k]+"</span><br /><span class='eventLocation'><a target='_blank' href="+mapLink[k]+">"+locationArray[k]+"</a>&nbsp;&nbsp;<span class='addressIcon'></span></span></p></div><div class='clear'></div></div>";
                        $(eventStringLine).appendTo('.upcomingEvents');
                        i += 1;            
                    }
                }
            }else{
                if (offsetFromNow[k] < excludeDate){
                    continue;
                }      
                if (offsetFromNow[k] > 0){          
                    eventStringLine = "";
                    eventStringLine += "<div class='eventEntry'><div class='left'><p><a href='"+urlArray[k]+"'>"+nameArray[k]+"</a><br /><span class='eventCity'>"+cityArray[k]+", "+stateArray[k]+"</span></p></div><div class='right'><p><span class='eventDate'>"+dateArray[k]+"</span><br /><span class='eventLocation'><a target='_blank' href="+mapLink[k]+">"+locationArray[k]+"</a>&nbsp;&nbsp;<span class='addressIcon'></span></span></p></div><div class='clear'></div></div>";
                    $(eventStringLine).appendTo('.searchResults .container .results');
                    i += 1;            
                } 
            }          
        }
        console.log(i);
        if(i == 0) {
            cleanResults();
            noResults();
        }
    }else {
        cleanResults();
        noResults();
    } 
    if (inputType == 'searchCity') {
        //scroll up to search results for city search
        var aTag = $("a[name='results']");
        $('html,body').animate({scrollTop: aTag.offset().top},'slow');
    }      
}
function getLocation(){
  console.log("Entered getLocation");
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 'infinity'
  };
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition,showError,options);
  }
  else{
    alert("Geolocation is not supported by this browser.");
    noGeo();
  }
}
function showPosition(position) {
  console.log("Entered showPosition lat: ",position.coords.latitude);
  console.log("Entered showPosition long: ",position.coords.longitude);  
  var input = position.coords.latitude + "," + position.coords.longitude;
  var latlngStr = input.split(',', 2);
  var latlng = new google.maps.LatLng(latlngStr[0], latlngStr[1]);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'location': latlng }, function (result, status) {
    var zipCode = result[0]['address_components'][7]['short_name'];
    getNearbyCities("Zip",zipCode);
  });
}   
function showError(error){
    switch(error.code){
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      noGeo(); 
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is currently unavailable.");
      noGeo(); 
      break;
    case error.TIMEOUT:
      alert("The request to get location timed out.  Please refresh the page to use this feature.");
      noGeo(); 
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      noGeo(); 
      break;
    }
}
function cleanResults() {
  $('.searchResults .container .results .eventEntry').remove();
  $('.searchResults .container .results .upcoming').remove();
  $('#inputZip').val('');
  $('#state').val('');
}
function noResults() {
    var error = '<p class="upcoming">Your search returned no results. Please try another search by zip code to see what MDA events are happening in your community.</p>';
     $(error).appendTo('.searchResults .container .results');
}
function noGeo() {
    var error = '<p class="upcoming">Search by zip code to see what MDA General events are happening in your community.</p>';
     $(error).appendTo('.searchResults .container .results');
}

</script>