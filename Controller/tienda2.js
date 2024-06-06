import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAoecY9UEZzrZx-k3E2TcstI3xbMVFgYkg",
    authDomain: "apiweblogin24g2.firebaseapp.com",
    projectId: "apiweblogin24g2",
    storageBucket: "apiweblogin24g2.appspot.com",
    messagingSenderId: "591892579123",
    appId: "1:591892579123:web:056a214bfced8cf951f446",
    measurementId: "G-J9MNYKHY9J"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Función para obtener los vape desde Firestore
export async function fetchShoes() {
    const shoesCol = collection(db, 'Vape');
    const shoesSnapshot = await getDocs(shoesCol);
    const shoesList = shoesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return shoesList;
}

async function displayShoes() {
    const shoes = await fetchShoes();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    shoes.forEach(shoe => {
        const shoeItem = document.createElement('div');
        shoeItem.className = 'product-card';
        shoeItem.innerHTML = `
            <figure>
                <img src="${shoe.imagen}" alt="${shoe.nombre}" />
            </figure>
            <div class="info-product">
                <h2 class="product-title">${shoe.nombre}</h2>
                <p>Sabor: ${shoe.sabor}</p>
                <p class="product-precio">Precio: ${shoe.precio}</p>
                <p class="product-nicotina">Nicotina: ${shoe.nicotina}</p>
                <button class="add-to-cart">Añadir al carrito</button>
            </div>
        `;
        productList.appendChild(shoeItem);

        const addToCartButton = shoeItem.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => openProductModal(shoe));
    });
}

function openProductModal(shoe) {
    const user = auth.currentUser;
    if (user) {
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        document.getElementById('modalProductTitle').textContent = shoe.nombre;
        document.getElementById('modalProductSabor').textContent = `Sabor: ${shoe.sabor}`;
        document.getElementById('modalProductPrecio').textContent = `Precio: ${shoe.precio}`;
        document.getElementById('modalProductNicotina').textContent = `Nicotina: ${shoe.nicotina}`;
        document.getElementById('modalProductImage').src = shoe.imagen;

        const addToCartButton = document.getElementById('addToCartButton');
        addToCartButton.setAttribute('data-user-id', user.uid);
        addToCartButton.onclick = () => addToCart(shoe, user.uid);
        modal.show();
    } else {
        alert('Por favor, inicie sesión para poder ver los detalles del producto');
    }
}

async function addToCart(shoe, userId) {
    if (userId) {
        try {
            const userCartDocRef = doc(db, 'Carrito', userId);
            const productInCartRef = doc(collection(userCartDocRef, 'productos'), shoe.id);
            await setDoc(productInCartRef, shoe);
            alert('Producto agregado al carrito');
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            alert('Error al agregar el producto al carrito');
        }
    } else {
        alert('Por favor, inicie sesión para poder agregar productos al carrito');
    }
}

// Cargar vapes cuando la página se haya cargado completamente
window.addEventListener('DOMContentLoaded', displayShoes);
