(function ($) {
	"use strict";

    /*****************************************
    ## Preloader
    *****************************************/
    var $window = $(window),
        $preloader = $('#preloader');

    $window.on('load', function(){
        $preloader.delay(300).fadeOut('slow',function(){
        $preloader.remove();
        });
    }); // $(window).on end

    /*****************************************
    ## Menu Scroll Effect
    *****************************************/
    var $body = $('body'),
        $height = $('.header').outerHeight(),
        $nextEl = $('.homepage-slides-wrapper');

    $window.on('scroll', function () {
        if ($window.scrollTop() > 200) {
            $body.addClass('fixed-nav');
            $nextEl.css("margin-top", $height+"px");
        } else {
            $body.removeClass('fixed-nav');
            $nextEl.css("margin-top", "0");
        }
    }); // $window.on('scroll' end

    //Mobile Nav
    var $mobileNav = '.navbar-collapse.in',
        $document = $(document);
    $(document).on('click',$mobileNav,function(e) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });

    /*****************************************
    ## Scroll To Top
    *****************************************/
    var $scrollup = $('.scrollup');

    $document.on('ready', function(){
        $window.on('scroll' ,function(){
            if ($window.scrollTop() > 800) {
                $scrollup.fadeIn();
            } else {
                $scrollup.fadeOut();
            }
        });

        $scrollup.on('click',function(){
            $html,$body.animate({ scrollTop: 0 }, 600);
            return false;
        });
    });

    /*****************************************
    ## Smooth Scroll
    *****************************************/
    var $smooth_scroll = $('a.smooth_scroll'),
        $htmlbody = $('html,body'),
        $heightFixedNav = $('.header').outerHeight() - 30;

    $smooth_scroll.on('click',function(e){
        e.preventDefault();
        $htmlbody.animate({scrollTop:$(this.hash).offset().top - $heightFixedNav}, "slow");
    });

    /*****************************************
    ## Intro Area Slider
    *****************************************/
	var $homepageSlides = $('.homepage-slides');

    jQuery(document).on('ready', function($) {
		$homepageSlides.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            autoplay: true,
            loop: true,
            navText: ["<i class='icofont icofont-arrow-left'></i>", "<i class='icofont icofont-arrow-right'></i>"],
            mouseDrag: false,
            touchDrag: false,
        });
	});


    /*****************************************
    ## WOW
    *****************************************/
    var wowSel = 'wow';

    var wow = new WOW({
        boxClass: wowSel,
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        callback: function(box) {},
        scrollContainer: null
    });

    wow.init();

    /*****************************************
    ## Magnific Popup
    *****************************************/
    var $gridItem = $('.grid-item');

    $gridItem.magnificPopup({
        type: 'image',
        gallery: {
          enabled: true,
        },
        removalDelay: 400,
        mainClass: 'mfp-fade' //fade effect
    });

    /*****************************************
    ## Testimonial Slider
    *****************************************/
    var $testiCarousel = $('.testimonials .owl-carousel');

    $testiCarousel.owlCarousel({
        items: 1,
        loop: true,
        margin: 30,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        dots: true
    });

    /*****************************************
    ## Partners Slider
    *****************************************/
    var $owl_partners = $('.partner');

    $owl_partners.owlCarousel({
        items: 5,
        autoPlay: true,
        responsiveClass: true,
        responsive:{
            0:{
                items:1
            },
            481:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:6
            }
        },
        pagination          : false,
        navigation          : false,
        autoHeight          : false,
        dots                : false,
    });

    /*****************************************
    Ajax Contact Form
    *****************************************/
    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).on('submit', function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

            // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            var $formMessages = $(formMessages);

            // Make sure that the formMessages div has the 'success' class.
            $formMessages.removeClass('alert alert-danger alert-dismissable fade in error');
            $formMessages.addClass('alert alert-success alert-dismissable fade in success');

            // Set the message text.
            $formMessages.text(response).append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');

            var $fName = $('#fName'),
            $lName = $('#lName'),
            $email = $('#email'),
            $phone = $('#phone'),
            $cSubject = $('#cSubject'),
            $message = $('#message');

            // Clear the form.
            $fName.val('');
            $lName.val('');
            $email.val('');
            $phone.val('');
            $cSubject.val('');
            $message.val('');
        })

        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $formMessages.removeClass('alert alert-success alert-dismissable fade in success');
            $formMessages.addClass('alert alert-danger alert-dismissable fade in error');

            // Set the message text.
            if (data.responseText !== '') {
                $formMessages.text(data.responseText).append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');
            } else {
                $formMessages.text('Oops! An error occured and your message could not be sent.');
            }
        });

    });
    /*****************************************
    End of Ajax Contact Form
    *****************************************/
    var data = {
      labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
      series: [
        [5, 4, 3, 7, 5, 10],
        [3, 2, 9, 5, 4, 6],
        [2, 1, -3, -4, -2, 0]
      ]
    };

    var options = { low: 0, showArea: true	};

		new Chartist.Line('#chart1', data, options);
		new Chartist.Line('#chart2', data, options);
		// new Chartist.Line('#chart3', data, { low: 0, showArea: true	});


}(jQuery));
