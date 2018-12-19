//    API Functions -- use search params to get data from NYT API
//    and update the webpage with search results
//    ###########################################################


    // clear Results section on webpage
    function clear() {
        $('#Results').empty();
    }

    // get query URL with API call's paramaters
    function getQueryURL() {
        // API query url stored inside a variable
        var queryURL = 'https://api.nytimes.com/svc/topstories/v2/home.json?';
        // params order: API key, search term, begin date, end date, sort
        // TODO add API key
        var queryParams = { 'api-key': 'x' } // waiting for that API key to come in
        // pull text from the user search query and add to the queryParams object 'q'
        queryParams.q = $('#searchQuery').val().trim();
        // if the user provided a begin date add it to the queryParams object 'begin_date'
        var beginDate = $('#beginDate').val().trim();
        if (parseInt(beginDate)) {
            queryParams.begin_date = beginDate;
        }
        // if the user provided an end date add it to the queryParams object 'end_date'
        var endDate = $('#endDate').val().trim();
        if (parseInt(endDate)) {
            queryParams.end_date = endDate;
        }
        // if the user chose to filter results from newest/oldest add it to the queryParams object 'sort'
        // this is taking the value of the selected choice
        var sortChoice = $('#sortChoice').val().trim();
        if (parseInt(sortChoice)) {
            queryParmams.sort = sortChoice;
        }
        console.log(sortChoice);
        // return the query URL with the paramaters according to the NYT API docs
        // console.log(queryURL + $.param(queryParams));
        return queryURL + $.param(queryParams);
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
        })
        // then the fresh data gets passed as an argument to the updateContent function
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