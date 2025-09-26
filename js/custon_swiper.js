// /js/swipers.pc-only.js
(() => {
  const BREAKPOINT_PX = 769;

  if (!window.Swiper) {
    console.warn("[swiper] Swiper 라이브러리가 로드되지 않았습니다.");
    return;
  }

  const instances = new Map();

  const CONFIGS = [
    {
      selector: ".swiper-topic",
      mode: "pc",
      options: (el) => ({
        slidesPerView: 3,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
      }),
    },
    {
      // 파트너 배너: 모바일/PC 모두 실행
      selector: ".partnerBanner",
      mode: "always",
      options: (el) => ({
        spaceBetween: 0,
        loop: true,
        speed: 8000,
        autoplay: { delay: 0, disableOnInteraction: false },
        freeMode: true,
        freeModeMomentum: false,
        allowTouchMove: false,
        observer: true,
        observeParents: true,
        breakpoints: {
          0:   { slidesPerView: 3 },
          430: { slidesPerView: 4 },
          769: { slidesPerView: 5 },
        },
      }),
    },
    {
      // 회사소개 리뷰
      selector: ".myCase",
      mode: "pc", // ← HTML에서 data-run="always"로 덮어쓰는 방식 사용 시 이대로 둬도 됨
      // mode: "always", // ← 아예 스크립트에서 항상 실행하고 싶다면 이 줄로 교체
      options: (el) => ({
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 10,
        pagination: {
          el: el.querySelector(".swiper-pagination") || undefined,
          clickable: true,
        },
        observer: true,
        observeParents: true,
      }),
    },
    {
      // 기업맞춤교육 - 수업목표
      selector: ".swiper-goal-steps",
      mode: "pc",
      options: (el) => ({
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: false,
        pagination: {
          el: el.querySelector(".swiper-pagination") || undefined,
          clickable: true,
        },
        observer: true,
        observeParents: true,
      }),
    },
  ];

  function shouldRun(mode, isPC) {
    if (mode === "pc") return isPC;
    if (mode === "mobile") return !isPC;
    return true; // 'always'
  }

  function createInstance(el, cfg) {
    if (instances.has(el)) return instances.get(el);
    const opts = typeof cfg.options === "function" ? cfg.options(el) : (cfg.options || {});
    const inst = new Swiper(el, opts);
    instances.set(el, inst);
    return inst;
  }

  function destroyInstance(el) {
    const inst = instances.get(el);
    if (!inst) return;
    try { inst.destroy(true, true); } catch (e) {}
    instances.delete(el);
  }

  function updateAll() {
    const isPC = window.innerWidth >= BREAKPOINT_PX;

    CONFIGS.forEach((cfg) => {
      const nodes = document.querySelectorAll(cfg.selector);
      nodes.forEach((el) => {
        const override = (el.dataset.run || "").toLowerCase();
        const mode =
          override === "pc" || override === "mobile" || override === "always"
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateAll);
  } else {
    updateAll();
  }

  let raf = null;
  window.addEventListener("resize", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateAll);
  });
})();
