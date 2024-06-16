const socket = io(); 

socket.on("products", (data) => {
    renderProductos(data);
})

//Función para renderizar nuestros productos: 

const renderProductos = (data) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div"); 
        card.classList.add("product-card")
        
        card.innerHTML = `  <h4 class="product-id"> ID: ${item.id} </h4>
                            <h1 class="product-title"> ${item.title} </h1>
                            <h2 class="product-description"> ${item.description} </h2>
                            <p class="product-price> ${item.price} </p>
                            <button> Eliminar </button>
                        `
        contenedorProductos.appendChild(card); 
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id); 
        })
    })
}

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id); 
}

