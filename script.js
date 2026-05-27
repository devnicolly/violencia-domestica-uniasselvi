(function () {
    const track   = document.getElementById('carTrack');
    const dotsWrap = document.getElementById('carDots');
    const prevBtn  = document.getElementById('carPrev');
    const nextBtn  = document.getElementById('carNext');
    const slides   = track.querySelectorAll('.carousel-slide');
    let cur = 0;

    // Criar dots
    slides.forEach(function (_, i) {
      const d = document.createElement('button');
      d.className = 'car-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(d);
    });

    function goTo(n) {
      cur = n;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      dotsWrap.querySelectorAll('.car-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === cur);
      });
      prevBtn.disabled = cur === 0;
      nextBtn.disabled = cur === slides.length - 1;
    }

    prevBtn.addEventListener('click', function () { if (cur > 0) goTo(cur - 1); });
    nextBtn.addEventListener('click', function () { if (cur < slides.length - 1) goTo(cur + 1); });

    // Suporte a swipe no mobile
    const touchStartX = 0;
    const touchEndX   = 0; //

    track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      let diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0 && cur < slides.length - 1) goTo(cur + 1); // swipe left → próximo
        if (diff < 0 && cur > 0) goTo(cur - 1);                 // swipe right → anterior
      }
    }, { passive: true });
  })();