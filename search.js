import { fillPokemonCard, getPokemonByNameOrId, setLocalStorage } from './const.js';
const form = document.querySelector('.search');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
        pokemonName: { value },
    } = event.target;
    // 1 - empty input
    // 2 - case sensetive
    // 3 - alert if no pokemon

    if (!value) {
        alert('Введите имя покемона плиииз');
    } else {
        try {
            const pokemon = await getPokemonByNameOrId(value.toLowerCase());
            setLocalStorage(pokemon);
            fillPokemonCard(pokemon);            
        } catch (error) {
            alert(error.message);
        }
    }
});
