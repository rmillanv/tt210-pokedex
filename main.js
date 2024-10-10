const pokemonlist = document.getElementById("pokemon-list")
const pokemonDetail= document.getElementById("pokemon-detail")
const pokemonInfo = document.getElementById("pokemon-info")
const backButton = document.getElementById("back-button")

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
    // linea para mostrar el detalle de pokemon
    pokemoncard.addEventListener("click",()=> showpokemonDetail(pokemon))
    pokemonlist.appendChild(pokemoncard)
    return
}

function showpokemonDetail(pokemon){
    pokemonlist.style.display = "none"
    pokemonDetail.style.display = "block"
    pokemonInfo.innerHTML=`
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>ID:${pokemon.id}</p>
    <p>Altura: ${pokemon.heght} m</p>
    <p>Peso: ${pokemon.weght} kg</p>
    <p>Tipos: ${pokemon.types.map(p=>p.type.name).join(", ")}</p>
    `
    return
}
backButton.addEventListener("click",()=>{
    pokemonDetail.style.display = "none"
    pokemonlist.style.display = "grid"
})
async function loadpokedex() {
    for(let i=1; i<=50; i++){
        const pokemon  = await fetchPokemonData(i)
    displaypokemon(pokemon)  
    }
    return 
}
loadpokedex()