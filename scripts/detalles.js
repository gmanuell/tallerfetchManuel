const urlParam = window.location.search;
const urlObjeto = new URLSearchParams(urlParam);
const departmentId = urlObjeto.get('id');

let url = "https://api-colombia.com";
let urlDepartaments = `${url}/api/v1/Department`;
let urlCities = `${url}/api/v1/Department/${departmentId}/cities`;
let urlNaturalAreas = `${url}/api/v1/Department/${departmentId}/naturalareas`;

let citiesContainer = document.getElementById("citiesContainer");
let areasContainer = document.getElementById("areasContainer");
let categories = document.getElementById("categories");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");

let cities = [];
let naturalAreas = [];

function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error al obtener datos de ${url}`);
            return response.json();
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

function loadCitiesAndAreas() {
    if (!departmentId) {
        console.error("No se proporcionó un ID de departamento");
        return;
    }

    fetchData(urlCities)
        .then(citiesData => {
            if (citiesData) {
                cities = citiesData;
                createCityCards(cities);
            }
        });

    fetchData(urlNaturalAreas)
        .then(areasData => {
            if (areasData) {
                naturalAreas = areasData[0]?.naturalAreas || [];
                createNaturalAreaCards(naturalAreas);
            }
        });
}

function loadDepartmentDetails() {
    fetchData(urlDepartaments)
        .then(departments => {
            if (departments && departmentId) {
                const department = departments.find(d => d.id.toString() === departmentId);
                if (department) createDepartmentCard(department);
            }
        });
}

function createDepartmentCard(department) {
    const cardContainer = document.getElementById("card-container");
    const cardContent = document.createElement("div");
    cardContent.className = "d-flex m-5";
    cardContent.innerHTML = `
        <div class="align-items-center">
            <div class=" d-flex justify-content-center">
                <img class="img-fluid object-fit-cover w-75 img_card_detail" src="./assets/images/villaleyva.jpg">
            </div>
            <div class="container-fluid text-center w-75 border border-black">
                <div class="card-body container-fluid">
                    <h4 class="name d-card pb-2 text-center">${department.name}</h4>
                    <ul class="list-group list-group-flush rounded bg-success-subtle flex-grow-1">                        
                        <li class="list-group-item"><span class="fw-bold">Descripción: </span>${department.description}</li>
                        <li class="list-group-item"><span class="fw-bold">Municipios: </span>${department.municipalities}</li>
                        <li class="list-group-item"><span class="fw-bold">Población: </span>${department.population} hab</li>
                        <li class="list-group-item"><span class="fw-bold">Superficie: </span>${department.surface} Km<sup>2</sup></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    cardContainer.appendChild(cardContent);
}

function createCityCards(cities) {
    citiesContainer.innerHTML = '';
    let titulociudades = document.getElementById("citiesContainer");
    titulociudades.innerHTML = '<h2 class="text-center w-100">Ciudades</h2>';
    if (cities.length > 0) {
        
        cities.forEach(city => {
            let card = document.createElement("div");
            card.className = "d-flex flex-column citycard card";

            card.innerHTML = `
                <img class="card-img" src="./assets/images/853.jpg">
                <div class="card-body p-1 mt-2">
                    <h5 class="card-name">${city.name}</h5>
                </div>`;

            citiesContainer.appendChild(card);
        });
    }
}

function createNaturalAreaCards(naturalAreas) {
    const uniqueAreas = Array.from(new Set(naturalAreas.map(area => area.name)))
        .map(name => naturalAreas.find(area => area.name === name));

    areasContainer.innerHTML = '';
    let tituloAreas = document.getElementById("areasContainer");
    tituloAreas.innerHTML = '<h2 class="text-center w-100">Areas Naturales</h2>';
    if (uniqueAreas.length > 0) {
        
        uniqueAreas.forEach(area => {
            let card = document.createElement("div");
            card.className = "d-flex flex-column citycard card";

            card.innerHTML = `
                <img class="card-img" src="./assets/images/areas.jpg">
                <div class="card-body p-1 mt-2">
                    <h5 class="card-name">${area.name}</h5>
                </div>`;

            areasContainer.appendChild(card);
        });
    }
}

function filterEvents() {
    const selectedCategories = Array.from(categories.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    
    const searchText = searchInput.value.toLowerCase();

    citiesContainer.innerHTML = '';
    areasContainer.innerHTML = '';

    if (selectedCategories.includes("cities") || selectedCategories.length === 0) {
        const filteredCities = cities.filter(city => city.name.toLowerCase().includes(searchText));
        createCityCards(filteredCities);
    }

    if (selectedCategories.includes("areas") || selectedCategories.length === 0) {
        const filteredAreas = naturalAreas.filter(area => area.name.toLowerCase().includes(searchText));
        createNaturalAreaCards(filteredAreas);
    }
}

categories.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterEvents);
});

searchInput.addEventListener('input', filterEvents);



loadCitiesAndAreas();
loadDepartmentDetails();
