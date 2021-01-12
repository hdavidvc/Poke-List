const template = document.querySelector('#template').content;
const main = document.querySelector('.flex');
const fragment = new DocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    const idPoke = getRandomInt(1, 150);
    getData(idPoke);
    console.log(idPoke);
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const getData = async(id) => {

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        pintarPokes(data);
    } catch (error) {
        console.log(error);
    }
};

const pintarPokes = (poke) => {
    const clone = template.cloneNode(true);

    clone.querySelector('.card-body-img').setAttribute('src', poke.sprites.other.dream_world.front_default);
    clone.querySelector('h1').innerHTML = ` ${poke.name} <span id="hp">${poke.stats[0].base_stat} hp</span>`;
    // clone.querySelector('#hp').textContent = poke.stats[0].base_stat + 'hp';
    clone.querySelector('p').textContent = poke.base_experience + ' exp';
    clone.querySelectorAll('h3')[0].textContent = poke.stats[1].base_stat + 'k';
    clone.querySelectorAll('h3')[1].textContent = poke.stats[3].base_stat + 'k';
    clone.querySelectorAll('h3')[2].textContent = poke.stats[2].base_stat + 'k';
    fragment.appendChild(clone);
    main.appendChild(fragment);
};