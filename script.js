const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `api-artists/artists.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // Filtra os artistas localmente (já que não temos um servidor real)
            const filteredArtists = data.artists.filter(artist => 
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayResults(filteredArtists);
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            resultPlaylist.classList.remove("hidden");
            resultArtist.classList.add("hidden");
        });
}

function displayResults(results) {
    resultPlaylist.classList.add("hidden");
    const gridContainer = document.querySelector('.grid-container');
    
    // Limpa resultados anteriores
    gridContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultPlaylist.classList.remove("hidden");
        resultArtist.classList.add("hidden");
        return;
    }

    // Para cada resultado, cria um card de artista
    results.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card';
        
        artistCard.innerHTML = `
            <div class="card-img">
                <img src="${artist.urlImg}" class="artist-img"/>
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <a title="${artist.name}" class="vst" href=""></a>
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
                </a>
            </div>
        `;
        
        gridContainer.appendChild(artistCard);
    });

    resultArtist.classList.remove('hidden');
}

// Adicione um debounce para evitar muitas requisições enquanto digita
let debounceTimer;
searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }
    
    debounceTimer = setTimeout(() => {
        requestApi(searchTerm);
    }, 300); // Atraso de 300ms após a última digitação
});