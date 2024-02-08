let searchInterval;
let isPaused = false;

async function startSearch() {
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');

  startButton.disabled = true;
  pauseButton.disabled = false;

  searchInterval = setInterval(async () => {
    if (!isPaused) {
      await searchRandomWord();
    }
  }, getRandomInt(8000, 15000));
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
  window.open(url, '_blank');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
