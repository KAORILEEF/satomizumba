



  $(".openbtn1").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
      $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
  });
  
  $("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
      $(".openbtn1").removeClass('active');//ボタンの activeクラスを除去し
      $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
  });

  // 写真スライダー
(function () {
    const area = document.querySelector('.slide-area');
    const dots = document.querySelector('.slide-dots');
    if (!area || !dots) return;
    const slides = Array.from(area.querySelectorAll('.slide-contents'));
    if (!slides.length) return;
    let current = 0, timer, start = null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const buttons = slides.map((slide, i) => {
        slide.draggable = false;
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', `写真 ${i + 1} を表示`);
        button.addEventListener('click', () => { show(i); restart(); });
        dots.appendChild(button);
        return button;
    });
    function show(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === current);
            slide.setAttribute('aria-hidden', String(i !== current));
            buttons[i].setAttribute('aria-current', String(i === current));
        });
    }
    function restart() {
        clearInterval(timer);
        if (slides.length > 1 && !reduced.matches && !document.hidden)
            timer = setInterval(() => show(current + 1), 5000);
    }
    area.addEventListener('pointerdown', e => {
        if (!e.isPrimary || e.button !== 0) return;
        start = { x: e.clientX, y: e.clientY, id: e.pointerId };
        clearInterval(timer);
        area.setPointerCapture(e.pointerId);
    });
    area.addEventListener('pointerup', e => {
        if (!start || start.id !== e.pointerId) return;
        const dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy))
            show(current + (dx < 0 ? 1 : -1));
        start = null;
        restart();
    });
    area.addEventListener('pointercancel', () => { start = null; restart(); });
    area.addEventListener('lostpointercapture', () => { if (start) { start = null; restart(); } });
    area.addEventListener('keydown', e => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        show(current + (e.key === 'ArrowRight' ? 1 : -1));
        restart();
    });
    document.addEventListener('visibilitychange', restart);
    if (reduced.addEventListener) reduced.addEventListener('change', restart);
    show(0);
    area.classList.add('is-ready');
    restart();
})();
