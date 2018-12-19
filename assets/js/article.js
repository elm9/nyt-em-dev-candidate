//    API Functions -- use search params to get data from NYT API
//    and update the webpage with search results
//    ###########################################################


// clear Results section on webpage
function clear() {
    $('#Results').empty();
}

// get query URL with API call's paramaters

// update page to show new results



//    click handler listening for the search button click to 
//    clear the article section and make the AJAX request to the 
//    NYT API, then update the page
//    ###########################################################

// added dummy button I'm going to delete to test out my clear function
// ---- it works
$('#clearBtn').on('click', function (event) {
    event.preventDefault();
    clear();
})

//    These are here to make a couple of Materialize form components work
//    ###################################################################

        // The page listener for Materialize date picker
        $(document).ready(function(){
            $('.datepicker').datepicker();
        });
        // The page listener for Materialize form select
        $(document).ready(function(){
            $('select').formSelect();
        });