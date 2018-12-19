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
        // params order: API key, search term, begin date, end date, sort
        var queryParams = { 'api-key': 'c43fdcb0dd074a0bb172684363bdf7bd' } 
        
        // store the #sectionChoice value in a variable to add to the queryURL
        var sectionChoice = $('#sectionChoice').val();
        
        // return the query URL with the paramaters according to the NYT API docs
        console.log(queryURL + sectionChoice + '.json?' + $.param(queryParams));
        return queryURL + sectionChoice + '.json?' + $.param(queryParams);
    }

    // search JSON results for text search input, filters results
    // filters results based on the newer or older sortChoice
    function filterResults() {

        // if the #searchQuery is not equal to null, make all letters lowercase 
        // and save in searchQuery variable
        if ( ($('#searchQuery').val().trim()) !== null ) {
            var searchQuery = $('#searchQuery').val().trim().toLowerCase();
            console.log(searchQuery);
        }
        // the searchQuery will filter the JSON objects results based on the text 
        // in the article titles and abstract

        // once the results have been filtered, they will be sorted based on the
        // sort choice, either by newest or oldest published date
        // if the #sortChoice value is not equal to null, store the value in 
        // sortChoice variable
        if ( ($('#sortChoice').val()) !== null ) {
            var sortChoice = $('#sortChoice').val();
            console.log(sortChoice);
        }
    }


    // update content of page to show new results



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
        // call getQueryURL function to gather paramaters for the AJAX request 
        // to the NYT API, put that in a variable
        var queryURL = getQueryURL();
        // make the AJAX request to the API
        // this gets the JSON data from the queryURL
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(result){
            console.log(result);
        })
        filterResults();
        // filter the result through the filterResults function -- filters results based on
        // search terms and sort choice
        // .then(filterResults(results))
        
        // then the fresh data gets passed as an argument to the updateContent function
        // .then(updateContent);
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