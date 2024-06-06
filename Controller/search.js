import { fetchShoes } from './tienda2.js';

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', handleSearch);

async function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const shoes = await fetchShoes();
    const productList = document.getElementById('product-list');

    productList.innerHTML = '';

    const filteredShoes = shoes.filter(shoe => shoe.nombre.toLowerCase().includes(query));

    if (filteredShoes.length > 0) {
        filteredShoes.forEach(shoe => {
            const shoeItem = document.createElement('div');
            shoeItem.className = 'product-card';
            shoeItem.innerHTML = `
                <figure>
                    <img src="${shoe.imagen}" alt="${shoe.nombre}" />
                </figure>
                <div class="info-product">
                    <h2 class="product-title">${shoe.nombre}</h2>
                    <p>Sabor: ${shoe.sabor}</p>
                    <p class="product-price">Precio: ${shoe.precio}</p>
                    <p class="product-price">Nicotina: ${shoe.nicotina}</p>
                    <button class="add-to-cart">Añadir al carrito</button>
                </div>
            `;
            productList.appendChild(shoeItem);

            const addToCartButton = shoeItem.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => handleAddToCart(shoe));
        });
    } else {
        productList.innerHTML = '<p>No existe ningún producto con ese nombre</p>';
    }
}

function handleAddToCart(shoe) {
    const currentPage = window.location.pathname;
    if (currentPage.includes('index.html')) {
        alert('Por favor, inicie sesión para poder continuar');
    } else if (currentPage.includes('Home.html')) {
        alert('Producto agregado al carrito');
    }
}
