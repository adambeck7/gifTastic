      var topics = ["Rick and Morty", "Archer", "Futurama", "South Park", "The Simpsons", "King of the Hill",
          "Bob's Burgers", "Family Guy", "Robot Chicken"
      ];
      var buttonCount = 0;
      var inputGif = $("#gif-input").val().trim();
      var gifBox = '';
      $(".container").on('click', '*', function () {
          $("#title-row").hide();
      })

      for (var i = 0; i < topics.length; i++) {
          $("#button-div").append("<button>" + topics[i]);
          var newButton = $("<img>").attr({
              value: inputGif,
              id: "added-button-" + buttonCount,
              type: "button",
              class: "btn btn-primary"
          });
      }

      //function for api call. creates img tag and shows gif
      function searchGifs(searchTerm) {
          var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=k4ZXee2WvMvmYnO7KEc0mHRSEUHV87O7&q=" +
              "$" + searchTerm + "+$random";
          console.log(queryURL);
          $.ajax({
              url: queryURL,
              method: "GET"
          }).then(function (response) {
              $("#gif-div").empty();
              for (var j = 0; j < 10; j++) {
                  buttonCount++;
                  gifBox = $("<img>").attr({
                      data: response.data[j].rating,
                      id: "added-button-" + buttonCount,
                      type: "button",
                      class: "btn btn-primary addedGif",
                      src: response.data[j].images.original_still.url,
                      still: response.data[j].images.original_still.url,
                      animate: response.data[j].images.original.url,
                      state: "still"
                  });
                  newDiv = $("<div id='new-id-" + buttonCount + "' " + "class='col-md-auto addedGif'>")
                  $("#gif-div").append(newDiv);
                  $(newDiv).html("rating: " + response.data[j].rating + "  ");
                  $(newDiv).append(gifBox);
              }
          });
      }

      function createButton() {
          buttonCount++;
          var newButton = $("<input>").attr({
              value: inputGif,
              id: "added-button-" + buttonCount,
              type: "button",
          });
          $("#button-div").append(newButton);
      }

      //create new button when you click set-gif
      $("#set-gif").on("click", function (event) {
          event.preventDefault();
          inputGif = $("#gif-input").val();
          // createButton(inputGif);
          topics.push(inputGif);
          $("#button-div").empty();
          for (var i = 0; i < topics.length; i++) {
              $("#button-div").append("<button>" + topics[i]);
              var newButton = $("<input>").attr({
                  value: inputGif,
                  id: "added-button-" + buttonCount,
                  type: "button",
              });
          }
          $("button").addClass("btn btn-primary");
      });

      // generate gif on button click
      $("#button-div").on("click", '*', function (event) {
          event.preventDefault();
          inputGif = $(this).text();
          console.log("button div click value=", inputGif);
          searchGifs(inputGif);
      });
      //start/stop animations
      $("#gif-div").on("click", '*', function () {
          console.log('test');
          var state = $(this).attr("state");
          if (state === "still") {
              $(this).attr("src", $(this).attr("animate"));
              $(this).attr("state", "animate");
          } else {
              $(this).attr("src", $(this).attr("still"));
              $(this).attr("state", "still");
          }
      });
      $("button").addClass("btn btn-primary");