import { fetchData } from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
    cargarEspeciesInvasoras();
});

export function cargarEspeciesInvasoras() {
    getEspeciesInvasoras();
}

function getEspeciesInvasoras() {
    fetchData("invasivespecie")
        .then(especies => {
            especiesInvasoras(especies);
        })
        .catch(error => {
            mostrarError("Error al cargar las especies invasoras");
        });
}

function especiesInvasoras(especies) {
    const tablaEspecies = document.getElementById("tablaEspeciesInvasoras");
    if (!tablaEspecies) {
        mostrarError("No se encontró la tabla de especies invasoras en el DOM");
        return;
    }
    tablaEspecies.innerHTML = especies.map(especie => `
        <tr class="${especie.riskLevel === 1 ? 'table-primary' : especie.riskLevel === 2 ? 'table-success' : ''}">
            <td>${especie.name}</td>
            <td>${especie.scientificName}</td>
            <td>${especie.impact}</td>
            <td>${especie.manage}</td>
            <td>${especie.riskLevel}</td>
            <td><img class="imgEspecies" src="${especie.urlImage}" alt="${especie.name}"></td>
        </tr>
    `).join("");
}

function mostrarError(mensaje) {
    const alerta = document.getElementById("alerta");
    if (alerta) {
        alerta.textContent = mensaje;
        alerta.style.display = 'block';
    } else {
        console.error(mensaje);
    }
}
