//index 
var swiper = new Swiper(".mainHero", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//파트너사
const swiperSlides = document.querySelectorAll('.partnerBanner');

swiperSlides.forEach(function (element, index) {
    element.classList.add("swiper-" + index);
    let swiper = new Swiper(".swiper-" + index, {
      autoplay: {
            delay: 1,
            desableOnInteraction: false,
      },
      speed: 8e3,
      loop: true,
      slidesPerView: "auto",
      freemode: true,      
    });
});

//회사소개 리뷰
/* 회사소개 */
var swiper = new Swiper(".caseCards", {
      slidesPerView: 3,
      spaceBetween: 40,   
      autoplay: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });