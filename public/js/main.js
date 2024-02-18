(function ($) {
  "use strict";
  // TOP Menu Sticky
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $("#sticky-header").removeClass("sticky");
      $("#back-top").fadeIn(500);
    } else {
      $("#sticky-header").addClass("sticky");
      $("#back-top").fadeIn(500);
    }
  });

  // Input file size check
  function checkFileSize(input) {
    if (input.files && input.files[0]) {
      var fileSize = input.files[0].size;
      var maxSize = 500 * 1024; //500KB

      if (fileSize > maxSize) {
        alert("File size exceeds 500KB. Please select a smaller file.");
        input.value = "";
      }
    }
  }

  // Event listener for Student Id Image input change
  $("#studentIdImage").on("change", function () {
    checkFileSize(this);
  });

  // Event listener for Student Image input change
  $("#studentImage").on("change", function () {
    checkFileSize(this);
  });

  // Event listener for CNIC input change
  $("#cnicImage").on("change", function () {
    checkFileSize(this);
  });

  // Event listener for a Futsal Player ID input change
  $(document).on("change", 'input[name^="playerID"]', function () {
    checkFileSize(this);
  });

  // Event listener for a Futsal Player Image input change
  $(document).on("change", 'input[name^="playerImage"]', function () {
    checkFileSize(this);
  });

  // Event listener for a Futsal Player CNIC input change
  $(document).on("change", 'input[name^="playerCnicImg"]', function () {
    checkFileSize(this);
  });

  // Event listener for a Basketball Player Id input change
  $(document).on("change", 'input[name^="basketballPlayerID"]', function () {
    checkFileSize(this);
  });

  // Event listener for a Basketball Player Image input change
  $(document).on("change", 'input[name^="basketballPlayerImage"]', function () {
    checkFileSize(this);
  });

  // Event listener for a Basketball Player CNIC input change
  $(document).on(
    "change",
    'input[name^="basketballPlayerCnicImg"]',
    function () {
      checkFileSize(this);
    }
  );

  // Event listener for a Badminton Player ID input change
  $("#badmintonSecondPlayerId").on("change", function () {
    checkFileSize(this);
  });

  // Event listener for a Badminton Player Image input change
  $("#badmintonSecondPlayerImage").on("change", function () {
    checkFileSize(this);
  });

  // Event listener for a Badminton Player CNIC input change
  $("#badmintonSecondPlayerCnicImage").on("change", function () {
    checkFileSize(this);
  });

  // Toggle student Type input
  $(document).ready(function () {
    $('input[name="studentType"]').change(function () {
      if ($(this).val() === "yes") {
        $("#studentIdInput").fadeIn();
        $("#cnicImageDiv").fadeOut();
      } else {
        $("#studentIdInput").fadeOut();
        $("#cnicImageDiv").fadeIn();
      }
    });
  });




  function toggleSocialEventDivs(selectedValue) {
    if (selectedValue === "participantAndSocialEvent") {
      $(".playerSocialEventDiv").fadeIn();
      $(".BasketabllplayerSocialEventDiv").fadeIn();
      $(".badmintonSecondPlayerSocialEventDiv").fadeIn();
    } else {
      $(".playerSocialEventDiv").fadeOut();
      $(".BasketabllplayerSocialEventDiv").fadeOut();
      $(".badmintonSecondPlayerSocialEventDiv").fadeOut();
    }
  }








  // Toggle Register As input
  $(document).ready(function () {
    $('input[name="RegisterAs"]').change(function () {
      if (
        $(this).val() === "participant" ||
        $(this).val() === "participantAndSocialEvent"
      ) {
        $("#sports").fadeIn();
        $('input[name^="Futsal"]').prop("disabled", false);
        $('input[name^="Basketball"]').prop("disabled", false);
        $('input[name^="Badminton"]').prop("disabled", false);
        $('input[name^="TableTennis"]').prop("disabled", false);
        $('input[name^="BoardGames"]').prop("disabled", false);
        $('input[name^="EGaming"]').prop("disabled", false);
        $('input[name^="ParliamentarySummit"]').prop("disabled", false);
      } else {
        $("#sports").fadeOut();
        $('input[name^="Futsal"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="Basketball"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="Badminton"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="TableTennis"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="BoardGames"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="EGaming"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="ParliamentarySummit"]')
          .prop("disabled", true)
          .prop("checked", false);
      }
    });
  });

  // Futsal Team Players toggle
  $(document).ready(function () {
    $('input[name="FutsalPlayers"]').on("input", function () {
      var value = parseInt($(this).val());
      var errorMessage = "";

      if (isNaN(value)) {
        errorMessage = "Please enter a valid number.";
      } else if (value < 4) {
        errorMessage = "Minimum number of players is 4.";
      } else if (value > 7) {
        errorMessage = "Maximum number of players is 7.";
      }

      // Show or hide the error message based on the condition
      if (errorMessage) {
        $("#FutsalPlayersError").text(errorMessage).show();
      } else {
        $("#FutsalPlayersError").hide();
      }
    });

    // Show the input field when Futsal is checked
    $('input[name="Futsal"]').change(function () {
      if ($(this).prop("checked")) {
        $("#FutsalPlayersDiv").fadeIn();
        $('input[name^="FutsalPlayers"]').prop("disabled", false);
        $('input[name^="playerType"]').prop("disabled", false);
        $('input[name^="playerImage"]').prop("disabled", false);
        $('input[name^="playerID"]').prop("disabled", false);
        $('input[name^="playerName"]').prop("disabled", false);
        $('input[name^="playerFatherName"]').prop("disabled", false);
        $('input[name^="playerContact"]').prop("disabled", false);
        $('input[name^="playerEmail"]').prop("disabled", false);
        $('input[name^="playerCnic"]').prop("disabled", false);
        $('input[name^="playerCnicImg"]').prop("disabled", false);
        $('input[name^="playerAttendSocialEvent"]').prop("disabled", false);
      } else {
        $("#FutsalPlayersDiv").fadeOut();
        $('input[name^="FutsalPlayers"]').prop("disabled", true).val("");
        $('input[name^="playerType"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="playerImage"]').prop("disabled", true).val("");
        $('input[name^="playerID"]').prop("disabled", true).val("");
        $('input[name^="playerName"]').prop("disabled", true).val("");
        $('input[name^="playerFatherName"]').prop("disabled", true).val("");
        $('input[name^="playerContact"]').prop("disabled", true).val("");
        $('input[name^="playerEmail"]').prop("disabled", true).val("");
        $('input[name^="playerCnic"]').prop("disabled", true).val("");
        $('input[name^="playerCnicImg"]').prop("disabled", true).val("");
        $('input[name^="playerAttendSocialEvent"]')
          .prop("disabled", true)
          .prop("checked", false);

        // Hide the error message when the input field is hidden
        $("#FutsalPlayersError").hide();
      }
    });
  });

  // Basketball Team Players toggle
  $(document).ready(function () {
    $('input[name="BasketballPlayers"]').on("input", function () {
      var value = parseInt($(this).val());
      var errorMessage = "";

      if (isNaN(value)) {
        errorMessage = "Please enter a valid number.";
      } else if (value < 4) {
        errorMessage = "Minimum number of players is 4.";
      } else if (value > 7) {
        errorMessage = "Maximum number of players is 7.";
      }

      // Show or hide the error message based on the condition
      if (errorMessage) {
        $("#BasketballPlayersError").text(errorMessage).show();
      } else {
        $("#BasketballPlayersError").hide();
      }
    });

    // Show the input field when Futsal is checked
    $('input[name="Basketball"]').change(function () {
      if ($(this).prop("checked")) {
        $("#BasketballPlayersDiv").fadeIn();
        $('input[name^="BasketballPlayers"]').prop("disabled", false);
        $('input[name^="basketballPlayerType"]').prop("disabled", false);
        $('input[name^="basketballPlayerImage"]').prop("disabled", false);
        $('input[name^="basketballPlayerID"]').prop("disabled", false);
        $('input[name^="basketballPlayerName"]').prop("disabled", false);
        $('input[name^="basketballPlayerFatherName"]').prop("disabled", false);
        $('input[name^="basketballPlayerContact"]').prop("disabled", false);
        $('input[name^="basketballPlayerEmail"]').prop("disabled", false);
        $('input[name^="basketballPlayerCnic"]').prop("disabled", false);
        $('input[name^="basketballPlayerCnicImg"]').prop("disabled", false);
        $('input[name^="BasketballplayerAttendSocialEvent"]').prop(
          "disabled",
          false
        );
      } else {
        $("#BasketballPlayersDiv").fadeOut();
        $('input[name^="BasketballPlayers"]').prop("disabled", true).val("");
        $('input[name^="basketballPlayerType"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="basketballPlayerImage"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="basketballPlayerID"]').prop("disabled", true).val("");
        $('input[name^="basketballPlayerName"]').prop("disabled", true).val("");
        $('input[name^="basketballPlayerFatherName"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="basketballPlayerContact"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="basketballPlayerEmail"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="basketballPlayerCnic"]').prop("disabled", true).val("");
        $('input[name^="basketballPlayerCnicImg"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="BasketballplayerAttendSocialEvent"]')
          .prop("disabled", true)
          .prop("checked", false);

        // Hide the error message when the input field is hidden
        $("#BasketballPlayersError").hide();
      }
    });
  });

  //Badminton Type Toggle
  $(document).ready(function () {
    $('input[name="Badminton"]').change(function () {
      if ($(this).is(":checked")) {
        $("#BadmintonTypeDiv").fadeIn();
        $('input[name="matchType"]').prop("disabled", false);
        $('input[name^="badmintonSecondPlayerType"]').prop("disabled", false);
        $('input[name^="badmintonSecondPlayerImage"]').prop("disabled", false);
        $('input[name^="badmintonSecondPlayerId"]').prop("disabled", false);
        $('input[name^="badmintonSecondPlayerName"]').prop("disabled", false);
        $('input[name^="badmintonSecondPlayerFatherName"]').prop(
          "disabled",
          false
        );
        $('input[name^="badmintonSecondPlayerContact"]').prop(
          "disabled",
          false
        );
        $('input[name^="badmintonSecondPlayerEmail"]').prop("disabled", false);
        $('input[name^="badmintonSecondPlayerCnic"]').prop("disabled", false);
        $('input[name^="badmintonSecondPlayerCnicImage"]').prop(
          "disabled",
          false
        );
        $('input[name^="badmintonSecondPlayerAttendSocialEvent"]').prop(
          "disabled",
          false
        );
      } else {
        $("#BadmintonTypeDiv").fadeOut();
        $('input[name="matchType"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="badmintonSecondPlayerType"]')
          .prop("disabled", true)
          .prop("checked", false);
        $('input[name^="badmintonSecondPlayerImage"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="badmintonSecondPlayerId"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="badmintonSecondPlayerName"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="badmintonSecondPlayerFatherName"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="badmintonSecondPlayerContact"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="badmintonSecondPlayerEmail"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="badmintonSecondPlayerCnic"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="badmintonSecondPlayerCnicImage"]')
          .prop("disabled", true)
          .val("");
        $('input[name^="badmintonSecondPlayerAttendSocialEvent"]')
          .prop("disabled", true)
          .prop("checked", false);
      }
    });
  });

  // badminton Second PLayer Details input toggle
  $(document).ready(function () {
    $('input[name="matchType"]').change(function () {
      if ($(this).val() === "single") {
        $("#BadmintonSecondPlayerDetailsDiv").fadeOut();
      } else {
        $("#BadmintonSecondPlayerDetailsDiv").fadeIn();
      }
    });
  });

  //Board Games Type Toggle
  $(document).ready(function () {
    $('input[name="BoardGames"]').change(function () {
      if ($(this).is(":checked")) {
        $("#BoardGamesDiv").fadeIn();
      } else {
        $("#BoardGamesDiv").fadeOut();
        $("#BoardGamesDiv input[type='checkbox']").prop("checked", false);
      }
    });
  });

  //E-Gaming Type Toggle
  $(document).ready(function () {
    $('input[name="EGaming"]').change(function () {
      if ($(this).is(":checked")) {
        $("#EGamingDiv").fadeIn();
      } else {
        $("#EGamingDiv").fadeOut();
        $("#EGamingDiv input[type='checkbox']").prop("checked", false);
      }
    });
  });

  // Toggle parliamentary summit div

  $('input[name="ParliamentarySummit"]').change(function () {
    if ($(this).prop("checked")) {
      $("#ParliamarySummitDiv").fadeIn();
      $('input[name="experience"]').prop("disabled", false);
    } else {
      $("#ParliamarySummitDiv").fadeOut();
      $('input[name="experience"]').prop("disabled", true);
      $("#ParliamarySummitDiv input[type='radio']").prop("checked", false);
    }
  });




  // Calculate Total Price
  $(document).ready(function () {

    $("#dicountPrice").text('-');
    // Event listener for changes in sport checkboxes
    $('input[type="checkbox"]').change(function () {
      calculateTotalPrice();
      toggleTotalPriceDiv();
    });

    // Event listener for changes in match type radio buttons
    $('input[name="matchType"]').change(function () {
      calculateTotalPrice();
      toggleTotalPriceDiv();
    });

    // Event listener for changes in the number of players for Futsal
    $("#FutsalPlayers").on("input", function () {
      var selectedValue = $('input[name="RegisterAs"]:checked').val();
      toggleSocialEventDivs(selectedValue);
      calculateTotalPrice();

    });

    // Event listener for changes in the number of players for Basketball
    $("#BasketballPlayers").on("input", function () {
      var selectedValue = $('input[name="RegisterAs"]:checked').val();
      toggleSocialEventDivs(selectedValue);

      $(this).change(function () {
        calculateTotalPrice();
      });

    });



    // Event listener for changes in "RegisterAs" radio buttons
    $('input[name="RegisterAs"]').change(function () {
      const selectedValue = $(this).val();
      toggleSocialEventDivs(selectedValue);
      calculateTotalPrice();
      toggleTotalPriceDiv();

    });

    // Event listener for changes in social event attendance for Futsal
    $('[id^="playerAttendSocialEvent"]').change(function () {
      calculateTotalPrice();
    });

    // Event listener for changes in social event attendance for Basketball
    $('[id^="BasketballplayerAttendSocialEvent"]').change(function () {
      calculateTotalPrice();
    });

    // Event listener for changes in social event attendance for Badminton
    $('[id^="badmintonSecondPlayerAttendSocialEvent"]').change(function () {
      calculateTotalPrice();
    });

    // Event listener for changes in student type
    $('input[name="studentType"]').change(function () {
      calculateTotalPrice();
    });

    // Event listener for changes in Futsal Player type
    $('[id^="playerType"]').each(function (index) {
      $(this).change(function () {
        calculateTotalPrice();
      });
    });
    $("#playersDetailsDiv").on("click", function () {
      calculateTotalPrice();
    })
    $("#basketballplayersDetailsDiv").on("click", function () {
      calculateTotalPrice();
    })


    // Event listener for changes in Basketball Player type
    $('[id^="basketballPlayerType"]').each(function (index) {
      $(this).change(function () {
        calculateTotalPrice();
      });
    });

    // Event listener for changes in Badminton Second PLayer type
    $('input[name="badmintonSecondPlayerType"]').change(function () {
      calculateTotalPrice();
    });

    // Event listener for changes in Futsal Player type
    $('[id^="playerType"]').each(function () {
      $(this).change(function () {
        calculateTotalPrice(); // Ensure the discount calculation is triggered when a player type changes
      });
    });

    // Event listener for changes in Basketball Player type
    $('[id^="basketballPlayerType"]').each(function () {
      $(this).change(function () {
        calculateTotalPrice(); // Ensure the discount calculation is triggered when a basketball player type changes
      });
    });

    function applyDiscountForCheckedPlayers(totalPrice, totalDiscount) {
      var discount = 500;

      // Check for basketball player discount
      $('[id^="basketballPlayerType"]').each(function () {
        if ($(this).is(":checked") && $(this).val() === "yes") {
          totalPrice -= discount;
          totalDiscount += discount;
        }
      });

      // Check for player type discount
      $('[id^="playerType"]').each(function () {
        if ($(this).is(":checked") && $(this).val() === "yes") {
          totalPrice -= discount;
          totalDiscount += discount;
        }
      });

      // Return totalPrice and totalDiscount after applying discounts
      return { totalPrice: totalPrice, totalDiscount: totalDiscount };
    }




    // Function to calculate the total price
    function calculateTotalPrice() {
      var sportsPrice = 0;
      var observerPrice = 3000;
      var socialEventPrice = 1500;
      var totalPrice = 0;
      var discount = 500;
      var totalDiscount = 0;

      var futsalSocialEventAttendeesCount = $(
        '[id^="playerAttendSocialEventYes"]:checked'
      ).length;


      var basketballSocialEventAttendeesCount = $(
        '[id^="BasketballplayerAttendSocialEventYes"]:checked'
      ).length;


      var badmintonSocialEventAttendeesCount = $(
        '[id^="badmintonSecondPlayerAttendSocialEventYes"]:checked'
      ).length;


      var totalSocialAttendees =
        futsalSocialEventAttendeesCount +
        basketballSocialEventAttendeesCount +
        badmintonSocialEventAttendeesCount;

      // Check if the student is from IMSciences and apply discount if yes
      var isIMSciencesStudent = $("#studentTypeYes").is(":checked");
      var isSecondBadmintonPlayerIMSciencesStudent = $(
        "#badmintonSecondPlayerTypeYes"
      ).is(":checked");


      // Calculate the price for selected sports
      $('input[type="checkbox"]:checked').each(function () {
        var sportName = $(this).attr("name");
        var matchType = getMatchType(sportName);
        var pricePerPlayer = getPricePerPlayer(sportName, matchType);
        if (pricePerPlayer > 0) {
          totalDiscount += discount;
        }
        sportsPrice += pricePerPlayer;
      });


      // REGISTER AS OBSERVER

      // Calculate the total price based on selected options
      if ($("#RegisterAsObserver").is(":checked")) {
        totalPrice = observerPrice;

        if (isIMSciencesStudent) {
          totalPrice = 0;
          $("#dicountPrice").text("RS. " + 3000);
        }
        else {
          $("#dicountPrice").text("-");
        }

      }

      else {
        totalPrice = sportsPrice;

        // REGISTER AS PARTICIPANT + SOCIAL EVENT

        // Add social events price if "Participant + Social Event" is selected
        if ($("#RegisterAsParticipantAndSocialEvent").is(":checked")) {

          // Check if any additional social event attendees are selected
          if (totalSocialAttendees > 1) {
            totalPrice += socialEventPrice + socialEventPrice * totalSocialAttendees; // Add social event price for additional attendees

            if (isIMSciencesStudent) {
              totalPrice -= totalDiscount; // Apply the discount
              $("#dicountPrice").text("RS. " + totalDiscount);
            }
          }
          else {
            $("#dicountPrice").text('-');
          }
          if (isSecondBadmintonPlayerIMSciencesStudent) {
            totalPrice -= discount;
            totalDiscount += discount;
            $("#dicountPrice").text("RS. " + totalDiscount);
          }


          $('[id^="basketballPlayerType"]').each(function (index) {
            if ($(this).is(":checked") && $(this).val() === "yes") {
              totalPrice -= discount;
              totalDiscount += discount;
              $("#dicountPrice").text("RS. " + totalDiscount);
            }
          });

          $('[id^="playerType"]').each(function (index) {
            if ($(this).is(":checked") && $(this).val() === "yes") {
              totalPrice -= discount;
              totalDiscount += discount;
              $("#dicountPrice").text("RS. " + totalDiscount);
            }
          });






          // REGISTER AS PARTICIPANT 
        } else if ($("#RegisterAsParticipant").is(":checked")) {
          var socialEventPrice = 0;
          if (isIMSciencesStudent) {
            totalPrice -= totalDiscount; // Apply the discount

          }
          if (isSecondBadmintonPlayerIMSciencesStudent) {
            totalPrice -= totalDiscount;
            totalDiscount += discount;
          }
          var discounts = applyDiscountForCheckedPlayers(totalPrice, totalDiscount);
          totalPrice = discounts.totalPrice;
          totalDiscount = discounts.totalDiscount;

          $("#dicountPrice").text("RS. " + totalDiscount);

        }

      }

      // Update the total price display
      $("#finaltotalprice").val("RS. " + totalPrice);


      // Show the Payment Screenshot input if the total price is > 0
      if (totalPrice > 0) {
        $("#paymentScreenshotDiv").show();
        $("#accountDetails").show();
        
      }
      else {
        $("#finaltotalprice").val("Free");
        $("#paymentScreenshotDiv").hide();
        $("#accountDetails").hide();
      }


      // Update the observer and sports total price displays
      if ($("#RegisterAsObserver").is(":checked")) {
        $("#observertotalprice").text("RS. " + observerPrice);
        $("#sportstotalprice").text("-");
        $("#socialeventstotalprice").text("-");

      } else if ($("#RegisterAsParticipantAndSocialEvent").is(":checked")) {
        $("#observertotalprice").text("-");
        $("#sportstotalprice").text("RS. " + sportsPrice);
        if (totalSocialAttendees > 1) {
          $("#socialeventstotalprice").text("RS. " + (socialEventPrice + socialEventPrice * totalSocialAttendees)
          );
        } else if (totalSocialAttendees == 0) {
          $("#socialeventstotalprice").text("RS. " + socialEventPrice);
        } else {
          $("#socialeventstotalprice").text("RS. " + (socialEventPrice + 1500));
        }
      }
      else {
        $("#observertotalprice").text("-");
        $("#sportstotalprice").text("RS. " + sportsPrice);
        $("#socialeventstotalprice").text("-");
      }
    }

    // Function to toggle the visibility of the total price div
    function toggleTotalPriceDiv() {
      var hasCheckedSport = $('input[type="checkbox"]:checked').length > 0;
      if ($("#RegisterAsObserver").is(":checked") || hasCheckedSport) {
        $("#TotalPriceDiv").show();

      } else {
        $("#TotalPriceDiv").hide();

      }
    }

    // Function to get the match type based on the sport name
    function getMatchType(sportName) {
      switch (sportName) {
        case "Badminton":
          return $('input[name="matchType"]:checked').val();
        default:
          return null;
      }
    }

    // Function to get the price per player based on the sport name and match type
    function getPricePerPlayer(sportName, matchType) {
      switch (sportName) {
        case "Futsal":
        case "Basketball":
          // Get the number of players for Futsal or Basketball
          var numPlayers = 0;
          if (sportName === "Futsal") {
            numPlayers = parseInt($("#FutsalPlayers").val());
          } else if (sportName === "Basketball") {
            numPlayers = parseInt($("#BasketballPlayers").val());
          }
          // Check if the number of players is within the valid range
          if (numPlayers < 4 || numPlayers > 7) {
            return 0;
          }
          // Return the price per player multiplied by the number of players
          return (numPlayers * 1500) + 1500;
        case "TableTennis":
        case "Ludo":
        case "Chess":
        case "Carrom":
        case "Tekken":
        case "Fifa":
        case "ParliamentarySummit":
          return 1500;
        case "Badminton":
          if (matchType === "single") {
            return 1500;
          } else if (matchType === "double") {
            return 3000;
          }
          return 0;
        default:
          return 0;
      }
    }
  });






  // FUTSAL
  // Get the input element for total players of Futsal
  const totalPlayersInput = document.getElementById("FutsalPlayers");

  // Function to dynamically generate player detail inputs
  function generatePlayerInputs(numPlayers) {
    // Clear previous player details
    const playersDetailsDiv = document.getElementById("playersDetailsDiv");
    playersDetailsDiv.innerHTML = "";

    // Loop to generate inputs for each player
    for (let i = 1; i <= numPlayers; i++) {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add(
        "mt-3",
        "border-bottom",
        "border-start",
        "ms-2",
        "pb-3",
        "ps-3"
      );
      playerDiv.innerHTML = `
          <label class='form-label fw-bold'>Player ${i} Details:</label>
          <div class='mb-2'>
              <label for='playerType${i}' class='form-label'>Is the player a student at IMSciences?
                  <span class="badge text-danger fs-20">*</span>
              </label>
              <div class="form-check">
                  <input class="form-check-input playerType" type="radio" name="playerType${i}" value="yes" id="playerTypeYes${i}">
                  <label class="form-check-label" for="playerTypeYes${i}">Yes</label>
              </div>
              <div class="form-check">
                  <input class="form-check-input playerType" type="radio" name="playerType${i}" value="no" id="playerTypeNo${i}">
                  <label class="form-check-label" for="playerTypeNo${i}">No</label>
              </div>
              <div class='playerTypeDiv border-start ps-2 ms-3' id='playerTypeDiv${i}' style="display:none;">
                  <div class="mb-2">
                      <label for="playerID${i}" class="form-label">Upload student ID card
                      <span class="badge text-danger fs-20">*</span>
                      </label>
                      <input type="file" class="form-control" name="playerID" id="playerID${i}" accept="image/png,image/PNG, image/jpg, image/jpeg" />
                      <span class="text-body-secondary fs-14 mt-3">Only PNG, JPEG, JPG images accepted</span>
                  </div>
              </div>
          </div>
          <div class="mb-2">
              <label for="playerImage${i}" class="form-label">Upload Player Picture
              <span class="badge text-danger fs-20">*</span>
              </label>
              <input type="file" class="form-control" name="playerImage" id="playerImage${i}" accept="image/png,image/PNG, image/jpg, image/jpeg" />
              <span class="text-body-secondary fs-14 mt-3">Only PNG, JPEG, JPG images accepted</span>
          </div>
          <div class="mb-2">
              <label for="playerName${i}" class="form-label">Name <span class="badge text-danger fs-20">*</span></label>
              <input type="text" class="form-control" name="playerName${i}" id="playerName${i}" placeholder="Enter Player Name" />
          </div>
          
          <div class="mb-2">
              <label for="playerContact${i}" class="form-label">Contact Number <span class="badge text-danger fs-20">*</span></label>
              <input type="number" class="form-control" name="playerContact${i}" id="playerContact${i}" placeholder="Enter Player Contact Number" />
          </div>
          
          <div class="mb-2">
              <label for="playerCnic${i}" class="form-label">CNIC <span class="badge text-danger fs-20">*</span></label>
              <input type="text" class="form-control" name="playerCnic${i}" id="playerCnic${i}" placeholder="Enter Player CNIC" />
          </div>
          <div class="mb-2" id='playerCnicImgDiv${i}' style='display:none;'>
              <label for="playerCnicImg${i}" class="form-label">Player CNIC <span class="badge text-danger fs-20">*</span></label>
              <input type="file" class="form-control" name="playerCnicImg" id="playerCnicImg${i}" accept="image/png,image/PNG, image/jpg, image/jpeg" />
              <span class="text-body-secondary fs-14 mt-3">Only PNG, JPEG, JPG images accepted</span>
          </div>
          <div class="playerSocialEventDiv" id='playerSocialEventDiv${i}' style="display:none;">
              <label for='playerAttendSocialEvent${i}' class='form-label'>Does the player wish to attend the social event? <span class="badge text-danger fs-20">*</span></label>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="playerAttendSocialEvent${i}" value="yes" id="playerAttendSocialEventYes${i}">
                  <label class="form-check-label" for="playerAttendSocialEventYes${i}">Yes</label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="playerAttendSocialEvent${i}" value="no" id="playerAttendSocialEventNo${i}">
                  <label class="form-check-label" for="playerAttendSocialEventNo${i}">No</label>
              </div>
          </div>
      `;
      playersDetailsDiv.appendChild(playerDiv);
    }
  }

  // Call the function initially with default value
  generatePlayerInputs(parseInt(totalPlayersInput.value));

  // Listen for changes in the total players input
  totalPlayersInput.addEventListener("input", () => {
    // Call the function to generate player inputs based on the new value
    generatePlayerInputs(parseInt(totalPlayersInput.value));
  });

  // Toggle player Type input
  $(document).on("change", ".playerType", function () {
    const playerId = $(this).attr("name").match(/\d+/)[0];
    if ($(this).val() === "yes") {
      $(`#playerTypeDiv${playerId}`).fadeIn();
      $(`#playerCnicImgDiv${playerId}`).fadeOut();
      $(`#playerStudentId${playerId}`).fadeIn();
    } else {
      $(`#playerTypeDiv${playerId}`).fadeOut();
      $(`#playerCnicImgDiv${playerId}`).fadeIn();
      $(`#playerStudentId${playerId}`).fadeOut();
    }
  });






  // BasketBall
  // Get the input element for total players of Basketball
  const totalBasketballPlayersInput =
    document.getElementById("BasketballPlayers");

  // Function to dynamically generate basketball player detail inputs
  function generateBasketballPlayerInputs(numPlayers) {
    // Clear previous player details
    const basketballPlayersDetailsDiv = document.getElementById(
      "basketballplayersDetailsDiv"
    );
    basketballPlayersDetailsDiv.innerHTML = "";

    // Loop to generate inputs for each player
    for (let i = 1; i <= numPlayers; i++) {
      const basketballPlayerDiv = document.createElement("div");
      basketballPlayerDiv.classList.add(
        "mt-3",
        "border-bottom",
        "border-start",
        "ms-2",
        "pb-3",
        "ps-3"
      );
      basketballPlayerDiv.innerHTML = `
          <label class='form-label fw-bold'>Player ${i} Details:</label>
              <div class='mb-2'>
                  <label for='basketballPlayerType${i}' class='form-label'>Is the player a student at IMSciences? <span class="badge text-danger fs-20">*</span></label>
                  <div class="form-check">
                      <input class="form-check-input basketballPlayerType" type="radio" name="basketballPlayerType${i}" value="yes" id="basketballPlayerTypeYes${i}">
                      <label class="form-check-label" for="basketballPlayerTypeYes${i}">Yes</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input basketballPlayerType" type="radio" name="basketballPlayerType${i}" value="no" id="basketballPlayerTypeNo${i}">
                      <label class="form-check-label" for="basketballPlayerTypeNo${i}">No</label>
                  </div>
                  <div class='basketballPlayerTypeDiv border-start ps-2 ms-3' id='basketballPlayerTypeDiv${i}'  style="display:none;>
                    <div class="mb-2">
                        <label for="basketballPlayerID${i}" class="form-label">Upload student ID card <span class="badge text-danger fs-20">*</span></label>
                        <input type="file" class="form-control" name="basketballPlayerID" id="basketballPlayerID${i}" accept="image/png,image/PNG, image/jpg, image/jpeg" />
                        <span class="text-body-secondary fs-14 mt-3">Only PNG, JPEG, JPG images accepted</span>
                    </div>
                  </div>
              </div>
              <div class="mb-2">
                  <label for="basketballPlayerImage${i}" class="form-label">Upload Player Picture <span class="badge text-danger fs-20">*</span></label>
                  <input type="file" class="form-control" name="basketballPlayerImage" id="basketballPlayerImage${i}" accept="image/png,image/PNG, image/jpg, image/jpeg" />
                  <span class="text-body-secondary fs-14 mt-3">Only PNG, JPEG, JPG images accepted</span>
              </div>
              <div class="mb-2">
                  <label for="basketballPlayerName${i}" class="form-label">Name <span class="badge text-danger fs-20">*</span></label>
                  <input type="text" class="form-control" name="basketballPlayerName${i}" id="basketballPlayerName${i}" placeholder="Enter Player Name" />
              </div>
             
              <div class="mb-2">
                  <label for="basketballPlayerContact${i}" class="form-label">Contact Number <span class="badge text-danger fs-20">*</span></label>
                  <input type="number" class="form-control" name="basketballPlayerContact${i}" id="basketballPlayerContact${i}" placeholder="Enter Player Contact Number" />
              </div>
             
              <div class="mb-2">
                  <label for="basketballPlayerCnic${i}" class="form-label">CNIC <span class="badge text-danger fs-20">*</span></label>
                  <input type="email" class="form-control" name="basketballPlayerCnic${i}" id="basketballPlayerCnic${i}" placeholder="Enter Player CNIC" />
              </div>
              
              <div class="mb-2" id='basketballPlayerCnicImgDiv${i}' style="display:none;>
                  <label for="basketballPlayerCnicImg${i}" class="form-label">Player CNIC <span class="badge text-danger fs-20">*</span></label>
                  <input type="file" class="form-control" name="basketballPlayerCnicImg" id="basketballPlayerCnicImg${i}" accept="image/png,image/PNG, image/jpg, image/jpeg"/>
                  <span class="text-body-secondary fs-14 mt-3">Only PNG, JPEG, JPG images accepted</span>
              </div>

              <div class="BasketabllplayerSocialEventDiv" id='BasketabllplayerSocialEventDiv${i}'  style="display:none;">
                  <label for='BasketballplayerAttendSocialEvent${i}' class='form-label'>Does the player wish to attend the social event? <span class="badge text-danger fs-20">*</span></label>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="BasketballplayerAttendSocialEvent${i}" value="yes" id="BasketballplayerAttendSocialEventYes${i}">
                      <label class="form-check-label" for="BasketballplayerAttendSocialEventYes${i}">Yes</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="BasketballplayerAttendSocialEvent${i}" value="no" id="BasketballplayerAttendSocialEventNo${i}">
                      <label class="form-check-label" for="BasketballplayerAttendSocialEventNo${i}">No</label>
                  </div>
              </div>
      `;
      basketballPlayersDetailsDiv.appendChild(basketballPlayerDiv);
    }
  }

  // Call the function initially with default value
  generateBasketballPlayerInputs(parseInt(totalBasketballPlayersInput.value));

  // Listen for changes in the total basketball players input
  totalBasketballPlayersInput.addEventListener("input", () => {
    // Call the function to generate basketball player inputs based on the new value
    generateBasketballPlayerInputs(parseInt(totalBasketballPlayersInput.value));
  });

  // Toggle Basketball player Type input
  $(document).on("change", ".basketballPlayerType", function () {
    const playerId = $(this).attr("name").match(/\d+/)[0];
    if ($(this).val() === "yes") {
      $(`#basketballPlayerTypeDiv${playerId}`).fadeIn();
      $(`#basketballPlayerCnicImgDiv${playerId}`).fadeOut();
    } else {
      $(`#basketballPlayerTypeDiv${playerId}`).fadeOut();
      $(`#basketballPlayerCnicImgDiv${playerId}`).fadeIn();
    }
  });

  // Toggle Badminton Double player Type input
  $(document).ready(function () {
    $('input[name="badmintonSecondPlayerType"]').change(function () {
      if ($(this).val() === "yes") {
        $("#badmintonSecondPlayerTypeDiv").fadeIn();
        $("#badmintonSecondPlayerCnicImageDiv").fadeOut();
      } else {
        $("#badmintonSecondPlayerTypeDiv").fadeOut();
        $("#badmintonSecondPlayerCnicImageDiv").fadeIn();
      }
    });
  });




  // Close whatsapp chat tooltip
  $(document).ready(function() {
    $("#closeBtn").click(function() {
      $("#chatToolTip").hide();
      $("#closeBtn").hide();
    });
  });



  // Close Video tooltip
  $(document).ready(function() {
    $("#VideoCloseBtn").click(function() {
      $("#videoToolTip").hide();
      $("#VideoCloseBtn").hide();
    });
  });


  $(document).ready(function() {
    // Add a click event listener to the close button with class 'close-modal'
    $('.close-modal').click(function(e) {
        // Prevent the default behavior of the close button
        e.preventDefault();
        // Clear the 'src' attribute of the iframe inside the element with class 'video-embed'
        $('.video-embed').children('iframe').attr('src', '');
    });
});


  $(document).ready(function () {
    // mobile_menu
    var menu = $("ul#navigation");
    if (menu.length) {
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: "+",
        openedSymbol: "-",
      });
    }
    // blog-menu
    // $('ul#blog-menu').slicknav({
    //   prependTo: ".blog_menu"
    // });

    // review-active
    $(".slider_active").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      autoplay: true,
      navText: [
        '<i class="ti-angle-left"></i>',
        '<i class="ti-angle-right"></i>',
      ],
      nav: true,
      dots: false,
      autoplayHoverPause: true,
      autoplaySpeed: 800,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        767: {
          items: 1,
        },
        992: {
          items: 1,
          nav: true,
        },
        1200: {
          items: 1,
        },
        1600: {
          items: 1,
          nav: true,
        },
      },
    });

    // review-active
    var brand_active = $(".brand_active");
    if (brand_active.length) {
      brand_active.owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        navText: [
          '<i class="ti-angle-left"></i>',
          '<i class="ti-angle-right"></i>',
        ],
        nav: false,
        dots: false,
        autoplayHoverPause: true,
        autoplaySpeed: 800,
        center: false,
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          767: {
            items: 3,
          },
          992: {
            items: 4,
          },
          1200: {
            items: 4,
          },
          1500: {
            items: 5,
          },
        },
      });
    }

    // for filter
    // init Isotope
    var $grid = $(".grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: 1,
      },
    });

    // filter items on button click
    $(".portfolio-menu").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });

    //for menu active class
    $(".portfolio-menu button").on("click", function (event) {
      $(this).siblings(".active").removeClass("active");
      $(this).addClass("active");
      event.preventDefault();
    });

    // wow js
    new WOW().init();

    // counter
    $(".counter").counterUp({
      delay: 10,
      time: 10000,
    });

    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    /* magnificPopup img view */
    $(".img-pop-up").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
      type: "iframe",
    });

    // scrollIt for smoth scroll
    $.scrollIt({
      upKey: 38, // key code to navigate to the next section
      downKey: 40, // key code to navigate to the previous section
      easing: "linear", // the easing function for animation
      scrollTime: 600, // how long (in ms) the animation takes
      activeClass: "active", // class given to the active nav element
      onPageChange: null, // function(pageIndex) that is called when page is changed
      topOffset: 0, // offste (in px) for fixed top navigation
    });

    // scrollup bottom to top
    $.scrollUp({
      scrollName: "scrollUp", // Element ID
      topDistance: "4500", // Distance from top before showing element (px)
      topSpeed: 300, // Speed back to top (ms)
      animation: "slide", // Fade, slide, none
      animationInSpeed: 200, // Animation in speed (ms)
      animationOutSpeed: 200, // Animation out speed (ms)
      easingType: "linear",
      scrollText: '<i class="ti-angle-up"></i>', // Text for element
      activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
      easingType: "linear",
      scrollSpeed: 900,
      animation: "slide",
    });

    // blog-page

    //brand-active
    $(".brand-active").owlCarousel({
      loop: true,
      margin: 30,
      items: 1,
      autoplay: true,
      nav: false,
      dots: false,
      autoplayHoverPause: true,
      autoplaySpeed: 800,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        767: {
          items: 4,
        },
        992: {
          items: 7,
        },
      },
    });

    // blog-dtails-page

    //project-active
    $(".project-active").owlCarousel({
      loop: true,
      margin: 30,
      items: 1,
      // autoplay:true,
      navText: [
        '<i class="Flaticon flaticon-left-arrow"></i>',
        '<i class="Flaticon flaticon-right-arrow"></i>',
      ],
      nav: true,
      dots: false,
      // autoplayHoverPause: true,
      // autoplaySpeed: 800,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        767: {
          items: 1,
          nav: false,
        },
        992: {
          items: 2,
          nav: false,
        },
        1200: {
          items: 1,
        },
        1501: {
          items: 2,
        },
      },
    });

    if (document.getElementById("default-select")) {
      $("select").niceSelect();
    }

    //about-pro-active
    $(".details_active").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      // autoplay:true,
      navText: [
        '<i class="ti-angle-left"></i>',
        '<i class="ti-angle-right"></i>',
      ],
      nav: true,
      dots: false,
      // autoplayHoverPause: true,
      // autoplaySpeed: 800,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        767: {
          items: 1,
          nav: false,
        },
        992: {
          items: 1,
          nav: false,
        },
        1200: {
          items: 1,
        },
      },
    });
  });

  // resitration_Form
  $(document).ready(function () {
    $(".popup-with-form").magnificPopup({
      type: "inline",
      preloader: false,
      focus: "#name",

      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = "#name";
          }
        },
      },
    });
  });

  //------- Mailchimp js --------//
  function mailChimp() {
    $("#mc_embed_signup").find("form").ajaxChimp();
  }
  mailChimp();

  // Search Toggle
  $("#search_input_box").hide();
  $("#search").on("click", function () {
    $("#search_input_box").slideToggle();
    $("#search_input").focus();
  });
  $("#close_search").on("click", function () {
    $("#search_input_box").slideUp(500);
  });
  // Search Toggle
  $("#search_input_box").hide();
  $("#search_1").on("click", function () {
    $("#search_input_box").slideToggle();
    $("#search_input").focus();
  });
  $(document).ready(function () {
    $("select").niceSelect();
  });

  const tilt = $(".js-tilt").tilt({
    maxTilt: 20,
    // perspective:    10,   // Transform perspective, the lower the more extreme the tilt gets.
    // easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    // scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
    // speed:          500,    // Speed of the enter/exit transition.
    // transition:     true,   // Set a transition on enter/exit.
    // disableAxis:    null,   // What axis should be disabled. Can be X or Y.
    // reset:          true,   // If the tilt effect has to be reset on exit.
    // glare:          true,  // Enables glare effect
    // maxGlare:       1       // From 0 - 1.
  });

  var cursor = document.getElementById("cursor");
  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  });
})(jQuery);
