(function () {
  var button = document.querySelector('.menu-button');
  var navigation = document.querySelector('.site-nav');

  if (!button || !navigation) return;

  button.addEventListener('click', function () {
    var isOpen = navigation.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.textContent = isOpen ? 'Close' : 'Menu';
  });
})();
