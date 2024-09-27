//DOM - getters

const searchButton = document.querySelector('#searchButton')
const textInput = document.querySelector('#inputBar')
const picDisplay = document.querySelector('#picDisplay')
const nameDisplay = document.querySelector('#nameDisplay') 
const content = document.querySelector('#content')
const baseFormNameDisp = document.querySelector('#baseFormNameDisp')
const firstEvolNameDisp = document.querySelector('#firstEvolNameDisp')
const secondEvolNameDisp = document.querySelector('#secondEvolNameDisp')
const baseFormPicDisp = document.querySelector('#baseFormPicDisp')
const firstEvolPicDisp = document.querySelector('#firstEvolPicDisp')
const secondEvolPicDisp = document.querySelector('#secondEvolPicDisp')

//DOM - setters

searchButton.addEventListener('click', async () => {
    let text = document.querySelector('#inputBar').value
    let pokeResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`)

    let pokemonPic = pokeResponse.data.sprites.front_default
    let pokemonName = pokeResponse.data.name

    let specResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${text}`)
    let evolResponse = await axios.get(specResponse.data.evolution_chain.url)
    let evolChain = evolResponse.data.chain

    const baseForm = evolChain.species.name
    const firstEvolution = evolChain.evolves_to[0].species.name
    const secondEvolution = evolChain.evolves_to[0].evolves_to[0].species.name
    
    picDisplay.setAttribute('src', pokemonPic)
    nameDisplay.textContent = pokemonName

    if (baseForm.length > 0) {
        baseFormNameDisp.textContent = `Base Form: ${baseForm}`
        let baseFormResp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${baseForm}`)
        let baseFormPic = baseFormResp.data.sprites.front_default
        baseFormPicDisp.setAttribute('src', baseFormPic)
        content.style.display = 'flex'
    }
    if (firstEvolution.length > 0) {
        firstEvolNameDisp.textContent = `First Evolution: ${firstEvolution}`
        let firstEvolResp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${firstEvolution}`)
        let firstEvolPic = firstEvolResp.data.sprites.front_default
        firstEvolPicDisp.setAttribute('src', firstEvolPic)
    }
    if (secondEvolution.length > 0) {
        secondEvolNameDisp.textContent = `Second Evolution: ${secondEvolution}`
        let secondEvolResp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${secondEvolution}`)
        let secondEvolPic = secondEvolResp.data.sprites.front_default
        secondEvolPicDisp.setAttribute('src', secondEvolPic)
    }
})