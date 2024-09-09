$(document).ready(function () {
  var swiper = new Swiper(".swiper-container-h", {
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    parallax: true,
    mousewheel: false,
    loop: true,

    on: {
      init: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find(".slide-bg ")
            .attr({
              "data-swiper-parallax": 0.75 * swiper.width,
            });
        }
      },
      resize: function () {
        this.update();
      },
    },

    pagination: {
      el: ".creative-showcase--slider .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return (
          '<span class="' +
          className +
          '">' +
          '<svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">' +
          '<circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"' +
          'stroke-opacity="1" stroke-width="1px"></circle>' +
          '<circle cx="8" cy="8" r="3" fill="#FFF"></circle>' +
          "</svg></span>"
        );
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

// =================
$(".blog-slider").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  autoplay: true,
  navText: [
    '<span class="iconify" data-icon="ep:arrow-left-bold"></span>',
    '<span class="iconify" data-icon="ep:arrow-right-bold"></span>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});
// ==============reviews-sldier=======

$(".review-slider").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  navText: [
    '<span class="iconify" data-icon="ep:arrow-left-bold"></span>',
    '<span class="iconify" data-icon="ep:arrow-right-bold"></span>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

AOS.init();
