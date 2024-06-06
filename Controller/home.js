import { loginout, deleteuser } from '../Controller/firebase.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import { getFirestore, doc, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

const sesion = document.getElementById('btnlogout');
const modal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
const confirmDeleteBtn = document.getElementById('confirmDelete');
const userNameDiv = document.getElementById('user-name');
const btnCarrito = document.getElementById('btnCarrito');

async function cerrarSesion() {
    try {
        await loginout();
        alert('Sesión cerrada');
        window.location.href = "../index.html";
    } catch (error) {
        alert('Error al cerrar sesión');
    }
}

function abrirModalEliminar() {
    modal.show();
}

async function eliminarUsuario() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await deleteuser(email, password);

    if (result) {
        alert('Usuario eliminado correctamente');
        window.location.reload();
    } else {
        alert('Error al eliminar el usuario. Verifica el correo electrónico y la contraseña.');
    }
}

function mostrarNombreUsuario() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userNameDiv.textContent = `Bienvenido, ${user.displayName || user.email}`;
        } else {
            userNameDiv.textContent = 'No hay usuario autenticado';
        }
    });
}

async function cargarCarrito() {
    const user = auth.currentUser;
    if (user) {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';

        try {
            const cartCol = collection(doc(db, 'Carrito', user.uid), 'productos');
            const cartSnapshot = await getDocs(cartCol);

            if (cartSnapshot.empty) {
                cartItemsContainer.innerHTML = '<p>No hay productos agregados en el carrito.</p>';
                return;
            }

            cartSnapshot.forEach((doc) => {
                const producto = doc.data();
                const productDiv = document.createElement('div');
                productDiv.className = 'product-card';
                productDiv.innerHTML = `
                    <figure>
                        <img src="${producto.imagen}" alt="${producto.nombre}" />
                    </figure>
                    <div class="info-product">
                        <h2>${producto.nombre}</h2>
                        <p>Sabor: ${producto.sabor}</p>
                        <p>Precio: $${producto.precio}</p>
                    </div>
                `;
                cartItemsContainer.appendChild(productDiv);
            });
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            cartItemsContainer.innerHTML = '<p>Error al cargar el carrito. Intente nuevamente.</p>';
        }
    } else {
        alert('Por favor, inicie sesión para ver su carrito de compras');
    }
}

sesion.addEventListener('click', cerrarSesion);
document.getElementById('btndelete').addEventListener('click', abrirModalEliminar);
confirmDeleteBtn.addEventListener('click', eliminarUsuario);
btnCarrito.addEventListener('click', cargarCarrito);

document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        document.getElementById('togglePassword').textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        document.getElementById('togglePassword').textContent = 'Mostrar';
    }
});

mostrarNombreUsuario();
