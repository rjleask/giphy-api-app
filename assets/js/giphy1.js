var App = function() {
    this.urlSwitch = true;
    this.superheroesArr = ["The Flash", "Green Lantern", "Dr.Strange", "Jubilee", "Iron Man", "Aqua Man", "Dr.Manhattan", "Gambit", "Wonder Woman", "Spawn"];
    var base = this;
    // loops through superheroes array and dynamically adds buttons 
    for (var i = 0; i < this.superheroesArr.length; i++) {
        $(".container").prepend("<button class='activity-buttons'>" + this.superheroesArr[i] + "</button>");
    }
    // added body as the parent element so future buttons created are seen with .on click
    $("body").on("click", ".activity-buttons", function() {
        $(".row").empty();
        var getButtonValue = $(this).text();
        var buttonRequest = $.get("https://api.giphy.com/v1/gifs/search?q=" + getButtonValue + "&api_key=0ced3e3233864d878eada98f0280b266&limit=10");
        buttonRequest.done(function(response) {
            // loop through response.data array of objects and append nested span and img inside divs pulling
            // out the rating and still image url so its static on load
            // added two data attributes that grab the static and animated urls and store them for future use 
            for (var i = 0; i < response.data.length; i++) {
                $(".row").prepend("<div class='img-boxes' data-srca=" + response.data[i].images.downsized.url + " " + "data-srcs =" + response.data[i].images.downsized_still.url + ">" + "<span> Rating: " + response.data[i].rating + "</span>" + "<img src=" + response.data[i].images.downsized_still.url + ">" + "</div > ");
            }
        });
    });
    $("body").on("click", "img", function() {
        // these variable hold data attributes for stilled image src and animated image src from the img-boxes divs
        var stilledUrl = $(this).parent().data("srcs")
        var animatedUrl = $(this).parent().data("srca")
            // switches between animated and stilled on click
        if (base.urlSwitch === true) {
            $(this).attr("src", animatedUrl);
            base.urlSwitch = false;
        } else {
            $(this).attr("src", stilledUrl);
            base.urlSwitch = true;
        }
    });
    $("#add-superhero").on("click", function(e) {
        // adds a superhero button of users choice
        e.preventDefault();
        // gets the value of the input and trims off the white space
        var getSportValue = $("#super-input").val().trim();
        // adds the button to the top of the container element
        $(".container").prepend("<button class='activity-buttons'>" + getSportValue + "</button>");
    });
};

var myApp = new App();
