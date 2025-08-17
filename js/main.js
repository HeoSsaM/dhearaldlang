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
    if ($(this).width() > 767) {
      $('.gnbArea').removeClass('open');
      $('#header .logo').removeClass('on');
    }
  });
});
