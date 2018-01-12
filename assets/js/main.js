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
            $body.animate({ scrollTop: 0 }, 600);
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

    /*****************************************
    Load Report if Exist
    *****************************************/

    var report_file = $("#main").attr("data-load-report");
    if (report_file) {
      var path = '/assets/data/';
      var jqxhr = $.getJSON(path + report_file, function() {
        console.log( "success" );
      })
      .done(function(data) {
        var exlude_terms = $("#main").attr("data-exclude-terms") ? $("#main").attr("data-exclude-terms").split(" ") : [];
        console.log(data);
        var render_data = {
          count: 0,
          chart1: { labels: [], series: [] },
          chart2: { labels: [], series: [] },
          chart3: { labels: [], series: [] },
          chart4: { labels: [], series: [] },
          chart5: { labels: [], series: [] },
          chart6: { labels: [], series: [] },
        };

        // COUNTER: ACUMULADO DE MUESTRAS
        render_data.count = data.hits.total;

        // GET HISTOGRAM
        var histogram = data
          .aggregations
          .agg_date_histogram_sample_created_at
          .buckets;

        var perc_important = 0.25;
        render_data.avg_samples = parseInt(render_data.count / histogram.length);
        render_data.avg_important = render_data.avg_samples + parseInt(render_data.avg_samples*perc_important);

        // CHART 1: ACUMULADO DE MUESTRAS
        render_data.chart1.labels = histogram
          .map(function(item) {
            return item.key;
          });

        render_data.timeline = histogram
          .map(function(item) {
            var total = item.doc_count;
            var words = [];
            var buckets_words = item
              .agg_terms_sample_words
              .buckets;
            var sample = item
              ['agg_terms_sample_text.keyword']
              .buckets[0].key;

            for (var word of buckets_words) {
              if (!exlude_terms.includes(word.key)) {
                words.push(word.key);
              }
            }

            var patterns = ['neg', 'neutral', 'pos'];
            var pattern_color = ['bg_a', 'bg_b', 'bg_c'];
            var bucket_sentiment = item
              ['agg_terms_sample_sentiment.keyword']
              .buckets;
            var scores = [];
            var influencers = item
              ['agg_terms_author_screen_name.keyword']
              .buckets.map(function(item) {
                var total = item.doc_count;
                return {
                  key: '@' + item.key,
                  account: item.key,
                  href: 'https://twitter.com/' + item.key,
                  score: parseInt(item.agg_avg_author_followers_count.value)
                    .toLocaleString()
                }
              });

            for (var pattern of patterns) {
              for (var s of bucket_sentiment) {
                if (pattern == s.key) {
                  scores.push(s.doc_count / total * 100);
                }
              }
            }

            var max_score = Math.max(...scores);
            var result = {
              total: total.toLocaleString(),
              date: moment(item.key).format('DD-MMM-YY'),
              words: words.slice(0, 3),
              influencers: influencers,
              sample: sample,
              important: total >= render_data.avg_important ? true : false,
              scores: scores,
              max_score: parseInt(max_score),
              sentiment: pattern[scores.indexOf(max_score)],
              color: pattern_color[scores.indexOf(max_score)]
            };
            return result;
          });

        render_data.range = {
          from: moment(render_data.chart1.labels[0]).format('DD/MM/YY'),
          to: moment(render_data.chart1.labels.slice(-1)[0]).format('DD/MM/YY')
        }

        render_data.chart1.series.push(histogram
          .map(function(item) {
            return item.doc_count;
          }));

        // CHART 2: ACUMULADO DE EMO x DIAS
        var pattern = ['mad', 'neutral', 'sad', 'glad', 'scared'];
        var pattern = ['mad', 'sad', 'glad', 'scared'];
        var tmp_data = histogram
          .map(function(item) {
            var buckets = item['agg_terms_sample_emotions.keyword'].buckets;
            var result = {};
            for (var i of buckets) { result[i.key] = i.doc_count;}
            return result;
          });
        render_data.chart2.labels = render_data.chart1.labels;
        for (var key of pattern) {
          var serie_x = [];
          for (var item of tmp_data) {
            serie_x.push(item[key] ? item[key] : 0);
          }
          render_data.chart2.series.push(serie_x);
        }

        // CHART 3: ACUMULADO DE SENTIMIENTO x DIAS
        var pattern = ['neg', 'neutral', 'pos'];
        var tmp_data = histogram
          .map(function(item) {
            var buckets = item['agg_terms_sample_sentiment.keyword'].buckets;
            var result = {};
            for (var i of buckets) { result[i.key] = i.doc_count;}
            return result;
          });
        render_data.chart3.labels = render_data.chart1.labels;
        for (var key of pattern) {
          var serie_x = [];
          for (var item of tmp_data) {
            serie_x.push(item[key] ? item[key] : 0);
          }
          render_data.chart3.series.push(serie_x);
        }

        // CHART 4: PIE AGE
        var pattern = ['mas25', 'menos25'];
        // render_data.chart4.labels = pattern

        var buckets = data
          .aggregations
          ['agg_terms_author_age.keyword']
          .buckets;

        var result = {};
        for (var i of buckets) { result[i.key] = i.doc_count;}
        var tmp_data = result;

        render_data.chart4.series = pattern.map(function(key) {
          return tmp_data[key] ? tmp_data[key] : 0;
        });

        // CHART 5: PIE GENDER
        var pattern = ['m', 'f'];
        // render_data.chart5.labels = pattern

        var buckets = data
          .aggregations
          ['agg_terms_author_gender.keyword']
          .buckets;

        var result = {};
        for (var i of buckets) { result[i.key] = i.doc_count;}
        var tmp_data = result;

        render_data.chart5.series = pattern.map(function(key) {
          return tmp_data[key] ? tmp_data[key] : 0;
        });

        // CHART 6: PIE SENTIMENT
        var pattern = ['neg', 'neutral', 'pos'];
        // render_data.chart6.labels = pattern

        var buckets = data
          .aggregations
          ['agg_terms_sample_sentiment.keyword']
          .buckets;

        var result = {};
        for (var i of buckets) { result[i.key] = i.doc_count;}
        var tmp_data = result;

        render_data.chart6.series = pattern.map(function(key) {
          return tmp_data[key] ? tmp_data[key] : 0;
        });

        // ANALISIS SEMANTICO
        // WORDS
        var pattern = ['neg', 'neutral', 'pos'];
        var buckets = data
          .aggregations
          .agg_terms_sample_words
          .buckets;
        render_data.words = buckets.map(function(item) {
          var total = item.doc_count;
          var scores = item['agg_terms_sample_sentiment.keyword'].buckets;
          var result = {};
          for (var i of scores) { result[i.key] = i.doc_count;}
          return {
            key: item.key,
            href: 'https://twitter.com/search?q=' + item.key,
            scores: pattern.map(function(key) {
              return result[key] ? result[key] / total * 100 : 0;
            })
          }
        });
        // MENTIONS
        var buckets = data
          .aggregations
          ['agg_terms_sample_mentions.keyword']
          .buckets;
        render_data.mentions = buckets.map(function(item) {
          var total = item.doc_count;
          var scores = item['agg_terms_sample_sentiment.keyword'].buckets;
          var result = {};
          for (var i of scores) { result[i.key] = i.doc_count;}
          return {
            key: '@' + item.key,
            href: 'https://twitter.com/' + item.key,
            scores: pattern.map(function(key) {
              return result[key] ? result[key] / total * 100 : 0;
            })
          }
        });
        // HASHTAGS
        var buckets = data
          .aggregations
          ['agg_terms_sample_hashtags.keyword']
          .buckets;
        render_data.hashtags = buckets.map(function(item) {
          var total = item.doc_count;
          var scores = item['agg_terms_sample_sentiment.keyword'].buckets;
          var result = {};
          for (var i of scores) { result[i.key] = i.doc_count;}
          return {
            key: '#' + item.key,
            href: 'https://twitter.com/hashtag/' + item.key,
            scores: pattern.map(function(key) {
              return result[key] ? result[key] / total * 100 : 0;
            })
          }
        });

        // INFLUENCERS
        var buckets = data
          .aggregations
          ['agg_terms_author_screen_name.keyword']
          .buckets;
        render_data.influencers = buckets.map(function(item) {
          var total = item.doc_count;
          return {
            key: '@' + item.key,
            account: item.key,
            href: 'https://twitter.com/' + item.key,
            score: parseInt(item.agg_avg_author_followers_count.value)
              .toLocaleString()
          }
        });

        console.log(render_data);

        // RENDER GRAPHS

        $('#samples_count').text(render_data.count.toLocaleString());
        $('#range_from').text(render_data.range.from);
        $('#range_to').text(render_data.range.to);

        var tooltip = Chartist.plugins.tooltip();
        var options_line = {
          showArea: true,
          showLine: false,
          // lineSmooth: false,
          plugins: [tooltip],
          // showPoint: true,
          fullWidth: true,
          axisX: {
            showGrid: false,
            labelInterpolationFnc: function(value, index) {
              // return index % 2 === 0 ? moment(value).format('DD') : null;
              return moment(value).format('DD');
            }
          }
        };

        var options_bar = {
          stackBars: true,
          // showLine: true,
          // lineSmooth: false,
          plugins: [tooltip],
          showPoint: true,
          // fullWidth: true,
          axisX: {
            showGrid: false,
            labelInterpolationFnc: function(value, index) {
              return index % 2 === 0 ? moment(value).format('DD') : null;
              return moment(value).format('DD');
            }
          }
        };
        var get_options_pie = function (series) {
          var sum = function(a, b) { return a + b };
          return {
            plugins: [tooltip],
            donut: true,
            // showLabel: false,
            donutWidth: 30,
            startAngle: 150,
            labelInterpolationFnc: function(value) {
              return Math.round(value / series.reduce(sum) * 100) + '%';
            }
          }
        };

        new Chartist.Bar('#chart1', render_data.chart1, options_bar);
        new Chartist.Bar('#chart2', render_data.chart2, options_bar);
        new Chartist.Bar('#chart3', render_data.chart3, options_bar);

        new Chartist.Pie(
          '#chart4',
          render_data.chart4,
          get_options_pie(render_data.chart4.series)
        );
        new Chartist.Pie(
          '#chart5',
          render_data.chart5,
          get_options_pie(render_data.chart5.series)
        );
        new Chartist.Pie(
          '#chart6',
          render_data.chart6,
          get_options_pie(render_data.chart6.series)
        );

        // RENDER WORDS
        var template = _.template($('script.tmpl_render_words_sent').html());
        $('#sentiment_of_words').html(template({ items: render_data.words }));
        $('#sentiment_of_hashtags').html(template({ items: render_data.hashtags }));
        $('#sentiment_of_mentions').html(template({ items: render_data.mentions }));

        // RENDER INFLUENCERS
        var template = _.template($('script.tmpl_top_influencers').html());
        $('#top_influencers').html(template({ items: render_data.influencers }));

        // RENDER TIMELINE
        var template = _.template($('script.tmpl_timeline').html());
        $('#render_timeline').html(template({ items: render_data.timeline }));

        new LazyLoad();

      })
      .fail(function(a, b) {
        console.log(b);
      });

    }

}(jQuery));
