import pokemons from "./poke-data.js";

const form = document.querySelector('.form');
const input = document.querySelector('.search');
const sort = document.querySelector('.sort'); 
const sort_by_style = document.querySelector('.sort_by_style'); 

function render_pokemons(pokemon_arr) {
    const card_wrapper = document.querySelector('.card_container');
    const not_found_message = document.querySelector('.not_found');
    
    card_wrapper.innerHTML = ''; 

    if (pokemon_arr.length === 0) {
        not_found_message.style.display = 'block'; 
    } else {
        not_found_message.style.display = "none";
    }

    pokemon_arr.forEach(pokemon => {
        const { num, name, img, weaknesses, height, weight, candy_count, spawn_time } = pokemon;

        const pokemon_card = document.createElement('div');
        pokemon_card.classList.add('card');

        const pokemon_card_image = document.createElement('img');
        pokemon_card_image.classList.add('card_img');
        pokemon_card_image.src = img;
        pokemon_card_image.alt = name;

        const card_content = document.createElement('div');
        card_content.classList.add('card__content');

        const attributes = document.createElement('div');
        attributes.classList.add('main_atributes');

        const pokemon_name = document.createElement('h1');
        pokemon_name.classList.add('name');
        pokemon_name.textContent = name;

        const pokemon_spawn_time = document.createElement('h2');
        pokemon_spawn_time.textContent = spawn_time;

        const pokemon_type = document.createElement('h3');
        pokemon_type.textContent = weaknesses.join(', ');

        const stats = document.createElement('div');
        stats.classList.add('measurement');

        const pokemon_weight = document.createElement('span');
        pokemon_weight.classList.add('weight');
        pokemon_weight.textContent = weight;

        const pokemon_height = document.createElement('span');
        pokemon_height.classList.add('height');
        pokemon_height.textContent = height;

        const pokemon_candy = document.createElement('h3');
        pokemon_candy.textContent = `Candy: ${candy_count !== undefined ? candy_count : 0}`;

        const pokemon_count = document.createElement('div');
        pokemon_count.classList.add('count');
        pokemon_count.textContent = num;

        attributes.appendChild(pokemon_name);
        attributes.appendChild(pokemon_spawn_time);
        attributes.appendChild(pokemon_type);
        stats.appendChild(pokemon_weight);
        stats.appendChild(pokemon_height);
        card_content.appendChild(attributes);
        card_content.appendChild(stats);
        card_content.appendChild(pokemon_candy);
        pokemon_card.appendChild(pokemon_card_image);
        pokemon_card.appendChild(card_content);
        pokemon_card.appendChild(pokemon_count);

        card_wrapper.appendChild(pokemon_card);
    });
}

function sortPokemons(pokemonArray, sortBy) {
    switch (sortBy) {
        case 'a_to_z':
            return pokemonArray.sort((a, b) => a.name.localeCompare(b.name));
        case 'z_to_a':
            return pokemonArray.sort((a, b) => b.name.localeCompare(a.name));
        case 'h_to_l':
            return pokemonArray.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
        case 'l_to_h':
            return pokemonArray.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
        case 'tallest':
            return pokemonArray.sort((a, b) => parseFloat(b.height) - parseFloat(a.height));
        case 'shortest':
            return pokemonArray.sort((a, b) => parseFloat(a.height) - parseFloat(b.height));
        case 'from_lowest_candy':
            return pokemonArray.sort((a, b) => (a.candy_count || 0) - (b.candy_count || 0));
        case 'from_highest_candy':
            return pokemonArray.sort((a, b) => (b.candy_count || 0) - (a.candy_count || 0));
        default:
            return pokemonArray;
    }
}

function sortByWeaknesses(pokemonArray, weakness) {
    if (weakness === 'all_types') {
        return pokemonArray;
    }
    return pokemonArray.filter(pokemon => pokemon.weaknesses.includes(weakness));
}

function updatePokemons() {
    const sortSelect = sort.value;
    const styleSelect = sort_by_style.value;
    const searchQuery = input.value.toLowerCase();

    let filteredPokemons = sortByWeaknesses(sortPokemons([...pokemons], sortSelect), styleSelect);
    filteredPokemons = filteredPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery)
    );

    render_pokemons(filteredPokemons);
}

render_pokemons(pokemons);

input.addEventListener('input', updatePokemons);
sort.addEventListener('change', updatePokemons);
sort_by_style.addEventListener('change', function () {
    const selectedWeakness = sort_by_style.value;
    const filteredPokemons = sortByWeaknesses(pokemons, selectedWeakness);
    render_pokemons(filteredPokemons);
});
form.addEventListener('submit', (e)=>{
    e.preventDefault()
})