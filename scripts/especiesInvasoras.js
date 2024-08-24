import { fetchData } from "./api.js";


export function getEspeciesInvasoras() {
    fetchData("invasivespecies")
        .then(especies => {
            especiesInvasoras(especies);
        })
        .catch(error => {
            mostrarError("Error al cargar las especies invasoras");
        });
}

function especiesInvasoras(especies) {
    const tablaEspecies = document.getElementById("tablaEspeciesInvasoras");
    tablaEspecies.innerHTML = especies.map(especie => `
    <tr class="${especie.riskLevel === 1 ? 'table-danger' : especie.riskLevel === 2 ? 'table-success' : ''}">
        <td>${especie.name}</td>
        <td>${especie.scientificName}</td>
        <td>${especie.impact}</td>
        <td>${especie.manage}</td>
        <td>${especie.riskLevel}</td>
        <td>${especie.image ? '<img src="${especie.image}" alt="${especie.name}">' : 'Image not found'}</td>
    </tr>
    `).join("");
}


function mostrarError(mensaje) {    
    const alerta = document.getElementById("alerta");   
    alerta.textContent = mensaje;
}
