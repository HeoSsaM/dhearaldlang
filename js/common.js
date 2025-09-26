// main.js
$(function () {
  const $win = $(window);
  const $body = $('body');
  const $gnb = $('#gnb');
  const $btnOpen = $('#btnMobile');
  const $btnClose = $('#btnClose');

  // ===== 분기점(필요 시 숫자만 바꿔도 동작) =====
  const BP = {
    XS_MAX: 430,     // 초소형
    SM_MAX: 768,     // 모바일
    MD_MAX: 1024,    // 태블릿/작은 노트북
  };

  // 헤더(GNB)와 콘텐츠의 기준은 기존 의미 유지
  const BREAK_HEADER  = BP.MD_MAX; // 1024
  const BREAK_CONTENT = BP.SM_MAX; // 768

  const isHeaderMobile  = () => $win.width() <= BREAK_HEADER;
  const isContentMobile = () => $win.width() <= BREAK_CONTENT;

  // ===== 화면 티어 계산 (xs/sm/md/lg) =====
  function getTier(w) {
    const width = w ?? $win.width();
    if (width <= BP.XS_MAX) return 'xs';
    if (width <= BP.SM_MAX) return 'sm';
    if (width <= BP.MD_MAX) return 'md';
    return 'lg';
  }

  // ===== dim 자동 생성 =====
  let $dim = $('.dim');
  if (!$dim.length) {
    $dim = $('<div class="dim" aria-hidden="true"></div>').appendTo('body');
  }

  // ===== GNB 제어 =====
  function openMobile() {
    $gnb.addClass('open').attr('aria-hidden', 'false');
    $btnOpen.attr('aria-expanded', 'true');
    $body.addClass('no-scroll menu-open');
  }
  function closeMobile() {
    $gnb.removeClass('open').attr('aria-hidden', 'true');
    $btnOpen.attr('aria-expanded', 'false');
    $body.removeClass('no-scroll menu-open');
  }
  function enterDesktop() {
    closeMobile();
  }

  // ===== 콘텐츠 훅(티어별) =====
  // 필요에 맞게 내부 로직을 채워 넣으세요.
  function initXS() {
    // 430px 이하에서만 필요한 초기화
    // 예) 폰트 축소, 카드 한 줄 배치, 매우 작은 버튼 터치 영역 확장 등
    // console.log('initXS');
  }
  function destroyXS() {
    // XS에서 했던 변경 복원
    // console.log('destroyXS');
  }

  function initSM() {
    // 431~768 구간에서 필요한 초기화
    // 예) 슬라이더 옵션(슬라이드 1.1장 보기) 등
    // console.log('initSM');
  }
  function destroySM() {
    // console.log('destroySM');
  }

  function initMD() {
    // 769~1024 구간에서 필요한 초기화
    // 예) GNB 반응형 전환 직전 레이아웃 보정 등
    // console.log('initMD');
  }
  function destroyMD() {
    // console.log('destroyMD');
  }

  function initLG() {
    // 1025 이상 데스크톱에서 필요한 초기화
    // console.log('initLG');
  }
  function destroyLG() {
    // console.log('destroyLG');
  }

  // 현재 적용된 티어를 추적하여, 티어 변경시에만 init/destroy 수행
  let currentTier = null;
  function applyTier() {
    const nextTier = getTier();
    if (nextTier === currentTier) return;

    // 이전 티어 해제
    switch (currentTier) {
      case 'xs': destroyXS(); break;
      case 'sm': destroySM(); break;
      case 'md': destroyMD(); break;
      case 'lg': destroyLG(); break;
    }

    // 새 티어 초기화
    switch (nextTier) {
      case 'xs': initXS(); break;
      case 'sm': initSM(); break;
      case 'md': initMD(); break;
      case 'lg': initLG(); break;
    }

    currentTier = nextTier;
  }

  // ===== 초기 상태 적용 =====
  if (isHeaderMobile()) closeMobile(); else enterDesktop();
  // 기존 768 기준 훅과 함께, 티어 훅도 적용
  if (isContentMobile()) { /* 과거 로직 필요 시 여기에 */ }
  applyTier();

  // ===== 이벤트 바인딩 =====
  $btnOpen.on('click', function (e) {
    e.preventDefault();
    if (isHeaderMobile()) openMobile();
  });
  $btnClose.on('click', function () {
    if (isHeaderMobile()) closeMobile();
  });
  $(document).on('click', '.dim', function () {
    if (isHeaderMobile()) closeMobile();
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && isHeaderMobile()) closeMobile();
  });

  // ===== 리사이즈 디바운스(requestAnimationFrame) =====
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
      // 콘텐츠 분기 변화(기존 훅 유지)
      if (nowContentMobile !== lastContentMobile) {
        // 필요 시 과거 init/destroyMobileContent 호출 위치
        lastContentMobile = nowContentMobile;
      }

      // 티어 훅 적용 (xs/sm/md/lg)
      applyTier();
    });
  }).trigger('resize');
});
