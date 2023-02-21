import plants from './plants.json'

// selecionando os elementos HTML
const filterSun = document.querySelector('#filterSun');
const filterWater = document.querySelector('#filterWater');
const filterPets = document.querySelector('#filterPets');
const plantList = document.querySelector('#plantList');
const filterForm = document.querySelector('#filterForm');

// carregando as plantas do arquivo JSON
let plants = [];
fetch('./plants.json')
  .then(response => response.json())
  .then(data => {
    plants = data;
    displayPlants(plants);
  });

// função para exibir as plantas na tela
function displayPlants(plants) {
  plantList.innerHTML = '';
  plants.forEach((plant) => {
    const plantCard = document.createElement('div');
    plantCard.classList.add('plant-card');
    plantCard.innerHTML = `
      <img src="${plant.url}" alt="${plant.name}" />
      <div class="plant-details">
        <h2>${plant.name}</h2>
        <p class="toxicity">${plant.toxicity ? 'Tóxica para pets' : 'Não tóxica para pets'}</p>
        <div class="plant-info">
          <p><strong>Sol:</strong> ${plant.sun}</p>
          <p><strong>Água:</strong> ${plant.water}</p>
        </div>
      </div>
    `;
    plantList.appendChild(plantCard);
  });
}

// função para filtrar as plantas
function filterPlants() {
  const filteredPlants = plants.filter((plant) => {
    if (filterSun.value !== 'all' && plant.sun !== filterSun.value) {
      return false;
    }
    if (filterWater.value !== 'all' && plant.water !== filterWater.value) {
      return false;
    }
    if (filterPets.value !== 'all' && plant.toxicity !== (filterPets.value === 'true')) {
      return false;
    }
    return true;
  });
  displayPlants(filteredPlants);
}

// adicionando um listener de evento ao formulário
filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  filterPlants();
});

// adicionando um listener de evento aos filtros
filterSun.addEventListener('change', filterPlants);
filterWater.addEventListener('change', filterPlants);
filterPets.addEventListener('change', filterPlants);