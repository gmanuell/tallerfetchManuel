import { cargarDepartamentos } from "./home.js";
// import {cargarDetallesDepartamentos} from "./detalles.js";
import { cargarEspeciesInvasoras } from "./especiesInvasoras.js";


document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
   
//     if (path.endsWith('home.html') || path === '/') {
//         cargarDepartamentos();
//     } else if (path.endsWith('detalles.html')) {
//         cargarDetallesDepartamentos();
//     } else if (path.endsWith('especies-invasoras.html')) {
//         cargarEspeciesInvasoras();
//     }
if (path.endsWith('especies-invasoras.html') || path === '/') {
             cargarEspeciesInvasoras();
} else if (path.endsWith('home.html') || path === '/') {
            cargarDepartamentos();
}
});