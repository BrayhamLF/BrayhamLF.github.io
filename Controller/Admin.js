import { loginout } from '../Controller/firebase.js';

async function cerrarSesion() {
    try {
        await loginout();
        alert('Sesión cerrada');
        window.location.href = "../index.html";
    } catch (error) {
        alert('Error al cerrar sesión');
    }
}

document.getElementById('btnlogout').addEventListener('click', cerrarSesion);
