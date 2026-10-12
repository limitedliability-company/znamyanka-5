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

  // Форма → поштовий клієнт
  var form = document.getElementById('lyst-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var lines = [
      "Ім'я: " + f.name.value,
      'Email: ' + f.email.value,
      'Телефон: ' + f.phone.value,
      'Компанія: ' + f.company.value,
      '',
      f.message.value
    ];
    var href = 'mailto:energy@glosterinvestment.group' +
      '?subject=' + encodeURIComponent('ЗНАМЯНКА 5 — ' + f.topic.value) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    window.location.href = href;
    form.querySelector('.form__ok').classList.add('is-on');
  });
})();
