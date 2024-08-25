import { fetchData } from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
    cargarDepartamentos();
});

export function cargarDepartamentos() {
    getDepartamentos();
}

function getDepartamentos() {
    fetchData("Department")
        .then(departamentos => {
        
            data.departments = departamentos;
            mostrarDepartamentos(departamentos);
            createRegionCheckboxes(departamentos);
        })
        .catch(error => {
             mostrarError("Error al cargar los departamentos");
        });
}

let data = {
    departments: [] 
};

const checkboxContainer = document.getElementById("inputs");
const searchForm = document.getElementById("inputSearch");

function createRegionCheckboxes(departamentos) {
    const regions = [...new Set(departamentos.map(departamento => departamento.regionId))]; 
    checkboxContainer.innerHTML = '';

    regions.forEach(region => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${region}" id="${region}">
            <label class="form-check-label" for="${region}">${region}</label>
        `;
        checkboxContainer.appendChild(checkbox);
    });

    checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterDepartamentos);
    });
}


function filterDepartamentos() {
    const selectedRegions = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    const searchText = searchForm.value.toLowerCase();

    const filteredDepartments = data.departments.filter(department => {
        const isRegionMatch = selectedRegions.length === 0 || selectedRegions.includes(department.regionId.toString());

        const isSearchMatch = department.name.toLowerCase().includes(searchText) ||
                              department.description.toLowerCase().includes(searchText);

        return isRegionMatch && isSearchMatch;
    });

    mostrarDepartamentos(filteredDepartments);
}

searchForm.addEventListener('input', filterDepartamentos);
checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterDepartamentos);
});

function mostrarDepartamentos(departamentos) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = '';

    if (departamentos.length === 0) {
        contenedor.innerHTML = `
        <div> <h3>No encontramos departamentos que coincidan con tu búsqueda.</h3>
        </div>`;
    } else {
        departamentos.forEach(departamento => {
            let tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta d-flex flex-column justify-content-between align-items-center";
            tarjeta.innerHTML = `
                <div class="card-body d-flex flex-column justify-content-around align-items-center">
                    <h5 class="card-title">${departamento.name}</h5>
                    <p class="card-text">descripcion: ${departamento.description}</p>
                    <p class="card-text">superficie: ${departamento.surface}</p>
                    <p class="card-text">Región: ${departamento.regionId}</p>
                    <p class="card-text">Población: ${departamento.population}</p>
                    <a href="./detalles.html?id=${departamento.id}" class="btn btn-primary">Detalles</a>
                    </div>`;
            contenedor.appendChild(tarjeta);
        });
    }
}

searchForm.addEventListener('input', filterDepartamentos);

function inicializarFiltros() {
    createRegionCheckboxes(data.departments);
    filterDepartamentos();
}

