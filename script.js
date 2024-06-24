const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const URL = "https://pokeapi.co/api/v2/pokemon/";

function fetchPokemon(id) {
    return fetch(URL + id).then(response => response.json());
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString().padStart(3, '0');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

function cargarPokemons() {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        promises.push(fetchPokemon(i));
    }
    Promise.all(promises).then(pokemons => {
        pokemons.forEach(pokemon => mostrarPokemon(pokemon));
    });
}

cargarPokemons();

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";

    const promises = [];
    for (let i = 1; i <= 151; i++) {
        promises.push(fetchPokemon(i));
    }
    Promise.all(promises).then(pokemons => {
        pokemons.forEach(data => {
            if (botonId === "ver-todos") {
                mostrarPokemon(data);
            } else {
                const tipos = data.types.map(type => type.type.name);
                if (tipos.includes(botonId)) {
                    mostrarPokemon(data);
                }
            }
        });
    });
}));
