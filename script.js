function startSearch() {
  // Avvia l'audio
  var audio = document.getElementById('audio');
  audio.play();

  // Attendi 2.5 secondi prima di avviare le ricerche
  setTimeout(function () {
    // Leggi il file sources.txt e avvia le ricerche con le parole estratte
    fetch('sources.txt')
      .then((response) => response.text())
      .then((data) => {
        // Dividi il contenuto del file in un array di parole
        var wordsToSearch = data.split('\n').filter((word) => word.trim() !== '');

        // Funzione per ottenere una parola casuale dall'array
        function getRandomWord() {
          return wordsToSearch[Math.floor(Math.random() * wordsToSearch.length)];
        }

        // Funzione per avviare una ricerca con una parola casuale
        function searchWithRandomWord() {
          var randomWord = getRandomWord();
          var searchUrl = 'https://www.bing.com/search?q=' + encodeURIComponent(randomWord);
          var newTab = window.open(searchUrl, '_blank');
          setTimeout(function () {
            newTab.close();
          }, 5000);
        }

        // Avvia la ricerca per ogni parola nel array con un ritardo casuale
        setInterval(function () {
          searchWithRandomWord();
        }, getRandomInterval(9210, 12000));
      })
      .catch((error) => console.error('Errore nel caricamento del file:', error));
  }, 2500); // Ritardo prima di avviare le ricerche
}

/* function pauseSearch() {
  // Aggiungi qui la logica per interrompere le ricerche
  // Potresti interrompere il setInterval o fermare eventuali processi in corso
}
 */

// Funzione per ottenere un intervallo casuale tra un minimo e un massimo
function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
