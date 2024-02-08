let searchWindow;
let searchInterval;
let isPaused = false;

async function startSearch() {
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');

  startButton.disabled = true;
  pauseButton.disabled = false;

  searchWindow = window.open('', '_blank');

  searchInterval = setInterval(async () => {
    if (!isPaused) {
      await searchRandomWord();
    }
  }, getRandomInt(5000, 7000));
}

async function pauseSearch() {
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');

  startButton.disabled = false;
  pauseButton.disabled = true;

  clearInterval(searchInterval);
  isPaused = true;
}

async function searchRandomWord() {
  const response = await fetch('sources.txt');
  const text = await response.text();
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  const randomIndex = Math.floor(Math.random() * lines.length);
  const searchQuery = encodeURIComponent(lines[randomIndex].trim());
  const url = `https://www.bing.com/search?q=${searchQuery}`;
  searchWindow.location.href = url;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
