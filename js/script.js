  /* 대학로고 */
  const collegeUl = document.querySelector('.college_logo');

  for (let i = 1; i <= 24; i++) {
    // 숫자를 항상 두 자리로 (01, 02, ..., 24)
    const num = i.toString().padStart(2, '0');
    const li = document.createElement('li');
    const img = document.createElement('img');

    img.src = `img/logo/college/logo-collegte_${num}.png`;
    img.alt = `로고 ${num}`;

    li.appendChild(img);
    collegeUl.appendChild(li);
  }

  /* 기업로고 */
  const comapnyUl = document.querySelector('.company_logo');

  for (let i = 1; i <= 20; i++) {
    // 숫자를 항상 두 자리로 (01, 02, ..., 24)
    const num = i.toString().padStart(2, '0');
    const li = document.createElement('li');
    const img = document.createElement('img');

    img.src = `img/logo/company/logo_com_${num}.png`;
    img.alt = `로고 ${num}`;

    li.appendChild(img);
    comapnyUl.appendChild(li);
  }