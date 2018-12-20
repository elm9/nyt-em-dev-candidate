//    API Functions -- use search params to get data from NYT API
//    and update the webpage with search results
//    ###########################################################


    // clear Results section on webpage
    function clear() {
        $('#Results').empty();
    }

    // get query URL with API call's paramaters -- article section choice
    function getQueryURL() {
        // API query url stored inside a variable
        var queryURL = 'https://api.nytimes.com/svc/topstories/v2/';
        // store the #sectionChoice value in a variable to add to the queryURL
        var sectionChoice = $('#sectionChoice').val().trim();
        // params order: API key, search term, begin date, end date, sort
        var queryParams = { 'api-key': 'c43fdcb0dd074a0bb172684363bdf7bd' } 
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
        if ( ($('#searchQuery').val().trim()) !== null ) {
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
    // update content of page to show new results
    function updateContent () {
        // a loop to define the number of articles, reformat each publish date, and build a card for each article
        for (var i = 0; i < filteredResults.length; i++) {
            // number of results
            var numResults = filteredResults.length;
            // article number
            var numArticle = i + 1;
            // vars for the title, abstract, URL, published date, and image URL
            var title = filteredResults[i].title;
            var abstract = filteredResults[i].abstract;
            var articleURL = filteredResults[i].short_url;
            var imageURL = filteredResults[i].multimedia[0].url;
            // this is where the date is reformatted
            var published = filteredResults[i].published_date;
            // split the published_date string
            var date = published.split('');
                console.log(date);
            
            // console.log(numArticle + '\n' + title + '\n' + abstract + '\n' + articleURL + '\n' + imageURL + '\n' + published);

            
            // function formatPublished(published) {
                
            // }
            // formatPublished();
            // if there is an imageURL add image to card
            // if (imageURL !== undefined) {

            // } 
        }
    }


//    click handler listening for the search button click to 
//    clear the article section and make the AJAX request to the 
//    NYT API, then update the page
//    ###########################################################

    // the .on('click') function for the search button
    $('#searchBtn').on('click', function(event) {
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
        }).done(function(result){
            // filter the result through the filterResults function -- filters results based on
            // search terms and sort choice
            // console.log(result);
            filterResults(result)
        }).then(updateContent); // then the fresh data gets passed as an argument to the updateContent function
    });



//    These are here to make a couple of Materialize form components work
//    ###################################################################

    // The page listener for Materialize date picker
    $(document).ready(function(){
        $('.datepicker').datepicker();
    });
    // The page listener for Materialize form select
    $(document).ready(function(){
        $('select').formSelect();
        // hey I found $5
        console.log('[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]')
    });