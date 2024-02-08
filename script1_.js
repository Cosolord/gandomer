let searchWindow;
let isPaused = false;

function startSearch() {
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');

  startButton.disabled = true;
  pauseButton.disabled = false;

  // Apriamo un nuovo tab per la ricerca attuale
  searchWindow = window.open('about:blank', '_blank');

  // Avviamo l'intervallo di ricerca
  searchInterval = setInterval(async () => {
    if (!isPaused) {
      await searchRandomWord();
    }
  }, getRandomInt(8000, 15000));
}

function pauseSearch() {
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');

  startButton.disabled = false;
  pauseButton.disabled = true;

  // Mettiamo in pausa l'intervallo di ricerca
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

  // Carichiamo la ricerca nel nuovo tab
  searchWindow.location.href = url;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
