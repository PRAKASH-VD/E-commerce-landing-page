
// Function to fetch data from the Fake Store API
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    let products = await response.json();
    
    // Duplicate the products to simulate more items
    products = [...products, ...products, ...products]; // Duplicating the list 3 times
    
    return products;
}



// Display product details in a modal
function openModal(product) {
    const modal = document.getElementById("productModal");
    const modalDetails = document.getElementById("modalDetails");

    modalDetails.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" width="150">
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Quantity:</strong> ${product.rating.count}</p>
    `;

    modal.style.display = "block";

    document.querySelector('.close').onclick = function() {
        modal.style.display = "none";
    };
}



// Function to render products
function displayProducts(products) {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = '';  // Clear existing products

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;

        productCard.addEventListener("click", () => openModal(product));
        productGrid.appendChild(productCard);
    });
}

// Initial product fetch and display
fetchProducts().then(displayProducts);



// Function to search products
function searchProducts(products, searchTerm) {
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        // Show an alert message if no products are found
        alert("Apology! No items found for your search. Stay tuned, new items are arriving soon.");
    }
    
    return filteredProducts;
}

// Event listener for search input
document.getElementById("searchInput").addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    fetchProducts().then(products => {
        const filteredProducts = searchProducts(products, searchTerm);
        displayProducts(filteredProducts);
    });
});

