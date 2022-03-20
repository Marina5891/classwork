import { fillPokemonCard, getPokemonByNameOrId, setLocalStorage } from './const.js';
const btn = document.querySelector('#add');

btn.addEventListener('click', async (event) => {
    const randomId = Math.floor(Math.random() * 100);
    
    try { 
        const pokemon = await getPokemonByNameOrId(randomId);
        setLocalStorage(pokemon);
        fillPokemonCard(pokemon);        
    } catch (error) {
        alert(error.message);
    }
});

