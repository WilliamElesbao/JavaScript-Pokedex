// Obtenha uma referência para o modal e para a lista de Pokémon
const modal = document.getElementById('pokemon-modal');
const modalContent = document.getElementById('modal-content');
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

// Função para criar um novo elemento de lista para o Pokémon
function createPokemonElement(pokemon) {
    const li = document.createElement('li');
    li.classList.add('pokemon', pokemon.type);
    li.setAttribute('data-pokemon-id', pokemon.number);

    const detail = document.createElement('div');
    detail.classList.add('detail');

    const types = document.createElement('ol');
    types.classList.add('types');
    pokemon.types.forEach((type) => {
        const liType = document.createElement('li');
        liType.classList.add('type', type);
        liType.textContent = type;
        types.appendChild(liType);
    });

    const img = document.createElement('img');
    img.src = pokemon.photo;
    img.alt = pokemon.name;

    detail.appendChild(types);
    detail.appendChild(img);

    li.innerHTML = `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
    `;
    li.appendChild(detail);

    return li;
}

// Função para carregar os itens dos Pokémon
function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach((pokemon) => {
            const pokemonElement = createPokemonElement(pokemon);
            pokemonList.appendChild(pokemonElement);


            const detail = document.createElement('div');
            detail.classList.add('detail');




            pokemonElement.addEventListener('click', () => {
                const { number, name, stats, photo } = pokemon;
                if (stats && stats.length > 0) {
                    // Supondo que o HP está na primeira posição do array stats
                    const hp = stats[0]; // Assumindo que HP está na primeira posição do array
                    const attack =  stats[1]
                    const defense =  stats[2]
                    const specialAttack =  stats[3]
                    const specialDefense =  stats[4]
                    const speed =  stats[5]
                    const pokemonDetails = `


                    <div class="modal-pokemon">
                        <div class="modal-content">
                            <div class="name-id-container">
                                <span class="name-pokemon">${name}</span>
                                <span class="number-pokemon">#${number}</span>
                            </div>
                            <div class="image-container">
                                <img class="pokemon-photo" src="${photo}" alt="Imagem do Pokémon">
                            </div>

                            <div class="status-pokemon">
                                <div class="status-row">
                                    <span class="status-title">HP:</span>
                                    <span class="status-value">${hp.value}</span>
                                </div>
                                <div class="status-row">
                                    <span class="status-title">Attack:</span>
                                    <span class="status-value">${attack.value}</span>
                                </div>
                                <div class="status-row">
                                    <span class="status-title">Defense:</span>
                                    <span class="status-value">${defense.value}</span>
                                </div>
                                <div class="status-row">
                                    <span class="status-title">Special Attack:</span>
                                    <span class="status-value">${specialAttack.value}</span>
                                </div>
                                <div class="status-row">
                                    <span class="status-title">Special Defense:</span>
                                    <span class="status-value">${specialDefense.value}</span>
                                </div>
                                <div class="status-row">
                                    <span class="status-title">Speed:</span>
                                    <span class="status-value">${speed.value}</span>
                                </div>
                            </div>
                            <hr>
                            <div class="hp-line yellow"></div>
                        </div>
                    </div>

                    `;

                    modalContent.innerHTML = pokemonDetails;
                    modal.style.display = 'flex';
                } else {
                    console.log("Stats not found for this Pokémon");
                }
            });
        });
    });
}

// Carrega os primeiros itens de Pokémon
loadPokemonItems(offset, limit);

// Evento de clique para carregar mais itens de Pokémon
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qntRecordNextPage = offset + limit;

    if (qntRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});

// Evento para fechar o modal quando clicar fora do conteúdo
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
