import plants from './plants.json'

const plantList = document.getElementById("plantList");
const sunFilter = document.getElementById("sunFilter");
const waterFilter = document.getElementById("waterFilter");
const petsFilter = document.getElementById("petsFilter");

let plants = [];

fetch("plants.json")
  .then((response) => response.json())
  .then((data) => {
    plants = data;
    displayPlants(plants);
  })
  .catch((error) => {
    console.log(error);
  });

function displayPlants(plants) {
  const htmlString = plants
    .map((plant) => {
      return `
      <li class="plant-item">
        <div class="plant-image">
          <img src="${plant.url}" alt="${plant.name}">
        </div>
        <h2 class="plant-name">${plant.name}</h2>
        <div class="plant-details">
          <p class="plant-price">$${plant.price}</p>
          <p class="plant-toxicity">${plant.toxicity ? "Toxic" : "Non-toxic"}</p>
        </div>
      </li>
      `;
    })
    .join("");
  plantList.innerHTML = htmlString;
}

function filterPlants() {
  const sunValue = sunFilter.value;
  const waterValue = waterFilter.value;
  const petsValue = petsFilter.value;

  let filteredPlants = plants.filter((plant) => {
    if (sunValue && plant.sun !== sunValue) {
      return false;
    }
    if (waterValue && plant.water !== waterValue) {
      return false;
    }
    if (petsValue && plant.toxicity.toString() !== petsValue) {
      return false;
    }
    return true;
  });

  displayPlants(filteredPlants);
}

sunFilter.addEventListener("change", () => {
  filterPlants();
});

waterFilter.addEventListener("change", () => {
  filterPlants();
});

petsFilter.addEventListener("change", () => {
  filterPlants();
  sunFilter.value = "";
  waterFilter.value = "";
});