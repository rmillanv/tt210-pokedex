const pokemonlist = document.getElementById("pokemon-list")
const pokemonDetail= document.getElementById("pokemon-detail")
const pokemonInfo = document.getElementById("pokemon-info")
const backButton = document.getElementById("back-button")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const prevButton = document.getElementById("prev-button")
const nextButton = document.getElementById("next-button")

let currentPage = 1
const itemsPerPage = 50
const totalPokemons = 100

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
async function loadpokedex(page) {
    pokemonlist.innerHTML=""
    const start = (page -1)*itemsPerPage +1
    const end = page*itemsPerPage
    for(let i=start; i<=end; i++){
        const pokemon  = await fetchPokemonData(i)
    displaypokemon(pokemon)  
    }
    updatePaginationButtons(page)
    return 
}
async function searchPokemon() {
    console.log(searchInput)
    const query = searchInput.value.toLowerCase().trim()
    
    if(query){
        try{
            const pokemon = await fetchPokemonData(query)
            pokemonlist.style.display = "none"
            showpokemonDetail(pokemon)
        }catch (error) {
            alert("pokemon no encontrado, intentelo de nuevo")
        }
    }else{
        alert("Ingresar un nombre o un id de pokemon")
    }
}
searchButton.addEventListener("click",searchPokemon)

function updatePaginationButtons(page){
    prevButton.disabled = page === 1
    nextButton.disabled = page === Math.floor(totalPokemons/itemsPerPage)
}


nextButton.addEventListener("click",()=>{
    currentPage++
    loadpokedex(currentPage)
})
prevButton.addEventListener("click",()=>{
    if(currentPage > 1){
        currentPage--
        loadpokedex(currentPage)
    }
})
loadpokedex(currentPage)