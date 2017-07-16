var canvas = 0;
var ctx = 0;
var d = 5;
var stacks = 0;

function buildStacks(x, y) {
  stacks = []
  for (var i = 0; i < x; i++) {
    stack = []
    for (var j = 0; j < y; j++) {
      stack.push(0);
    }
    stacks.push(stack);
  }
}

function load() {
  canvas = document.getElementById('canvas');
  canvas.addEventListener('mousedown', draw);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  buildStacks(canvas.width, canvas.height);
}

function fillRect(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  ctx.fillRect(x - d, y - d, d * 2, d * 2);
  for (var i = x - d; i < x + d * 2; i++) {
    for (var j = y - d; j < y + d * 2; j++) {
      stacks[i][j]++;
    }
  }
}

function clearRect(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  for (var i = x - d; i < x + d * 2; i++) {
    for (var j = y - d; j < y + d * 2; j++) {
      stacks[i][j]--;
      if (stacks[i][j] <= 0) {
        ctx.clearRect(i, j, 1, 1);
      }
    }
  }
}

function draw(event) {
  if (ctx) {
    var x = event.offsetX;
    var y = event.offsetY;
    repeat(x, y, 0);
  }
}

function repeat(x, y, depth) {
  if (depth > 5) {
    return;
  }
  fillRect(x, y);
  setTimeout(function() {
    clearRect(x, y);
  }, Math.random() * 200 + 100);
  for (var i = 0; i < Math.random() * 5; i++) {
    setTimeout(function() {
      repeat(x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 60, depth + 1);
    }, Math.random() * 75 + 50);
  }
}
