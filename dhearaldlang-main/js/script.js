/* 대학로고 */
const collegeUl = document.querySelector(".logos.college_logo");

for (let i = 1; i <= 24; i++) {
  // 숫자를 항상 두 자리로 (01, 02, ..., 24)
  const num = i.toString().padStart(2, "0");
  const li = document.createElement("li");
  const img = document.createElement("img");

  img.src = `img/logo/college/logo-collegte_${num}.png`;
  img.alt = `로고 ${num}`;

  li.appendChild(img);
  collegeUl.appendChild(li);
}

/* 기업로고 */
const comapnyUl = document.querySelector(".logos.company_logo");

for (let i = 1; i <= 20; i++) {
  // 숫자를 항상 두 자리로 (01, 02, ..., 24)
  const num = i.toString().padStart(2, "0");
  const li = document.createElement("li");
  const img = document.createElement("img");

  img.src = `img/logo/company/logo_com_${num}.png`;
  img.alt = `로고 ${num}`;

  li.appendChild(img);
  comapnyUl.appendChild(li);
}

/* //기업맞춤교육 파트너사 롤링
const logoWrap = document.querySelector(".partners_logo");
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

setInterval(autoScroll, 20); // 20ms마다 실행 (속도 조절 가능) */
