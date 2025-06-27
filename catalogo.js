document.addEventListener('DOMContentLoaded', function() {
    // Datos del catálogo (puedes reemplazar con una llamada API)
    const catalogo = [
        { id: 1, nombre: "Filtro de Aceite", categoria: "Filtros", precio: 25.99, marca: "Bosch", stock: 15, imagen: "filtro-aceite.jpg" },
        { id: 2, nombre: "Pastillas de Freno", categoria: "Frenos", precio: 45.50, marca: "Brembo", stock: 8, imagen: "pastillas-freno.jpg" },
        { id: 3, nombre: "Batería 12V", categoria: "Eléctrico", precio: 120.00, marca: "ACDelco", stock: 5, imagen: "bateria.jpg" },
        { id: 4, nombre: "Amortiguadores", categoria: "Suspensión", precio: 85.75, marca: "Monroe", stock: 12, imagen: "amortiguadores.jpg" },
        { id: 5, nombre: "Filtro de Aire", categoria: "Filtros", precio: 18.30, marca: "Mann-Filter", stock: 20, imagen: "filtro-aire.jpg" },
        { id: 6, nombre: "Aceite Motor 5W-30", categoria: "Lubricantes", precio: 32.40, marca: "Mobil", stock: 30, imagen: "aceite-motor.jpg" }
    ];

    // Elementos del DOM
    const catalogoContainer = document.getElementById('catalogo-container');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroMarca = document.getElementById('filtro-marca');
    const buscador = document.getElementById('buscador');
    const contadorProductos = document.getElementById('contador-productos');

    // Generar opciones de filtros
    function generarOpcionesFiltros() {
        // Obtener categorías únicas
        const categorias = [...new Set(catalogo.map(item => item.categoria))];
        categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            filtroCategoria.appendChild(option);
        });

        // Obtener marcas únicas
        const marcas = [...new Set(catalogo.map(item => item.marca))];
        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca;
            option.textContent = marca;
            filtroMarca.appendChild(option);
        });
    }

    // Mostrar catálogo
    function mostrarCatalogo(productos) {
        catalogoContainer.innerHTML = '';

        if (productos.length === 0) {
            catalogoContainer.innerHTML = '<p class="no-result">No se encontraron productos.</p>';
            contadorProductos.textContent = '0 productos';
            return;
        }

        contadorProductos.textContent = `${productos.length} ${productos.length === 1 ? 'producto' : 'productos'}`;

        productos.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.className = 'producto-card';
            productoElement.innerHTML = `
                <div class="producto-imagen">
                    <img src="img/${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                    ${producto.stock < 5 ? '<span class="stock-bajo">¡Últimas unidades!</span>' : ''}
                </div>
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="marca">Marca: ${producto.marca}</p>
                    <p class="categoria">Categoría: ${producto.categoria}</p>
                    <p class="precio">$${producto.precio.toFixed(2)}</p>
                    <p class="stock">Disponibles: ${producto.stock}</p>
                    <button class="btn-cotizar" data-id="${producto.id}">Solicitar Cotización</button>
                </div>
            `;
            catalogoContainer.appendChild(productoElement);
        });

        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-cotizar').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const producto = catalogo.find(p => p.id === productId);
                alert(`Cotización solicitada para: ${producto.nombre}\nPrecio: $${producto.precio.toFixed(2)}`);
                // Aquí podrías redirigir a tu página de cotizaciones o abrir un modal
            });
        });
    }

    // Filtrar productos
    function filtrarProductos() {
        const categoriaSeleccionada = filtroCategoria.value;
        const marcaSeleccionada = filtroMarca.value;
        const terminoBusqueda = buscador.value.toLowerCase();

        let productosFiltrados = [...catalogo];

        if (categoriaSeleccionada) {
            productosFiltrados = productosFiltrados.filter(p => p.categoria === categoriaSeleccionada);
        }

        if (marcaSeleccionada) {
            productosFiltrados = productosFiltrados.filter(p => p.marca === marcaSeleccionada);
        }

        if (terminoBusqueda) {
            productosFiltrados = productosFiltrados.filter(p => 
                p.nombre.toLowerCase().includes(terminoBusqueda) || 
                p.marca.toLowerCase().includes(terminoBusqueda) ||
                p.categoria.toLowerCase().includes(terminoBusqueda)
            );
        }

        mostrarCatalogo(productosFiltrados);
    }

    // Inicializar
    generarOpcionesFiltros();
    mostrarCatalogo(catalogo);

    // Event listeners
    filtroCategoria.addEventListener('change', filtrarProductos);
    filtroMarca.addEventListener('change', filtrarProductos);
    buscador.addEventListener('input', filtrarProductos);
});