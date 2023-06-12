var canvas = document.getElementById('galaxy-canvas');
var ctx = canvas.getContext('2d');
var numPoints = 10;
var blurValue = 20; // Valor de difuminado
var colors = ['#5B51D8', '#833AB4', '#E1306C', '#FD1D1D', '#F77737', '#FCAF45', '#FFDC80'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function generarPuntosAleatorios() {
  var points = [];

  while (points.length < numPoints) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var size = Math.random() * 50 + 50; // Rango de tamaño de 50 a 100
    var gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(1, getRandomColor());
    var point = { x: x, y: y, size: size, gradient: gradient };

    if (!hayColision(points, point)) {
      points.push(point);
    }
  }

  points.forEach(function(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
    ctx.fillStyle = point.gradient;
    ctx.shadowBlur = blurValue;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  });
}

function hayColision(points, point) {
  for (var i = 0; i < points.length; i++) {
    var existingPoint = points[i];
    var distance = Math.sqrt(Math.pow(existingPoint.x - point.x, 2) + Math.pow(existingPoint.y - point.y, 2));
    var minDistance = existingPoint.size + point.size;

    if (distance <= minDistance) {
      return true;
    }
  }

  return false;
}

function getRandomColor() {
  var colorIndex = Math.floor(Math.random() * colors.length);
  return colors[colorIndex];
}

function animarPuntos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generarPuntosAleatorios();
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
animarPuntos();


// Code to handle surveys in the website

function enviarEncuesta(event) {
  event.preventDefault();

  // Verificar si el usuario ya ha respondido la encuesta 
  if (localStorage.getItem("encuestaRespondida")) {
    alert("Ya has respondido la encuesta.");
    return;
  }

  // Obtener las respuestas seleccionadas
  const respuestas = {};
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  checkboxes.forEach((checkbox) => {
    const grupo = checkbox.getAttribute("name");
    const valor = checkbox.getAttribute("value");

    if (!respuestas[grupo]) {
      respuestas[grupo] = [];
    }

    respuestas[grupo].push(valor);
  });

  // Almacenar las respuestas en el localStorage
  localStorage.setItem("respuestasEncuesta", JSON.stringify(respuestas));
  localStorage.setItem("encuestaRespondida", "true");


  // Deshabilitar los checkboxes todos los checkboxes
  const disable_checkboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );
  disable_checkboxes.forEach((checkbox) => {
    checkbox.disabled = true;
  });

  // Deshabilitar el botón de envío
  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.disabled = true;
}

// Obtener el formulario de la encuesta
const formEncuesta = document.getElementById("form_encuesta");

// Agregar un evento de escucha para el envío del formulario
formEncuesta.addEventListener("submit", enviarEncuesta);

// Verificar si el usuario ya ha respondido la encuesta y deshabilitar los elementos correspondientes
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("encuestaRespondida")) {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.disabled = true;
    });

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
  }
});
