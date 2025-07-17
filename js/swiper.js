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
$('.partnerBanner').each(function(index) {
  let t = $(this);
  t.addClass('swiper-' + index);

  let swiper = new Swiper(t.get(0), {
    slidesPerView: '5',
    spaceBetween: 0,
    loop: true,
    speed: 8000,                       // 속도가 크면 느리게, 작으면 빨라짐
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: true,
    freeModeMomentum: false,           // 관성 움직임 꺼서 일정 속도 유지
    allowTouchMove: false,             // 사용자가 건드려서 멈추는 거 방지
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