// /js/swipers.pc-only.js
(() => {
  // PC 기준 폭(>=769px이면 실행)
  const BREAKPOINT_PX = 769;

  if (!window.Swiper) {
    console.warn('[swiper] Swiper 라이브러리가 로드되지 않았습니다.');
    return;
  }

  // 생성된 인스턴스를 요소별로 보관
  const instances = new Map();

  // 스와이퍼 정의: selector 별 옵션 (모두 PC 전용)
  // 필요 없으면 항목을 지우고, 필요한 슬라이더만 남기세요.
  const CONFIGS = [
    {
      selector: '.swiper-topic',
      mode: 'pc',
      options: (el) => ({
        slidesPerView: 3,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
      }),
    },
    {
      // 파트너 배너 여러 개(.partnerBanner) 지원
      selector: '.partnerBanner',
      mode: 'pc',
      options: (el) => ({
        slidesPerView: 5,
        spaceBetween: 0,
        loop: true,
        speed: 8000,
        autoplay: { delay: 0, disableOnInteraction: false },
        freeMode: true,
        freeModeMomentum: false,
        allowTouchMove: false,
        observer: true,
        observeParents: true,
      }),
    },
    {
      // 회사소개 리뷰
      selector: '.myCase',
      mode: 'pc',
      options: (el) => ({
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
        pagination: {
          // 컨테이너 내부의 페이지네이션을 자동 참조
          el: el.querySelector('.swiper-pagination') || undefined,
          clickable: true,
        },
        observer: true,
        observeParents: true,
      }),
    },
    {
      // 기업맞춤교육 - 수업목표
      selector: '.swiper-goal-steps',
      mode: 'pc',
      options: (el) => ({
        slidesPerView: 2.5,
        spaceBetween: 25,
        centeredSlides: true,
        pagination: {
          el: el.querySelector('.swiper-pagination') || undefined,
          clickable: true,
        },
        observer: true,
        observeParents: true,
      }),
    },
  ];

  // 요소별 data-run으로 모드 덮어쓰기 가능: data-run="pc" | "mobile" | "always"
  function shouldRun(mode, isPC) {
    if (mode === 'pc') return isPC;
    if (mode === 'mobile') return !isPC;
    return true; // 'always'
  }

  function createInstance(el, cfg) {
    if (instances.has(el)) return instances.get(el);
    const opts = typeof cfg.options === 'function' ? cfg.options(el) : (cfg.options || {});
    const inst = new Swiper(el, opts);
    instances.set(el, inst);
    return inst;
  }

  function destroyInstance(el) {
    const inst = instances.get(el);
    if (!inst) return;
    try { inst.destroy(true, true); } catch(e) {}
    instances.delete(el);
  }

  function updateAll() {
    const isPC = window.innerWidth >= BREAKPOINT_PX;

    CONFIGS.forEach(cfg => {
      const nodes = document.querySelectorAll(cfg.selector);
      nodes.forEach(el => {
        // data-run이 있으면 우선
        const override = (el.dataset.run || '').toLowerCase();
        const mode = (override === 'pc' || override === 'mobile' || override === 'always')
          ? override
          : cfg.mode;

        const need = shouldRun(mode, isPC);

        if (need) {
          if (!instances.has(el)) createInstance(el, cfg);
        } else {
          if (instances.has(el)) destroyInstance(el);
        }
      });
    });
  }

  // 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAll);
  } else {
    updateAll();
  }

  // 리사이즈(디바운스: rAF)
  let raf = null;
  window.addEventListener('resize', () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateAll);
  });
})();
