let todosLosProductos = [];
const API_URL = "https://fakestoreapi.com/products";

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", function () {
  cargarProductos();
});

// Función para cargar productos desde la API
async function cargarProductos() {
  try {
    mostrarLoading(true);
    const response = await fetch(API_URL);
    todosLosProductos = await response.json();

    // Crear las diferentes secciones
    crearSeccionOfertas();
    crearCarrusel();
    mostrarTodosLosProductos();

    mostrarLoading(false);
    mostrarSecciones();
  } catch (error) {
    console.error("Error al cargar productos:", error);
    mostrarError();
  }
}

// Función para mostrar/ocultar loading
function mostrarLoading(show) {
  const loading = document.querySelector(".loading");
  if (show) {
    loading.classList.add("show");
  } else {
    loading.classList.remove("show");
  }
}

// Función para mostrar las secciones
function mostrarSecciones() {
  document.getElementById("ofertas-section").style.display = "block";
  document.getElementById("carousel-section").style.display = "block";
  document.getElementById("productos-section").style.display = "block";
}

// Crear sección de ofertas (productos 1, 4 y 7)
function crearSeccionOfertas() {
  const ofertas = [
    todosLosProductos[0], // Producto 1
    todosLosProductos[3], // Producto 4
    todosLosProductos[6], // Producto 7
  ];

  const container = document.getElementById("ofertas-container");
  container.innerHTML = "";

  ofertas.forEach((producto) => {
    if (producto) {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6 mb-4";

      col.innerHTML = `
                <div class="card h-100 producto-card position-relative" onclick="mostrarDetalles(${
                  producto.id
                })">
                    <div class="oferta-badge">¡OFERTA!</div>
                    <img src="${
                      producto.image
                    }" class="card-img-top producto-img p-3" alt="${
        producto.title
      }">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${truncarTexto(
                          producto.title,
                          50
                        )}</h5>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price">$${producto.price}</span>
                                <div class="rating">
                                    ${generarEstrellas(producto.rating.rate)}
                                    <small class="text-muted">(${
                                      producto.rating.count
                                    })</small>
                                </div>
                            </div>
                            <button class="btn btn-custom w-100 mt-2" onclick="event.stopPropagation(); mostrarDetalles(${
                              producto.id
                            })">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                </div>
            `;
      container.appendChild(col);
    }
  });
}

// Crear carrusel con productos aleatorios
function crearCarrusel() {
  // Seleccionar 6 productos aleatorios para hacer 2 slides de 3 productos
  const productosAleatorios = [...todosLosProductos]
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const container = document.getElementById("carousel-container");
  container.innerHTML = "";

  // Crear slides de 3 productos cada uno
  for (let i = 0; i < productosAleatorios.length; i += 3) {
    const slide = document.createElement("div");
    slide.className = `carousel-item ${i === 0 ? "active" : ""}`;

    const productos = productosAleatorios.slice(i, i + 3);

    slide.innerHTML = `
            <div class="row justify-content-center">
                ${productos
                  .map(
                    (producto) => `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100 producto-card carousel-item-custom" onclick="mostrarDetalles(${
                          producto.id
                        })">
                            <img src="${
                              producto.image
                            }" class="card-img-top p-3" alt="${producto.title}">
                            <div class="card-body text-center">
                                <h6 class="card-title">${truncarTexto(
                                  producto.title,
                                  40
                                )}</h6>
                                <button class="btn btn-custom btn-sm" onclick="event.stopPropagation(); mostrarDetalles(${
                                  producto.id
                                })">
                                    Ver Más
                                </button>
                            </div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    container.appendChild(slide);
  }
}

// Mostrar todos los productos
function mostrarTodosLosProductos() {
  const container = document.getElementById("productos-container");
  container.innerHTML = "";

  todosLosProductos.forEach((producto) => {
    const col = document.createElement("div");
    col.className = "col-xl-3 col-lg-4 col-md-6 mb-4";

    col.innerHTML = `
            <div class="card h-100 producto-card" onclick="mostrarDetalles(${
              producto.id
            })">
                <img src="${
                  producto.image
                }" class="card-img-top producto-img p-3" alt="${
      producto.title
    }">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">${truncarTexto(
                      producto.title,
                      60
                    )}</h6>
                    <p class="card-text text-muted small">${truncarTexto(
                      producto.description,
                      80
                    )}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="price">$${producto.price}</span>
                            <small class="badge bg-primary">${
                              producto.category
                            }</small>
                        </div>
                        <div class="rating mb-2">
                            ${generarEstrellas(producto.rating.rate)}
                            <small class="text-muted">(${
                              producto.rating.count
                            })</small>
                        </div>
                        <button class="btn btn-custom w-100" onclick="event.stopPropagation(); mostrarDetalles(${
                          producto.id
                        })">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        `;
    container.appendChild(col);
  });
}

// Mostrar detalles del producto en modal
function mostrarDetalles(productId) {
  const producto = todosLosProductos.find((p) => p.id === productId);
  if (!producto) return;

  document.getElementById("modalTitle").textContent = "Detalles del Producto";
  document.getElementById("modalImage").src = producto.image;
  document.getElementById("modalImage").alt = producto.title;
  document.getElementById("modalProductTitle").textContent = producto.title;
  document.getElementById("modalCategory").textContent = producto.category;
  document.getElementById("modalDescription").textContent =
    producto.description;
  document.getElementById("modalPrice").textContent = `$${producto.price}`;
  document.getElementById("modalRating").innerHTML = generarEstrellas(
    producto.rating.rate
  );
  document.getElementById("modalRatingCount").textContent =
    producto.rating.count;

  const modal = new bootstrap.Modal(document.getElementById("productoModal"));
  modal.show();
}

// Función para truncar texto
function truncarTexto(texto, limite) {
  return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
}

// Función para generar estrellas de rating
function generarEstrellas(rating) {
  const estrellas = Math.round(rating);
  let html = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= estrellas) {
      html += '<i class="bi bi-star-fill"></i>';
    } else {
      html += '<i class="bi bi-star"></i>';
    }
  }

  return html;
}

// Función para mostrar error
function mostrarError() {
  document.querySelector(".loading").innerHTML = `
        <div class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-triangle"></i>
            Error al cargar los productos. Por favor, intenta de nuevo más tarde.
        </div>
    `;
}

// Agregar funcionalidad de teclado para el modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("productoModal")
    );
    if (modal) modal.hide();
  }
});
