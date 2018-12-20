//    API Functions -- use search params to get data from NYT API
//    and update the webpage with search results
//    ###########################################################


// clear Results section on webpage
function clear() {
    $('#Results').empty();
    $('#textCenter').empty();
}

// get query URL with API call's paramaters -- article section choice
function getQueryURL() {
    // API query url stored inside a variable
    var queryURL = 'https://api.nytimes.com/svc/topstories/v2/';
    // store the #sectionChoice value in a variable to add to the queryURL
    var sectionChoice = $('#sectionChoice').val().trim();
    // params order: API key, search term, begin date, end date, sort
    var queryParams = {
        'api-key': 'c43fdcb0dd074a0bb172684363bdf7bd'
    }
    // return the query URL with the paramaters according to the NYT API docs
    return queryURL + sectionChoice + '.json?' + $.param(queryParams);
}

// an empty array to hold the new filtered results
var filteredResults = [];
// search JSON results for text search input, filters results
// filters results based on the newer or older sortChoice
function filterResults(result) {
    // results is the location of the search results in the json object
    var results = result.results;
    // if the #searchQuery is not equal to null, make all letters lowercase 
    // and save in searchQuery variable
    if (($('#searchQuery').val().trim()) !== null) {
        var searchQuery = $('#searchQuery').val().trim().toLowerCase();
        // console.log(searchQuery);
        // the searchQuery will filter the JSON objects results based on the text 
        // in the article titles and abstract
        for (var i = 0; i < results.length; i++) {
            // a couple of variables for the titles and abstracts of all results
            // .toLowerCase makes the search case insensitive 
            var resTitle = (results[i].title).toLowerCase();
            var resAbstract = (results[i].abstract).toLowerCase();

            // if statement to check if the searchQuery matches anything from resTitle OR resAbstract
            if ((resTitle.indexOf(searchQuery) > -1) || (resAbstract.indexOf(searchQuery) > -1)) {
                // push the results of the search to the filteredResults array
                filteredResults.push(results[i]);
            }
        }
    }
    return filteredResults;
}

// generates cards with article content
function genCard() {
    // a loop to define the number of articles, reformat each publish date, and build a card for each article
    for (var i = 0; i < filteredResults.length; i++) {

        // number of results
        var numResults = filteredResults.length;
        // vars for the title, abstract, URL, and article number
        var title = filteredResults[i].title;
        var abstract = filteredResults[i].abstract;
        var articleURL = filteredResults[i].short_url;
        var numArticle = i + 1;
        // ##############################################################
        // this is where the date is reformatted using moment.js
        // get the published_date from article in default timezone
        var published = filteredResults[i].published_date;
        // pull the date and time from the published string and stick the date and time together in a format that works with moment.js in est variable
        var est = (published.slice(0, 10)) + ' ' + (published.slice(11, 16));
        // convert the EST date/time to UTC
        var utcFull = moment.tz(est, 'America/Toronto').utc().format();
        // pull the date and time from the string again and stick together in utc variable
        var utc = (utcFull.slice(0, 10)) + ' ' + (utcFull.slice(11, 16));
        // use Moment.js to convert timezone to fiji time and format 
        var fiji = moment.tz(utc, 'Pacific/Fiji').format('M/D/YYYY  h:mm  A  FJT');
        // var fiji is the new date variable
        // ##############################################################

        // if statement for showing first 10 articles
        if (numArticle <= 10) {
            // now take the extracted information from the results and push them into cards 
            // create a div and add the class col s12 m6 l4
            var articleCard = $('<div>');
            articleCard.addClass('col s12 l6');
            // appends the article card to the Results section of the page
            $('#Results').append(articleCard);

            // add div content to a new variable beginning with the title
            var cardContent = $('<div class = "card horizontal z-depth-5"> \n <div class="card-stacked"> \n <div class ="card-content"> \n <h5 class = "header">' +
                title + '</h5>\n <p class ="abstract">' +
                abstract +
                '</p> \n <div class ="card-action artLink"> \n <a class = "btn-floating halfway-fab waves-effect waves-yellow deep-orange z-depth-4" href ="' +
                articleURL +
                '" target="_blank"> <i class = "material-icons">link</i> </a> \n </div> \n <p>' +
                fiji +
                '</p> </div>\n </div> \n </div> \n </div>');

            // append card content to the articleCard
            articleCard.append(cardContent);
        }

        // an on click listener waiting for the moreBtn to be clicked, pushing the rest of the results to the page
        $('#moreBtn').on('click', function () {
            // now take the extracted information from the results and push them into cards 
            // create a div and add the class col s12 m6 l4
            var articleCard = $('<div>');
            articleCard.addClass('col s12 l6');

            $('#Results').append(articleCard);

            // add div content to a new variable beginning with the title
            var cardContent = $('<div class = "card horizontal z-depth-5"> \n <div class="card-stacked"> \n <div class ="card-content"> \n <h5 class = "header">' +
                title + '</h5>\n <p class ="abstract">' +
                abstract +
                '</p> \n <div class ="card-action artLink"> \n <a class = "btn-floating halfway-fab waves-effect waves-yellow deep-orange z-depth-4" href ="' +
                articleURL +
                '"  target="_blank"> <i class = "material-icons">link</i> </a> \n </div> \n <p>' +
                fiji +
                '</p> </div>\n </div> \n </div> \n </div>');

            // append card content to the articleCard
            articleCard.append(cardContent);
            // update the textCenter
            $('#textCenter').empty();
            $('#textCenter').append('<h4>Here are all ' + numResults + ' results.</h4>')
        })
    }
}

// update content of page to show new results
function updateContent() {
    // number of results
    var numResults = filteredResults.length;
    // append the total number of results to the #Results div -- the message changes depending on the number of results
    if (numResults > 10) {
        $('#textCenter').append('<div class = "bgText"><h4 id="numResults">' + numResults + ' results were found. These top ten articles are the most interesting.</h4></div> \n <button class="btn-large waves-effect waves-red amber lighten-2 black-text z-depth-4" id="moreBtn" type="submit">Okay, show me more.</button>');
    } else if (numResults < 10 && numResults > 0) {
        $('#textCenter').append('<div class = "bgText"><h4 id="numResults">' + numResults + ' results were found, here they are.</h4></div>');
    } else {
        $('#textCenter').append('<div class = "bgText"><h4 id="numResults">' + numResults + ' results were found. Try changing the search parameters.</h4></div>');
    }
    // calls the genCard function
    genCard();

}

//    click handler listening for the search button click to 
//    clear the article section and make the AJAX request to the 
//    NYT API, then update the page
//    ###########################################################

// the .on('click') function for the search button
$('#searchBtn').on('click', function (event) {
    // event.preventDefault prevents the page from reloading on form submit
    event.preventDefault();
    // call the clear function to empty the results div
    clear();
    // empty the filteredResults div
    filteredResults = [];
    // call getQueryURL function to gather paramaters for the AJAX request 
    // to the NYT API, put that in a variable
    var queryURL = getQueryURL();
    // make the AJAX request to the API
    // this gets the JSON data from the queryURL
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (result) {
        // filter the result through the filterResults function -- filters results based on
        // search terms and sort choice
        filterResults(result)
    }).then(updateContent); // then the fresh data gets passed as an argument to the updateContent function
});


//    These are here to make a couple of Materialize form components work
//    ###################################################################

// The page listener for Materialize date picker
$(document).ready(function () {
    $('.datepicker').datepicker();
});
// The page listener for Materialize form select
$(document).ready(function () {
    $('select').formSelect();
    // hey I found $5
    console.log('[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]')
});