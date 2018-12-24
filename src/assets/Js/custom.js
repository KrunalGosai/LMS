jQuery(document).ready(function ($) {
    //setTimeout (function(){
    $('.category-listing').hide();
    $('body').click(function (e) {
        
        if (!$(e.target).hasClass("category-button")) {
            $('.category-listing').hide();
            $('.category-button').removeClass('active');
        }
    });
    // $('body').on('click', '.hp-row', function (e) {
    //     $('.category-listing').hide();
    //     $('.category-button').removeClass('active');
    // });
    // $('body').on('click', '.header', function () {
    //     $('.category-listing').hide();
    //     $('.category-button').removeClass('active');
    // });

    $('.book-listing-arrow').css('margin-top', (($('.book-listing').outerHeight() - $('.book-listing-arrow').outerHeight()) / 2))


    //set the same height of all the images in the list of books
    var maxHeight = 0;
    $("ul.book-listing > li > a > img").each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    var imageHeight = 0;
    $("div.inner-page-container > .product-listing > li > div > img").each(function () {
        if ($(this).height() > imageHeight) {
            imageHeight = $(this).height();
        }
    });
    $("div.inner-page-container > .product-listing > li > div > img").height(maxHeight);

    //},9000);




    $('.book-listing-arrow').css('margin-top', (($('.book-listing').outerHeight() - $('.book-listing-arrow').outerHeight()) / 2))

    // $('.category-button').click(function () {
    //     $(this).toggleClass('active');
    //     $('.category-listing').slideToggle()
    // })
    $(document).ready(function () {
        // $('.category-button').click(function(e){
        //    e.stopPropagation();

        // });
        // /***--- click outside close category menu ---***/
        // $('html').click(function() {
        //   var $drop = $('.category-listing');
        //   $(".category-button").removeClass("active");
        //   if($drop.is(":visible")) {
        //     $drop.slideUp('medium', function() {
        //       // Animation complete.
        //     });
        //   }
        // });
    });
    /***---End click outside close category menu ---***/
    /**2 **/
    $('.category-button').hover(function () {
        $(this).toggleClass('active');
        $('.category-listing').slideDown()
    })


    /***---End click outside close category menu ---***/



    if ($(window).width() > 1200) {
        $('.book-listing li').each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $('.book-listing li').height(maxHeight);
    }

    $('body').on("click", ".category-button", function () {
        //  setTimeout (function(){
        $(this).toggleClass('active');
        $('.category-listing').slideToggle()
        //  },9000);
    })
    // $('body').on("click", ".category-item", function () {
    //     $('.category-button').removeClass('active');
    //     $('.category-listing').slideUp();
    // })
    $('body').on("click", ".menu-toggle", function () {
        $(this).toggleClass("on");
        $('.menu-list').slideToggle();
    })

    if ($(window).width() > 1200) {
        var maxHeight = -1;
        $('.book-listing li').each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $('.book-listing li').height(maxHeight);
    }
    $('body').on("click", ".sorting-btn", function () {
        if ($('.sorting-btn').hasClass("asc-sorting")) {
            $('.sorting-btn').removeClass('asc-sorting');
            $('.sorting-btn').addClass('desc-sorting');
        }
        else {
            $('.sorting-btn').addClass('asc-sorting');
            $('.sorting-btn').removeClass('desc-sorting');
        }
    })
    $('body').on("click", ".reviews-actions", function () {
        $('html, body').animate({
            scrollTop: $(".product-comment-section").offset().top
        }, 2000);
    });
    $('body').on("click", ".prl-product-return-btn", function () {
        $(this).parent().siblings('.prl-product-feedback-box').slideToggle();
    })
    $('.user-icon').click(function () {
        $('.my-acct-login-bar').toggleClass('open')
        $('body').on("click", ".reviews-actions", function () {
            $('html, body').animate({
                scrollTop: $(".product-comment-section").offset().top
            }, 2000);
        });
    })



});



// setTimeout(function () {
//     jQuery(document).ready(checkContainer);

//     function checkContainer() {
//         if ($('.pl-notify-box').is(':visible')) {
//             $('.pl-notify-box').click(function () {
//                 $('.mail-popup-box').show();
//             })
//             $('.mpb-close-btn').click(function () {
//                 $('.mail-popup-box').hide();
//             })
//         }
//         else {
//             setTimeout(checkContainer, 5000);
//         }
//     }

// }, 9000);
