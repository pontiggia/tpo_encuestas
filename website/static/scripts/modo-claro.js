var toggleButton = document.querySelector('.mode-toggle');
var logo = document.getElementById('fondo');

toggleButton.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('modo-claro');
    logo.src = '../src/img/background-claro.png';
    logo.alt = 'fondo modo oscuro';
  } else {
    document.body.classList.remove('modo-claro');
    logo.src = '../src/img/hero_endframe_bsza6x4fldiq_large.jpg';
    logo.alt = 'fondo modo claro';
  }
});

var toggleButton = document.querySelector('.mode-toggle');
var logo = document.getElementById('fondo');

toggleButton.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('modo-claro');
    logo.src = '../src/img/background-claro.png';
    logo.alt = 'fondo modo oscuro';
  } else {
    document.body.classList.remove('modo-claro');
    logo.src = '../src/img/hero_endframe_bsza6x4fldiq_large.jpg';
    logo.alt = 'fondo modo claro';
  }
});