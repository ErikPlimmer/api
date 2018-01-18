var animalArray =["monkey", "lion", "hamster", "snake"];

//call renderButtons function

function renderButtons() {
	
	$("#buttons").empty();
 console.log("array is" , animalArray);
	for (var i=0; i < animalArray.length; i++){

	    var a = $("<button>");
	    // Adding a class
	    a.addClass("animal");
	    // Adding a data-attribute with a value of the array at index i
	    a.attr("data-name", animalArray[i]);
	    // Providing the button's text with a value of the array at index i
	    a.text(animalArray[i]);
	    // Adding the button to the HTML
	    $("#buttons").append(a);
  	}
}// renderButtons function end
renderButtons();


$("#add-button").on("click", function(event) {
	 event.preventDefault();
	  var input = $("#button-input").val().trim();
	  animalArray.push(input);
	  $("#button-input").val("");
renderButtons();


});

 $(document).on("click", ".animal", function (event) {
	    event.preventDefault();

	    var input = $(this).attr("data-name");
	    // Here we construct our URL
	    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=JVLv3VEF12LSVuKjtAyPRJqws2Xvg2pO&limit=10";
	   
	   console.log(queryURL);

	    $.ajax({
	    url: queryURL,
	    method: "GET"
	  }).done(function(response) {

  			var results = response.data;

	        $("#results").append(response);

	for (var i = 0; i < results.length; i++) {
	   	 
	   	 var animalDiv = $("<div>");

			var rating = results[i].rating;

          	var p = $("<p>").text("Rating: " + rating);

          	var animalImage = $("<img>");
          	animalImage.attr("src", results[i].images.fixed_height_still.url);
          	animalImage.addClass("thing");
            animalImage.attr({'data-animate' : results[i].images.fixed_height.url});
            animalImage.attr({'data-state' : "still"});
            animalImage.attr({'data-still' : results[i].images.fixed_height_still.url});


         	 animalDiv.prepend(p);
        	 animalDiv.prepend(animalImage);

        	  $("#results").prepend(animalDiv);

        	  // console.log("data state is" , response.data-state);
        	  console.log("results is" , results[i]);
        	  console.log("input is" ,input);


    }
    	$(".thing").on("click", function() {
          		console.log("in the click image");
          	var state = $(this).attr("data-state");
				  if (state === "still") {
				    $(this).attr("src", $(this).attr("data-animate"));
				    $(this).attr("data-state", "animate");
				  } else {
				    $(this).attr("src", $(this).attr("data-still"));
				    $(this).attr("data-state", "still");
				  }
				});// thing function end 
    		
  });//done

          
});

