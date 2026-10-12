(function () {
  // Меню-бургер
  var burger = document.querySelector('.burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    var closeBtn = drawer.querySelector('.drawer__close');
    var setOpen = function (open) {
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);
      (open ? closeBtn : burger).focus();
    };
    burger.addEventListener('click', function () { setOpen(true); });
    closeBtn.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960 && drawer.classList.contains('is-open')) setOpen(false);
    });
  }

  // Форма → Formspree
  var form = document.getElementById('lyst-form');
  if (!form) return;
  var box = form.querySelector('.form__ok');
  var btn = form.querySelector('[type="submit"]');
  var btnText = btn.textContent;
  var show = function (text, isError) {
    box.textContent = text;
    box.classList.add('is-on');
    box.classList.toggle('is-error', isError);
  };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    data.set('_subject', 'ТОВ «ЗНАМЯНКА 5» — ' + (data.get('topic') || 'звернення з сайту'));
    btn.disabled = true;
    btn.textContent = 'Надсилаємо…';
    box.classList.remove('is-on', 'is-error');
    fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; });
      })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          show("Дякуємо! Повідомлення надіслано — ми зв'яжемося з вами протягом робочого дня.", false);
        } else {
          var msg = res.d && res.d.errors ? res.d.errors.map(function (x) { return x.message; }).join(', ') : '';
          show('Не вдалося надіслати' + (msg ? ': ' + msg : '') + '. Спробуйте ще раз або напишіть на energy@glosterinvestment.group', true);
        }
      })
      .catch(function () {
        show("Немає з'єднання з сервером. Спробуйте ще раз або напишіть на energy@glosterinvestment.group", true);
      })
      .then(function () {
        btn.disabled = false;
        btn.textContent = btnText;
      });
  });
})();
