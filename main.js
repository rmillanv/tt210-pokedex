const pokemonlist = document.getElementById("pokemon-list")

async function fetchPokemonData(pokemonId) {
    const Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    const pokemon = await Response.json()
    /*console.log(pokemon)*/
    return pokemon
}
function displaypokemon(pokemon){
    const pokemoncard = document.createElement("div")
    pokemoncard.classList.add("pokemon-card")
    pokemoncard.innerHTML =`
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${pokemon.name.toUpperCase()}</h3>
    <p>ID:${pokemon.id}</p>
    `
    pokemonlist.appendChild(pokemoncard)
    return
}

async function loadpokedex() {
    for(let i=1; i<=50; i++){
        const pokemon  = await fetchPokemonData(i)
    displaypokemon(pokemon)  
    }
    return 
}
loadpokedex()