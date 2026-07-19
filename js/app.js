/* PUNTO 8: ACTIVIDAD GUIADA 1 - LISTA DINÁMICA DE NOMBRES
const nombres = [];
const inputNombre = document.querySelector("#nombre");
const btnAgregar = document.querySelector("#btnAgregar");
const listaNombres = document.querySelector("#Lista");

if (btnAgregar && inputNombre && listaNombres) {
    btnAgregar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();

        if (nombre === "") {
            alert("Digite un nombre válido");
            return;
        }

        nombres.push(nombre);
        inputNombre.value = "";
        mostrarNombres();
    });
}

function mostrarNombres() {
    if (!listaNombres) return;

    listaNombres.innerHTML = "";
    nombres.forEach((nombre) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        listaNombres.appendChild(li);
    });
}*/

// ==========================================
// PUNTO 9: ACTIVIDAD GUIADA 2 - REGISTRO DE OBJETOS
// ==========================================

// 1. Arreglo global que guardará todos los objetos de productos
const productos = [];
let contadorId = 1;

// 2. Captura de los nuevos elementos del DOM
const formulario = document.querySelector('#formularioProducto');
const inputNombre = document.querySelector('#prodNombre');
const selectCategoria = document.querySelector('#prodCategoria');
const inputPrecio = document.querySelector('#prodPrecio');
const inputStock = document.querySelector('#prodStock');

// 3. Escuchar el evento 'submit' del formulario
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const categoria = selectCategoria.value;
    const precio = Number(inputPrecio.value);
    const stock = Number(inputStock.value);

    if (precio <= 0) {
        alert('El precio debe ser mayor a cero.');
        return;
    }
    if (stock < 0) {
        alert('El stock no puede ser un número negativo.');
        return;
    }

    agregarProducto(nombre, categoria, precio, stock);
    formulario.reset();
});

// Función oficial de la Actividad Guiada 2 (Conectada a los Puntos 10 y 13)
function agregarProducto(nombre, categoria, precio, stock) {
    const producto = {
        id: contadorId++, 
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        stock: stock
    };

    productos.push(producto);
    console.log("--- Producto Registrado con Éxito ---");
    console.table(productos);
    
    mostrarProductos();        // Actualiza la tabla (Punto 10)
    actualizarEstadisticas();  // Actualiza el panel de estadísticas (Proyecto Integrador)
}

// ==========================================
// PUNTO 10: ACTIVIDAD GUIADA 3 - RENDERIZAR TABLA
// ==========================================

function mostrarProductos() {
    const tbody = document.querySelector('#tablaProductos tbody');
    tbody.innerHTML = '';

    productos.forEach((producto) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>${producto.stock}</td>
        `;
        tbody.appendChild(fila);
    });
}

// ==========================================
// PUNTO 11: LÓGICA DE BUSCAR, FILTRAR Y ORDENAR
// ==========================================

// 1. Función para buscar productos que contengan un texto en su nombre
function buscarPorNombre(texto) {
    return productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(texto.toLowerCase())
    );
}

// 2. Función para filtrar productos por una categoría exacta
function filtrarPorCategoria(categoria) {
    return productos.filter((producto) => producto.categoria === categoria);
}

// 3. Función para ordenar una copia de los productos por precio de menor a mayor
function ordenarPorPrecioAscendente() {
    return [...productos].sort((a, b) => a.precio - b.precio);
}

// 💡 FUNCIÓN AUXILIAR: Nos permite dibujar en la tabla CUALQUIER arreglo filtrado o modificado
function renderizarArregloEspecifico(arregloAMostrar) {
    const tbody = document.querySelector('#tablaProductos tbody');
    tbody.innerHTML = '';

    arregloAMostrar.forEach((producto) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>${producto.stock}</td>
        `;
        tbody.appendChild(fila);
    });
}

// ==========================================
// CONEXIÓN DE LOS CONTROLES CON EL DOM (PUNTO 11)
// ==========================================

const inputBuscar = document.querySelector('#inputBuscar');
const filtroCategoria = document.querySelector('#filtroCategoria');
const btnOrdenarPrecio = document.querySelector('#btnOrdenarPrecio');

// Evento para la Barra de Búsqueda
inputBuscar.addEventListener('input', () => {
    const texto = inputBuscar.value;
    const productosFiltrados = buscarPorNombre(texto);
    renderizarArregloEspecifico(productosFiltrados);
});

// Evento para el Filtro de Categoría
filtroCategoria.addEventListener('change', () => {
    const categoriaSeleccionada = filtroCategoria.value;
    
    if (categoriaSeleccionada === 'TODOS') {
        mostrarProductos(); 
    } else {
        const productosFiltrados = filtrarPorCategoria(categoriaSeleccionada);
        renderizarArregloEspecifico(productosFiltrados);
    }
});

// Evento para el Botón de Ordenamiento
btnOrdenarPrecio.addEventListener('click', () => {
    const productosOrdenados = ordenarPorPrecioAscendente();
    renderizarArregloEspecifico(productosOrdenados);
});

// ==========================================
// PUNTO 12: ACTIVIDAD GUIADA 5 - CONVERSIÓN A JSON
// ==========================================

const btnConvertirJSON = document.querySelector('#btnConvertirJSON');
const txtJSON = document.querySelector('#txtJSON');

btnConvertirJSON.addEventListener('click', () => {
    if (productos.length === 0) {
        alert('Por favor, registre al menos un producto antes de probar la conversión JSON.');
        return;
    }

    console.log("=== INICIANDO PRUEBA JSON ===");

    // 1. JSON.stringify(): Convertimos el arreglo de objetos a texto plano JSON
    const productosJSON = JSON.stringify(productos);
    
    // Mostramos el resultado en el textarea del HTML y en la consola
    txtJSON.value = productosJSON;
    console.log("1. Texto JSON generado (JSON.stringify):");
    console.log(productosJSON);

    // 2. JSON.parse(): Convertimos el texto plano de regreso a un Arreglo de Objetos real
    const productosRecuperados = JSON.parse(productosJSON);
    
    console.log("2. Datos recuperados como objetos JS (JSON.parse):");
    console.log(productosRecuperados);
    console.log("=============================");
    
    alert('¡Conversión exitosa! Revisa el cuadro de texto y la consola (F12).');
});

// ==========================================
// PROYECTO INTEGRADOR - ESTADÍSTICAS CON REDUCE (PUNTO 13 / 17)
// ==========================================

function actualizarEstadisticas() {
    const statValorTotal = document.querySelector('#statValorTotal');
    const statStockBajo = document.querySelector('#statStockBajo');

    // 1. Uso de reduce() para acumular el valor financiero (precio * stock) de todos los productos
    const valorTotal = productos.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.stock);
    }, 0);

    // 2. Uso de filter() para encontrar cuántos productos tienen un stock crítico (menor a 3)
    const productosCriticos = productos.filter(producto => producto.stock < 3);

    // 3. Modificar el DOM con los resultados calculados
    statValorTotal.textContent = `$${valorTotal.toLocaleString()}`;
    statStockBajo.textContent = productosCriticos.length;
}