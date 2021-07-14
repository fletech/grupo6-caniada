

window.addEventListener('load', () => {

   
   let agregarCarrito = document.querySelectorAll("#linkAgregarCarrito");
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

   function notificacionEnBadge() {
      let productos = obtenerProductosLocalStorage()

      if (productos.length == 0){
         badge.innerHTML = ""
      } else{
         badge.innerHTML = productos.length//actualiza la cantidad de productos que hay en el carrito, dentro de la burbuja roja en el header.
      }
      return badge
   }

   notificacionEnBadge()

   

   function agregarProductoLocalStorage(idProducto, producto) {
      
      let productosLocalStorage = obtenerProductosLocalStorage();
      let productoData = JSON.parse(producto);
      let talle = document.getElementById('seleccionTalles').value
      let productoClickeado = {
         id: idProducto,
         nombre: productoData.nombre,
         precio: productoData.precio,
         talle: talle,
         img: `/images/fotosProductos/${productoData.imagen_1}`,
         cantidad: 1
      }

      console.log(productoClickeado);
      let productoExistente = productosLocalStorage.find(element => element.id == idProducto && element.talle == talle)
      console.log(productoExistente);

      if (productoClickeado.talle == 'selecTalle'){
          return window.alert('Debes seleccionar un talle')
      } else 
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

      console.log(productoClickeado)
      
      localStorage.setItem('productos', JSON.stringify(productosLocalStorage));
      notificacionEnBadge()
   }


   agregarCarrito.forEach(linkDeAgregarACarrito=>{
      linkDeAgregarACarrito.addEventListener("click", function (e) {
            agregarProductoLocalStorage(e.target.dataset.idProducto, e.target.dataset.producto)
            console.log(e.target.dataset.producto);
      })
   })
   

// if (window.location.pathname == "/productos/ver/carrito"){
//    let productosLocalStorage = obtenerProductosLocalStorage();
   
//    let subtotalAPagar = 0;
//    productosLocalStorage.forEach(element => {

//       let contenedorProductos = document.querySelector('.contenedor-productos')

//       contenedorProductos.innerHTML += `
//       <div class="producto 1">

//       <div class="imagenProducto">
//          <img class="imgProducto" src="${element.img}" alt="">
//       </div>

//       <div class="detalleProductoCarrito">
//            <div class="nombreDescripcion">
//                 <a class="ver-carrito" href="/productos/${element.id}"><h4>${element.nombre}</h4></a>
//                 <p><p>
//                 <p>Detalles</p>
//            </div>

//            <div class="cantidadYtalle">

//                <div class="stepper">
//                   <span class="stepper-restar" data-id-producto=${element.id}>-</span>
//                </div>
//                <div>
//                      <input class="cantidad-producto ${element.id}" data-id-producto="${element.id}" type="text" value=${element.cantidad}>
//                </div>
//                <div class="stepper">
//                   <span class="stepper-sumar" data-id-producto=${element.id}>+</span>
//                </div>

//                 <div class="talles">
//                      <p>Talle:</p>
//                      <select name="talle" id="talle">
//                           <option value="">...</option>
//                           <option value="">XS</option>
//                           <option value="">S</option>
//                           <option value="">M</option>
//                           <option value="">L</option>
//                           <option value="">XL</option>
//                           <option value="">XXL</option>
//                      </select>
//                 </div>
                
//            </div>
//       </div>

//       <div class="precioYeliminar">
//            <h3 class="precio-cantidad">$${element.precio}</h3>
//            <span class="item-delete"><i class="far fa-trash-alt" data-id-producto=${element.id}></i></span>
//       </div>
//  </div>`

//       let precioPorCantidad = element.precio * element.cantidad;
//       subtotalAPagar = subtotalAPagar + precioPorCantidad
   


//    });

//    let subtotal = document.querySelector('.monto-acumulado');
//       subtotal.innerHTML = `$ ${subtotalAPagar }`
//    let impuestos = document.querySelector('.impuestos');
//       impuestos.innerHTML = `$${subtotalAPagar * 0.21}`;
//    let montoTotal = document.querySelector('.monto-total');
//       montoTotal.innerHTML = `$ ${subtotalAPagar * 1.21 }`;
   
//    if(productosLocalStorage != null){

//          let [...eliminarItem] = document.querySelectorAll(`.item-delete`);

//          eliminarItem.forEach(element=>{
//             element.addEventListener('click', (e)=>{
    
//             let idProducto = e.target.dataset.idProducto
                   
//             let productoExistente = productosLocalStorage.find(producto => producto.id == idProducto)
                   
//             let posicion = productosLocalStorage.indexOf(productoExistente);
                   
//             if (posicion > -1) {
//                   productosLocalStorage.splice(posicion, 1)
//             }

//             localStorage.setItem('productos', JSON.stringify(productosLocalStorage));

//             notificacionEnBadge();
              
//             window.location.reload()

//             })
//          })

//    }

// };

})
