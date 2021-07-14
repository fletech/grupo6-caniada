window.addEventListener('load', () => {

    
    let agregarCarritoCarrousel = document.querySelector(".contenedor-cardsCarrousel");

    let badge = document.querySelector('.badge');
 
    function obtenerProductosLocalStorage() {
 
       let productos;
       if (localStorage.getItem('productos') == null) {
 
          productos = [];
 
       } else {
          productos = JSON.parse(localStorage.getItem('productos'));
       }
 
       return productos;
    }
 
    function notificacion() {
       let productos = obtenerProductosLocalStorage()
 
       if (productos.length == 0){
          badge.innerHTML = ""
       } else{
          badge.innerHTML = productos.length//actualiza la cantidad de productos que hay en el carrito, dentro de la burbuja roja en el header.
       }
       return badge
    }
 
    notificacion()
 
    
 
    function agregarProductoLocalStorage(idProducto, producto) {
       
       let productosLocalStorage = obtenerProductosLocalStorage();
       let productoData = JSON.parse(producto);
 
 
       let productoClickeado = {
          id: idProducto,
          nombre: productoData.nombre,
          precio: productoData.precio,
          talle: productoData.talle.nombre,
          img: `/images/fotosProductos/${productoData.imagen_1}`,
          cantidad: 1
       }
 
       
       let productoExistente = productosLocalStorage.find(element => element.id == idProducto)
       
 
       if (productoExistente == undefined) {
          productosLocalStorage.push(productoClickeado);
       } else {
          productoClickeado.cantidad = productoExistente.cantidad + 1;
          let posicion = productosLocalStorage.indexOf(productoExistente);
 
          if (posicion > -1) {
             productosLocalStorage.splice(posicion, 1)
          }
 
          productosLocalStorage.push(productoClickeado)
       }
       console.log(`el producto de id ${productoClickeado.id} fue agregado correctamente. Cantidad: ${productoClickeado.cantidad}`);
       
       localStorage.setItem('productos', JSON.stringify(productosLocalStorage));
       notificacion()
    }


 agregarCarritoCarrousel.addEventListener("click", function (e) {
      if (e.target.id == "linkAgregarCarritoCarrousel") {
         agregarProductoLocalStorage(e.target.dataset.idProducto, e.target.dataset.producto)
      }
   });

}) 