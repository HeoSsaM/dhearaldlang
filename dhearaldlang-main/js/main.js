$(function () {
  $('.btnMobile').on('click', function () {
    $('.gnbArea').addClass('open');
    $('#header .logo').addClass('on');      // h1.logo에 on
  });

  $('.btnClose').on('click', function () {
    $('.gnbArea').removeClass('open');
    $('#header .logo').removeClass('on');   // on 제거
  });

  // PC로 넘어가면 강제 닫기(선택)
  $(window).on('resize', function () {
    if ($(this).width() > 760) {
      $('.gnbArea').removeClass('open');
      $('#header .logo').removeClass('on');
    }
  });
});


//기업맞춤교육 파트너사 롤링
const logoWrap = document.querySelector('.partners_logo');
let scrollAmount = 1; // 이동 픽셀 단위

function autoScroll() {
  logoWrap.scrollLeft += scrollAmount;

  // 끝에 닿으면 방향 전환
  if (logoWrap.scrollLeft + logoWrap.clientWidth >= logoWrap.scrollWidth) {
    scrollAmount = -1;
  } else if (logoWrap.scrollLeft <= 0) {
    scrollAmount = 1;
  }
}

setInterval(autoScroll, 20); // 20ms마다 실행 (속도 조절 가능)
