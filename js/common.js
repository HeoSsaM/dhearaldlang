// main.js
$(function () {
  const $win = $(window);
  const $body = $('body');
  const $gnb = $('#gnb');
  const $btnOpen = $('#btnMobile');
  const $btnClose = $('#btnClose');

  // 분기점
  const BREAK_HEADER  = 1024; // 헤더(GNB) 전용
  const BREAK_CONTENT = 768;  // 모바일 콘텐츠 전용

  const isHeaderMobile  = () => $win.width() <= BREAK_HEADER;
  const isContentMobile = () => $win.width() <= BREAK_CONTENT;

  // .dim 없으면 자동 생성 (body 맨 끝)
  let $dim = $('.dim');
  if (!$dim.length) {
    $dim = $('<div class="dim" aria-hidden="true"></div>').appendTo('body');
  }

  // === GNB 제어 ===
  function openMobile() {
    $gnb.addClass('open').attr('aria-hidden', 'false');
    $btnOpen.attr('aria-expanded', 'true');
    $body.addClass('no-scroll menu-open'); // .dim 노출 트리거
  }
  function closeMobile() {
    $gnb.removeClass('open').attr('aria-hidden', 'true');
    $btnOpen.attr('aria-expanded', 'false');
    $body.removeClass('no-scroll menu-open'); // .dim 숨김
  }
  function enterDesktop() {
    // 데스크톱 진입 시 초기화
    closeMobile();
  }

  // === 모바일 콘텐츠 훅(필요 시 구현) ===
  function initMobileContent() {
    // 768px 이하에서만 필요한 초기화 코드
    // if (!window._mobileContentInited) { ...; window._mobileContentInited = true; }
  }
  function destroyMobileContent() {
    // 769px 이상에서 해제 코드
    // window._mobileContentInited = false;
  }

  // 초기 상태 적용
  if (isHeaderMobile()) closeMobile(); else enterDesktop();
  if (isContentMobile()) initMobileContent(); else destroyMobileContent();

  // 이벤트 바인딩 (1회)
  $btnOpen.on('click', function (e) {
    e.preventDefault();
    if (isHeaderMobile()) openMobile();
  });
  $btnClose.on('click', function () {
    if (isHeaderMobile()) closeMobile();
  });
  // .dim은 동적 생성될 수 있으므로 위임 바인딩
  $(document).on('click', '.dim', function () {
    if (isHeaderMobile()) closeMobile();
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && isHeaderMobile()) closeMobile();
  });

  // 리사이즈 디바운스
  let lastHeaderMobile  = isHeaderMobile();
  let lastContentMobile = isContentMobile();
  let rAF = null;

  $win.on('resize', function () {
    if (rAF) return;
    rAF = requestAnimationFrame(() => {
      rAF = null;

      const nowHeaderMobile  = isHeaderMobile();
      const nowContentMobile = isContentMobile();

      // 헤더 분기 변화
      if (nowHeaderMobile !== lastHeaderMobile) {
        nowHeaderMobile ? closeMobile() : enterDesktop();
        lastHeaderMobile = nowHeaderMobile;
      }
      // 콘텐츠 분기 변화
      if (nowContentMobile !== lastContentMobile) {
        nowContentMobile ? initMobileContent() : destroyMobileContent();
        lastContentMobile = nowContentMobile;
      }
    });
  }).trigger('resize');
});
