import { Pokemon } from './classes.js';

export const fillPokemonCard = (pokemon) => {
    const card = document.querySelector('.card');
    const cardList = document.querySelector('.card-list');

    const cloneCard = card.cloneNode(true);
    const title = cloneCard.querySelector('h3');
    const image = cloneCard.querySelector('img');
    const propertiesText = cloneCard.querySelector('.properties p');

    const [description] = cloneCard.getElementsByClassName('description');
    title.innerText = pokemon.name;
    image.src = pokemon.image;
    propertiesText.innerText = `Experience ${pokemon.experience}`;
    description.innerHTML = `
        <h4> Abilities: </h4>
        <ul>
        ${pokemon.abilities.map((el) => `<li>${el}</li>`).join('')}
        </ul>
    `;
    cardList.append(cloneCard);
};

export const getPokemonByNameOrId = async (params) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params}`);
        const result = await response.json();
        const {
            name,
            base_experience: experience,
            abilities: rawAbilities,
            sprites: { front_default: image },
        } = result;
        const serailizedAbilities = rawAbilities.map((el) => {
            const {
                ability: { name },
            } = el;
            return name;
        });
        const pokemon = new Pokemon(name, serailizedAbilities, experience, image);
        return pokemon;
    } catch (error) {
        throw Error('Покемон не найден')
    }
};

// Сортирует массив ключей localStorage

function sortLocalStorage(newStorage) {
    return Object.keys(newStorage).filter(el => el !== 'user').map(elem => Number(elem)).sort((a, b) => a - b);
}

// Восстанавливает элементы на странице после ее перезагрузки

let newLocalStorage = sortLocalStorage(localStorage);

document.addEventListener('DOMContentLoaded', function() {
    try {
        newLocalStorage.map(poke => fillPokemonCard(JSON.parse(localStorage.getItem(poke))))
    } catch (error) {
        alert(error.message);
    }
})

// Устанавливает индекс в localStorage для добавляемого покемона

export function setLocalStorage(pokemon) {
    let pokeIndex = sortLocalStorage(localStorage).length;
    return localStorage.setItem(pokeIndex, JSON.stringify(pokemon));
}