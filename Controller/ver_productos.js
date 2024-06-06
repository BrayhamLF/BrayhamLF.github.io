import { viewShoes, eliminarProducto, actualizarProducto } from "./firebase.js";

const ver = document.getElementById('vdata');
const searchCodigo = document.getElementById('searchCodigo');

async function cargar(codigo = '') {
    ver.innerHTML = '';
    const docref = await viewShoes();
    docref.forEach((doc) => {
        const data = doc.data();
        if (codigo === '' || data.codigo.includes(codigo)) {
            ver.innerHTML += `
                <tr>
                    <td>${data.codigo}</td>
                    <td>${data.nombre}</td>
                    <td>${data.sabor}</td>
                    <td>${data.precio}</td>
                    <td>${data.nicotina}</td>
                    <td><img src="${data.imagen}" alt="${data.nombre}" style="width: 50px; height: 50px;"></td>
                    <td>
                        <button type="button" class="btn btn-danger deleteProductBtn" data-bs-toggle="modal" data-bs-target="#deleteProductModal" data-codigo="${data.codigo}">Eliminar</button>
                        <button type="button" class="btn btn-primary editProductBtn" data-bs-toggle="modal" data-bs-target="#editProductModal" data-codigo="${data.codigo}" data-nombre="${data.nombre}" data-marca="${data.sabor}" data-precioVenta="${data.precio}" data-precioDescuento="${data.nicotina}" data-imagen="${data.imagen}">Editar</button>
                    </td>
                </tr>
            `;
        }
    });

    document.querySelectorAll('.deleteProductBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const codigo = event.currentTarget.getAttribute('data-codigo');
            document.getElementById('codigoToDelete').value = codigo;
        });
    });

    document.querySelectorAll('.editProductBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const button = event.currentTarget;
            document.getElementById('codigoToUpdate').value = button.getAttribute('data-codigo');
            document.getElementById('updNombre').value = button.getAttribute('data-nombre');
            document.getElementById('updSabor').value = button.getAttribute('data-sabor');
            document.getElementById('updPrecio').value = button.getAttribute('data-precio');
            document.getElementById('updNicotina').value = button.getAttribute('data-nicotina');
            document.getElementById('updImagen').value = button.getAttribute('data-imagen');
        });
    });
}

searchCodigo.addEventListener('input', () => {
    cargar(searchCodigo.value);
});

window.addEventListener('DOMContentLoaded', async () => {
    await cargar(); 
});

document.getElementById('deleteProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const codigo = document.getElementById('codigoToDelete').value;

    try {
        await eliminarProducto(codigo);
        alert('Producto eliminado correctamente');
        location.reload();
    } catch (error) {
        alert('Error al eliminar el producto:', error);
    }
});

document.getElementById('updateProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const codigo = document.getElementById('codigoToUpdate').value;
    const nombre = document.getElementById('updNombre').value;
    const sabor = document.getElementById('updSabor').value;
    const precio = document.getElementById('updPrecio').value;
    const nicotina = document.getElementById('updNicotina').value;
    const imagen = document.getElementById('updImagen').value;

    const data = {
        codigo: codigo,
        nombre: nombre,
        sabor: sabor,
        precio: precio,
        nicotina: nicotina,
        imagen: imagen
    };

    try {
        await actualizarProducto(codigo, data);
        alert('Producto actualizado correctamente');
        location.reload();
    } catch (error) {
        alert('Error al actualizar el producto:', error);
    }
});

