import { registrarVape , registerauth, verification, setregister2 } from './firebase.js';

const formulario = document.getElementById('Product-Form');
const boton = document.getElementById('registerBtn');

async function registerProduct() {
    const codigo = formulario['codigo'].value;
    const nombre = formulario['nombre'].value;
    const sabor = formulario['sabor'].value;
    const precio = formulario['precio'].value;
    const nicotina = formulario['nicotina'].value;
    const imagen = formulario['imagen'].value;

    if (!codigo || !nombre || !sabor || !precio || !nicotina || !imagen) {
        alert('Por favor completa todos los campos.');
        return;
    }

    try {
        await setregister2(codigo, nombre, sabor, precio, nicotina, imagen);
        alert('Vape registrado exitosamente con código: ' + codigo);
        window.location.href = "/index.html";
    } catch (error) {
        console.error('Error al registrar el vape: ', error);
        alert('Error al registrar el vape.');
    }
}

boton.addEventListener('click', (e) => {
    e.preventDefault();
    registerProduct();
});
