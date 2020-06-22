// import $ from 'jquery';
// import aos from 'aos';
// import 'aos';
// import Swiper from 'swiper';
// import '/node_modules/swiper/js/swiper.min.js';
// import '../../../../node_modules/swiper/js/swiper'

$(document).ready(function () {
    var swiper_Choices = new Swiper('.section__topChoices .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        loopFillGroupWithBlank: true, //@@todo
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // 767: {
            // 768: {
            500: {
                slidesPerView: 2,
            },
            // 1199: {
            //     slidesPerView: 3,
            // },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        }
    });

    var swiper__inspiration = new Swiper('.section__inspiration .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // @@slidesPerGroup
        breakpoints: {
            // 576: {
            //     slidesPerView: 2,
            //     // slidesPerGroup: 1,
            // },
            // 1199: {
            //     slidesPerView: 3,
            //     // slidesPerGroup: 3,
            // },
            500: {
                slidesPerView: 2,
                slidesPerGroup: 1,//一個一組
            },
            // 992: {
            //     slidesPerView: 3,
            //     slidesPerGroup: 2,
            // },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,//三個一組
            }
        }
    });
    var swiper__detailBanner = new Swiper('.section__detailBanner .swiper-container', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    $(".js-btn").click(function () {
        $(this).find('.js-btn__info').toggleClass('invisible');
        if ($(this).find(".js-btn__more").text() != "expand_less") {
            $(this).find(".js-btn__more").text("expand_less");
        } else {
            $(this).find(".js-btn__more").text("expand_more");
        }
    });


    // $(window).resize(function () {
    //     if ($(window).width() < 576) {
    //         $('.js-myBooking__item').addClass(' bg-secondary rounded--deepen');
    //     } else {
    //         $('.js-myBooking__item').removeClass('bg-secondary rounded--deepen');
    //     }

    //     if ($(window).width() < 992) {
    //         $('.js-calendar__mobileDropdown').addClass('w-100');
    //         $('.js-calendar__mobileTable').addClass('table-sm');
    //     } else {
    //         $('.js-calendar__mobileDropdown').removeClass('w-100');
    //         $('.js-calendar__mobileTable').removeClass('table-sm');
    //     }
    // });

    switch ($('title').text()) {

        case "Index":
            $(".js-nav").addClass('fixed-top');
            break;
        case "Result":
            $(".js-nav").addClass('fixed-top');
            break;
        case "Result - Detail":
            $(".js-nav").addClass('fixed-top');
            break;
        case "Login":
            $(".js-nav").hide();
            $(".js-footer__nav").hide();
            break;
        case "My Booking":
            $(".js-nav__signUp").hide();
            $(".js-nav__login").hide();
            $(".js-nav__hasLogin").addClass('d-block');
            $(".js-nav__hasLogin__userName").text('David Lin');
            break;
    }

    AOS.init({
        useClassNames: true,
        initClassName: false,
        animatedClassName: 'animate__animated'
    });
});






