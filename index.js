import { Pokemon as RenamePoke } from './classes.js';
import mockedPokemons from './mockedPokemons.js';
import { fillPokemonCard } from './seeder.js'; // подключила функцию, создающую новую карточку с покемоном

const btn = document.querySelector('button');

const pokemonsList = mockedPokemons.map((pokemon) => {
    const {
        name,
        abilities,
        base_experience: experience,
        sprites: { front_default: image },
    } = pokemon;
    // const { front_default: image } = sprites;
    // const abilitiesNames = abilities.map(el => el.ability.name);
    const abilitiesNames = abilities.map((el) => {
        const {
            ability: { name },
        } = el;
        return name;
    });
    return new RenamePoke(name, abilitiesNames, experience, image);
});

/* 
Домашнее задание.
Реализовать добавление новых карточек из pokemonsList по клику на кнопку (w3d1.gif)
1) Карточки должны добавляться рандомно
2) Часть кода уже написана ( на лекции ) вам осталось придумать как же вывести их

Реализовать поисковое окошко в правом верхнем углу (w3d1_1.gif)
1) Данные ввода должны обрабатываться по нажатию на enter и по клику на кнопку
2) После того как вы получили данные выведите их при помощи alert
3) Окошко должно быть всегда зафиксировано в правом верхнем углу, не зависимо от вашего положения на странице
*/

btn.addEventListener('click', (event) => {
    fillPokemonCard(pokemonsList[Math.floor(Math.random() * 3)]);
});

const searchBtn = document.querySelector('input[type=button]');
const searchInput = document.querySelector('.search>input');

searchBtn.addEventListener('click', () => alert(searchInput.value));

searchInput.addEventListener('keyup', (event) => {
    if(event.key == 'Enter') {
        alert(searchInput.value);
    }
})