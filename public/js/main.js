(function ($) {
"use strict";
// TOP Menu Sticky
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 400) {
    $("#sticky-header").removeClass("sticky");
    $('#back-top').fadeIn(500);
	} else {
    $("#sticky-header").addClass("sticky");
    $('#back-top').fadeIn(500);
	}
});

 // Toggle student Type input
 $(document).ready(function(){
  $('input[name="studentType"]').change(function(){
    
      if($(this).val() === "yes"){
          $("#studentIdInput").fadeIn();
      }
      else{
          $("#studentIdInput").fadeOut();
      }
  });
});

// Toggle Register As input
$(document).ready(function(){
  $('input[name="RegisterAs"]').change(function(){
    
      if($(this).val() === "participant" || $(this).val() === "ParticipantAndSocialEvent"){
          $("#sports").fadeIn();
      }
      else{
          $("#sports").fadeOut();
      }
  });
});

// Futsal Team Players toggle
$(document).ready(function(){
  $('input[name="FutsalPlayers"]').on('input', function(){
    var value = parseInt($(this).val());
    var errorMessage = '';

    if (isNaN(value)) {
      errorMessage = 'Please enter a valid number.';
    } else if (value < 5) {
      errorMessage = 'Minimum number of players is 5.';
    } else if (value > 8) {
      errorMessage = 'Maximum number of players is 8.';
    }

    // Show or hide the error message based on the condition
    if (errorMessage) {
      $('#FutsalPlayersError').text(errorMessage).show();
    } else {
      $('#FutsalPlayersError').hide();
    }
  });

  // Show the input field when Futsal is checked
  $('input[name="Futsal"]').change(function(){
    if ($(this).prop('checked')) {
      $("#FutsalPlayersDiv").fadeIn();
    } else {
      $("#FutsalPlayersDiv").fadeOut();
      // Hide the error message when the input field is hidden
      $('#FutsalPlayersError').hide();
    }
  });
});






// Basketball Team Players toggle
$(document).ready(function(){
  $('input[name="BasketballPlayers"]').on('input', function(){
    var value = parseInt($(this).val());
    var errorMessage = '';

    if (isNaN(value)) {
      errorMessage = 'Please enter a valid number.';
    } else if (value < 5) {
      errorMessage = 'Minimum number of players is 5.';
    } else if (value > 8) {
      errorMessage = 'Maximum number of players is 8.';
    }

    // Show or hide the error message based on the condition
    if (errorMessage) {
      $('#BasketballPlayersError').text(errorMessage).show();
    } else {
      $('#BasketballPlayersError').hide();
    }
  });

  // Show the input field when Futsal is checked
  $('input[name="Basketball"]').change(function(){
    if ($(this).prop('checked')) {
      $("#BasketballPlayersDiv").fadeIn();
    } else {
      $("#BasketballPlayersDiv").fadeOut();
      // Hide the error message when the input field is hidden
      $('#BasketballPlayersError').hide();
    }
  });
});




//Badminton Type Toggle
$(document).ready(function(){
  $('input[name="Badminton"]').change(function(){
      if($(this).is(":checked")){
          $("#BadmintonTypeDiv").fadeIn();
      }
      else{
          $("#BadmintonTypeDiv").fadeOut();
      }
  });
});



//Board Games Type Toggle
$(document).ready(function(){
  $('input[name="BoardGames"]').change(function(){
      if($(this).is(":checked")){
          $("#BoardGamesDiv").fadeIn();
      }
      else{
          $("#BoardGamesDiv").fadeOut();
          $("#BoardGamesDiv input[type='checkbox']").prop('checked', false);
      }
  });
});


//E-Gaming Type Toggle
$(document).ready(function(){
  $('input[name="EGaming"]').change(function(){
      if($(this).is(":checked")){
          $("#EGamingDiv").fadeIn();
      }
      else{
          $("#EGamingDiv").fadeOut();
          $("#EGamingDiv input[type='checkbox']").prop('checked', false);
      }
  });
});


// Toggle parliamentary summit div

$('input[name="ParliamentarySummit"]').change(function(){
  if ($(this).prop('checked')) {
    $("#ParliamarySummitDiv").fadeIn();
  } else {
    $("#ParliamarySummitDiv").fadeOut();
   
  }
});


// Calculate Total Price
$(document).ready(function(){
  // Event listener for changes in sport checkboxes
  $('input[type="checkbox"]').change(function() {
      calculateTotalPrice();
      toggleTotalPriceDiv();
  });

  // Event listener for changes in match type radio buttons
  $('input[name="matchType"]').change(function() {
      calculateTotalPrice();
      toggleTotalPriceDiv();
  });

  // Event listener for changes in the number of players for Futsal
  $('#FutsalPlayers').on('input', function() {
      calculateTotalPrice();
  });

  // Event listener for changes in the number of players for Basketball
  $('#BasketballPlayers').on('input', function() {
      calculateTotalPrice();
  });

  // Event listener for changes in "RegisterAs" radio buttons
  $('input[name="RegisterAs"]').change(function() {
    calculateTotalPrice();
    toggleTotalPriceDiv(); // Show/hide the TotalPriceDiv based on the current selection
  });

  // Function to calculate the total price
  function calculateTotalPrice() {
    var totalPrice = 0;
    var socialEvents = 2500;
    var finalTotal = 0;

    if ($('#RegisterAsObserver').is(':checked')) {
        totalPrice = 3000;
    } else {
        // Loop through each checked checkbox
        $('input[type="checkbox"]:checked').each(function() {
            var sportName = $(this).attr('name');
            var matchType = getMatchType(sportName);
            var pricePerPlayer = getPricePerPlayer(sportName, matchType);
            totalPrice += pricePerPlayer;
        });

        // Add social events price if "Participant + Social Event" is selected
        if ($('#RegisterAsParticipantAndSocialEvent').is(':checked')) {
            finalTotal += totalPrice + socialEvents;
            $('#finaltotalprice').text('RS. ' + finalTotal);
        }
    }

    // Update the total price display
    $('#finaltotalprice').text('RS. ' + totalPrice);
  
    // Update the observer and sports total price displays
    if ($('#RegisterAsObserver').is(':checked')) {
        $('#observertotalprice').text('RS. ' + totalPrice);
        $('#sportstotalprice').text('-');
        $('#socialeventstotalprice').text('-');
    } else if ($('#RegisterAsParticipantAndSocialEvent').is(':checked')) {
        $('#observertotalprice').text('-');
        $('#sportstotalprice').text('RS. ' + totalPrice);
        $('#socialeventstotalprice').text('RS. ' + socialEvents);
    } else {
        $('#observertotalprice').text('-');
        $('#sportstotalprice').text('RS. ' + totalPrice);
        $('#socialeventstotalprice').text('-');
    }
}

  function toggleTotalPriceDiv() {
    var hasCheckedSport = $('input[type="checkbox"]:checked').length > 0;
    if ($('#RegisterAsObserver').is(':checked') || hasCheckedSport) {
        $('#TotalPriceDiv').show();
    } else {
        $('#TotalPriceDiv').hide(); // Hide the div if RegisterAs Observer is not selected and there are no checked sports
    }
  }

  // Function to get the match type based on the sport name
  function getMatchType(sportName) {
      switch(sportName) {
          case 'Badminton':
              return $('input[name="matchType"]:checked').val();
          default:
              return null;
      }
  }

  // Function to get the price per player based on the sport name and match type
  function getPricePerPlayer(sportName, matchType) {
      switch(sportName) {
          case 'Futsal':
          case 'Basketball':
              // Get the number of players for Futsal or Basketball
              var numPlayers = 0;
              if (sportName === 'Futsal') {
                  numPlayers = parseInt($('#FutsalPlayers').val());
              } else if (sportName === 'Basketball') {
                  numPlayers = parseInt($('#BasketballPlayers').val());
              }
              // Check if the number of players is within the valid range
              if (numPlayers < 5 || numPlayers > 8) {
                  return calculateTotalPrice(); // Return 0 if the number of players is invalid
              }
              // Return the price per player multiplied by the number of players
              return numPlayers * 1000;
          case 'TableTennis':
          case 'Ludo':
          case 'Chess':
          case 'Carrom':
          case 'Tekken':
          case 'Fifa':
          case 'ParliamentarySummit':
              return 1000;
          case 'Badminton':
              if (matchType === 'single') {
                  return 1000;
              } else if (matchType === 'double') {
                  return 2000;
              }
              return 0;
          default:
              return 0;
      }
  }
});






















$(document).ready(function(){

// mobile_menu
var menu = $('ul#navigation');
if(menu.length){
	menu.slicknav({
		prependTo: ".mobile_menu",
		closedSymbol: '+',
		openedSymbol:'-'
	});
};
// blog-menu
  // $('ul#blog-menu').slicknav({
  //   prependTo: ".blog_menu"
  // });

// review-active
$('.slider_active').owlCarousel({
  loop:true,
  margin:0,
  items:1,
  autoplay:true,
  navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
  nav:true,
  dots:false,
  autoplayHoverPause: true,
  autoplaySpeed: 800,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  responsive:{
      0:{
          items:1,
          nav:false,
      },
      767:{
          items:1,
      },
      992:{
          items:1,
          nav:true
      },
      1200:{
          items:1,
      },
      1600:{
          items:1,
          nav:true
      }
  }
});



// review-active
var brand_active = $('.brand_active');
if(brand_active.length){
  brand_active.owlCarousel({
  loop:true,
  margin:0,
  autoplay:true,
  navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
  nav:false,
  dots:false,
  autoplayHoverPause: true,
  autoplaySpeed: 800,
  center: false,
    responsive:{
        0:{
            items:1,
            nav:false
        },
        767:{
            items:3
        },
        992:{
            items:4
        },
        1200:{
            items:4
        },
        1500:{
            items:5
        }
    }
  });
}


// for filter
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      // use outer width of grid-sizer for columnWidth
      columnWidth: 1
    }
  });

  // filter items on button click
  $('.portfolio-menu').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  //for menu active class
  $('.portfolio-menu button').on('click', function (event) {
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    event.preventDefault();
	});
  
  // wow js
  new WOW().init();

  // counter 
  $('.counter').counterUp({
    delay: 10,
    time: 10000
  });

/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup img view */
$('.img-pop-up').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


  // scrollIt for smoth scroll
  $.scrollIt({
    upKey: 38,             // key code to navigate to the next section
    downKey: 40,           // key code to navigate to the previous section
    easing: 'linear',      // the easing function for animation
    scrollTime: 600,       // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null,    // function(pageIndex) that is called when page is changed
    topOffset: 0           // offste (in px) for fixed top navigation
  });

  // scrollup bottom to top
  $.scrollUp({
    scrollName: 'scrollUp', // Element ID
    topDistance: '4500', // Distance from top before showing element (px)
    topSpeed: 300, // Speed back to top (ms)
    animation: 'slide', // Fade, slide, none
    animationInSpeed: 200, // Animation in speed (ms)
    animationOutSpeed: 200, // Animation out speed (ms)
    easingType: 'linear',
    scrollText: '<i class="ti-angle-up"></i>', // Text for element
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'slide'
  });


  // blog-page

  //brand-active
$('.brand-active').owlCarousel({
  loop:true,
  margin:30,
items:1,
autoplay:true,
  nav:false,
dots:false,
autoplayHoverPause: true,
autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:4
      },
      992:{
          items:7
      }
  }
});

// blog-dtails-page

  //project-active
$('.project-active').owlCarousel({
  loop:true,
  margin:30,
items:1,
// autoplay:true,
navText:['<i class="Flaticon flaticon-left-arrow"></i>','<i class="Flaticon flaticon-right-arrow"></i>'],
nav:true,
dots:false,
// autoplayHoverPause: true,
// autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:1,
          nav:false
      },
      992:{
          items:2,
          nav:false
      },
      1200:{
          items:1,
      },
      1501:{
          items:2,
      }
  }
});

if (document.getElementById('default-select')) {
  $('select').niceSelect();
}

  //about-pro-active
$('.details_active').owlCarousel({
  loop:true,
  margin:0,
items:1,
// autoplay:true,
navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
nav:true,
dots:false,
// autoplayHoverPause: true,
// autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:1,
          nav:false
      },
      992:{
          items:1,
          nav:false
      },
      1200:{
          items:1,
      }
  }
});

});

// resitration_Form
$(document).ready(function() {
	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
});



//------- Mailchimp js --------//  
function mailChimp() {
  $('#mc_embed_signup').find('form').ajaxChimp();
}
mailChimp();



        // Search Toggle
        $("#search_input_box").hide();
        $("#search").on("click", function () {
            $("#search_input_box").slideToggle();
            $("#search_input").focus();
        });
        $("#close_search").on("click", function () {
            $('#search_input_box').slideUp(500);
        });
        // Search Toggle
        $("#search_input_box").hide();
        $("#search_1").on("click", function () {
            $("#search_input_box").slideToggle();
            $("#search_input").focus();
        });
        $(document).ready(function() {
          $('select').niceSelect();
        });


        


        const tilt = $('.js-tilt').tilt({
          maxTilt:        20,
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


      var cursor = document.getElementById('cursor');
      document.addEventListener('mousemove', function(e){
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
      })


     

})(jQuery);	