var animalArray =["monkey", "lion", "beaver", "snake"];


function renderButtons() {
	
	$("#buttons").empty();

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

//call renderButtons function
renderButtons();
  // =================================================================



 // This .on("click") function will trigger the AJAX Call
 $(".animal").on("click", function giphy(event) {
 			

	    event.preventDefault();

	     var input = $(this).attr("data-name");
	    // Here we construct our URL
	    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=JVLv3VEF12LSVuKjtAyPRJqws2Xvg2pO&limit=10";
	   console.log(queryURL);


	    $.ajax({
	    url: queryURL,
	    method: "GET"
	  }).done(function(response) {

  			var results = response.data;

	        $("#results").append(response);

	for (var i = 0; i < results.length; i++) {
	   	 
			var rating = results[i].rating;

          	var p = $("<p>").text("Rating: " + rating);

          	var animalImage = $("<img>");
          	animalImage.attr("src", results[i].images.fixed_height.url);

         	 $("#results").prepend(p);
        	  $("#results").prepend(animalImage);

        	  console.log("results is" , results[i]);
        	  console.log("input is" ,input);


    }
    		
    	
	        

	

  });//click event function end 

  $("#add-button").on("click", function(event) {
 		    event.preventDefault();
 		 // Here we grab the text from the input box
	    var input = $("#button-input").val().trim();

	    	animalArray.push(input);

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

				    renderButtons();
				    
				    console.log("add-button", input);
			}

 }); // add button function end 


});
