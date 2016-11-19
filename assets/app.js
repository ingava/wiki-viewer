window.onload = function(){

    // search on ENTER
    $("#query").keypress(function (e) {
        if (e.which == 13) {
            $("#query").val("");
            $("#resultList").text("");

            // connect to API with user input
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=" + encodeURI(query) + "&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max",
                dataType: "jsonp", // to avoid CORS problem
                type : 'GET',
                headers: {"X-Test-Header": "test-value"},
                success: function(data){
                    var searchResults = data.query.pages;
                    $.each(searchResults, function(index, value) {
                        // append search results to a div
                        $("#resultList").append('<div class="resultItem"><a class="resultTitle" href="https://en.wikipedia.org/wiki/' + encodeURI(value.title) + '"target="_blank">' + value.title + '</a><p>' + value.extract + '...' + '</p></div>');
                    });
                },
                error: function(jqXHR, textStatus, error) {
                    console.log(error);
                }
            });
        } else {
            console.log("something's not working");
        }
    });
};
