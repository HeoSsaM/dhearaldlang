// /js/swiper.init.js
(() => {
  const BREAKPOINT_PX = 769;

  if (!window.Swiper) {
    console.warn("[swiper] Swiper 라이브러리가 로드되지 않았습니다.");
    return;
  }

  const instances = new Map();

  // 공통 CONFIGS (필요없는 항목은 지워도 됨)
  const CONFIGS = [
       {
      // 배너는 기본적으로 항상 실행 + 반응형
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
          0: { slidesPerView: 3 },
          430: { slidesPerView: 4 },
          769: { slidesPerView: 5 },
        },
      }),
    },
    {
      // 회사소개 리뷰(기본은 PC 전용, 필요시 HTML에서 data-run="always")
      selector: ".myCase",
      mode: "pc",
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
      // 기업맞춤교육 - 수업목표 (PC 기본값)
      selector: ".swiper-goal-steps",
      mode: "pc",
      options: (el) => ({
        // common-swiper의 2.5장/centered + custom-swiper의 1장 PC전용 중 택1
        // 여기선 PC 기본을 2.5장으로 두고, 모바일은 data-run으로 on/off 조절 권장
        slidesPerView: 1.5,
        spaceBetween: 25,
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

  // data-run="pc|mobile|always" 우선
  function shouldRun(mode, isPC) {
    if (mode === "pc") return isPC;
    if (mode === "mobile") return !isPC;
    return true; // 'always'
  }

  function createInstance(el, cfg) {
    if (instances.has(el)) return instances.get(el);

    // (선택) data-breakpoints, data-slides-per-view 등으로 덮어쓰기 하고 싶다면
    // 여기서 el.dataset을 읽어 옵션 병합하도록 확장 가능.
    const opts =
      typeof cfg.options === "function" ? cfg.options(el) : cfg.options || {};
    const inst = new Swiper(el, opts);
    instances.set(el, inst);
    return inst;
  }

  function destroyInstance(el) {
    const inst = instances.get(el);
    if (!inst) return;
    try {
      inst.destroy(true, true);
    } catch (e) {}
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
