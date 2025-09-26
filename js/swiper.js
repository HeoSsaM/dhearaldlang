//index
let swiperTopic = null;

function initSwiper() {
  const isMobile = window.innerWidth < 769;

  if (isMobile && !swiperTopic) {
    // 모바일일 때만 실행
    swiperTopic = new Swiper(".swiper-topic", {
      slidesPerView: 1.5,
      spaceBetween: 30,
    });
  } else if (!isMobile && swiperTopic) {
    // PC 전환 시 swiper 제거
    swiperTopic.destroy(true, true);
    swiperTopic = null;
  }
}

// 최초 실행
initSwiper();

// 화면 리사이즈 시 다시 체크
window.addEventListener("resize", initSwiper);

//파트너사
$(".partnerBanner").each(function (index) {
  const t = $(this);
  t.addClass("swiper-" + index);

  const swiper = new Swiper(t.get(0), {
    slidesPerView: 3, // 기본: 모바일(<= 767px)
    spaceBetween: 0,
    loop: true,
    speed: 8000,
    autoplay: { delay: 0, disableOnInteraction: false },
    freeMode: true,
    freeModeMomentum: false,
    allowTouchMove: false,

    // >= 768px부터 덮어쓰기
    breakpoints: {
      768: { slidesPerView: 5 },
    },
  });
});

//회사소개 리뷰
/* 회사소개 */
document.addEventListener("DOMContentLoaded", function () {
new Swiper(".myCase", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 10,
  pagination: {
    el: ".myCase .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    769: {
      enabled: false,
    },
  },
  observer: true,
  observeParents: true,
});
})

document.addEventListener("DOMContentLoaded", function () {
//기업맞춤교육 - 수업목표
if (window.innerWidth <= 768) {
      const swiper = new Swiper(".swiper-goal-steps.swiper", {
        slidesPerView: 1.5,
        spaceBetween: 16,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  })