window.addEventListener('load',()=>{
     
     
     function obtenerProductosLocalStorage(){
          let productosLS = JSON.parse(localStorage.getItem('productos'))
          return productosLS
     }


     function notificacionEnBadge() {
           
          let badge = document.querySelector('.badge');

          let productos = obtenerProductosLocalStorage()
    
          if (productos.length == 0){
             badge.innerHTML = ""
          } else{
             badge.innerHTML = productos.length//actualiza la cantidad de productos que hay en el carrito, dentro de la burbuja roja en el header.
          }
          return badge
     }

     let productosLocalStorage = obtenerProductosLocalStorage()
     
     if(productosLocalStorage == null){

          document.location.href="/productos"

     }else{
          obtenerProductosLocalStorage();

         
          
          let dataUser = document.getElementById('data-user');
          console.log(dataUser);
          let idUsuario
          console.log(dataUser.dataset.idUsuario)
          if (dataUser.dataset.idUsuario != undefined){
               idUsuario = dataUser.dataset.idUsuario;
          }
          console.log(idUsuario)

          let dataCarrito = document.querySelector('.data-carrito');
          console.log(dataCarrito)
          let carritoLength = document.querySelector('.carrito-length')
          let montoAPagar= document.querySelector('.montoAPagar')
          
          let contenedorProductos = document.querySelector('.contenedor-productos')
          let button = document.getElementById('checkout-post')
          

          //Renderizar todos los productos de LS
          let subtotalAPagar = 0; 

          productosLocalStorage.forEach(element => {
               contenedorProductos.innerHTML += `
               <div class="producto 1" id=${element.id}-${element.talle}>
         
               <div class="imagenProducto">
                  <img class="imgProducto" src="${element.img}" alt="">
               </div>
         
               <div class="detalleProductoCarrito">
                    <div class="nombreDescripcion">
                         <a class="ver-carrito" href="/productos/${element.id}"><h4>${element.nombre}</h4></a>
                         <p><p>
                         <p>Detalles</p>
                    </div>
         
                    <div class="cantidadYtalle">
         
                        <div class="stepper">
                           <span class="stepper-restar" data-id-producto=${element.id} data-talle-producto=${element.talle}>-</span>
                        </div>
                        <div>
                              <input class="cantidad-producto ${element.id}" data-id-producto="${element.id}" type="text" value=${element.cantidad} data-talle-producto=${element.talle}>
                        </div>
                        <div class="stepper">
                           <span class="stepper-sumar" data-id-producto=${element.id} data-talle-producto=${element.talle}>+</span>
                        </div>
         
                         <div class="talles">
                              <p>Talle:</p>
                              <select name="talle" id="talle">
                                   <option value="${element.talle}">${element.talle}</option>
                                   <option value="">XS</option>
                                   <option value="">S</option>
                                   <option value="">M</option>
                                   <option value="">L</option>
                                   <option value="">XL</option>
                                   <option value="">XXL</option>
                              </select>
                         </div>
                         
                    </div>
               </div>
         
               <div class="precioYeliminar">
                    <h3 class="precio-cantidad">$${element.precio}</h3>
                    <span class="item-delete"><i class="far fa-trash-alt" data-id-producto=${element.id} data-talle-producto=${element.talle}></i></span>
               </div>
          </div>`
         
               let precioPorCantidad = element.precio * element.cantidad;
               subtotalAPagar = subtotalAPagar + precioPorCantidad
         
            });

          let subtotal = document.querySelector('.monto-acumulado');
          let impuestos = document.querySelector('.impuestos');
          let montoTotal = document.querySelector('.monto-total');

          subtotal.innerHTML = `$ ${subtotalAPagar }`;
          impuestos.innerHTML = `$${subtotalAPagar * 0.21}`;
          montoTotal.innerHTML = `$ ${subtotalAPagar * 1.21 }`;
      
          // Eliminar un item del carrito. 
          let [...eliminarItem] = document.querySelectorAll(`.item-delete`);

          eliminarItem.forEach(element=>{
            element.addEventListener('click', (e)=>{
               
            let idProducto = e.target.dataset.idProducto
            let talleProducto = e.target.dataset.talleProducto
            let productoExistente = productosLocalStorage.find(producto => producto.id == idProducto && producto.talle == talleProducto)
                   
            let posicion = productosLocalStorage.indexOf(productoExistente);
                   
            if (posicion > -1) {
                  productosLocalStorage.splice(posicion, 1)
            }

            localStorage.setItem('productos', JSON.stringify(productosLocalStorage));

            notificacionEnBadge();
              
            window.location.reload()

            });
          });

          //Selección del stepper para aumentar o disminuir cantidades.

          let [...stepperSumar]= document.querySelectorAll('.stepper-sumar')
          let [...stepperRestar]= document.querySelectorAll('.stepper-restar')
          let [...cantidadProducto]= document.querySelectorAll('.cantidad-producto');


          //Stepper INCREMENTA
          stepperSumar.forEach(stepperSuma=>{
               stepperSuma.addEventListener('click', (e)=>{
                   let productoModificado= cantidadProducto.find(producto=>producto.dataset.idProducto == e.target.dataset.idProducto && producto.dataset.talleProducto == e.target.dataset.talleProducto)

                   productoModificado.value = parseInt(productoModificado.value) + 1

                    let productosLocalStorageActualizado = productosLocalStorage.find(element => productoModificado.dataset.idProducto == element.id && productoModificado.dataset.talleProducto == element.talle)

                    productosLocalStorageActualizado.cantidad = productoModificado.value;
                    let posicion = productosLocalStorage.indexOf(productoModificado);

                    if (posicion > -1) {
                         productosLocalStorage.splice(posicion, 1);
                         productosLocalStorage.push(productosLocalStorageActualizado)
                    }

                    localStorage.setItem('productos', JSON.stringify(productosLocalStorage));

                    actualizarCantidades(obtenerProductosLocalStorage());
                    
               })
          })

          //Stepper disminuye
          stepperRestar.forEach(stepperResta=>{
               stepperResta.addEventListener('click', (e)=>{
                   let productoModificado= cantidadProducto.find(producto=>producto.dataset.idProducto == e.target.dataset.idProducto && producto.dataset.talleProducto == e.target.dataset.talleProducto)



                    if(productoModificado.value >= 2){productoModificado.value = parseInt(productoModificado.value) - 1}
                    

                    let productosLocalStorageActualizado = productosLocalStorage.find(element => productoModificado.dataset.idProducto == element.id )

                    productosLocalStorageActualizado.cantidad = productoModificado.value;
                    let posicion = productosLocalStorage.indexOf(productoModificado);

                    if (posicion > -1) {
                         productosLocalStorage.splice(posicion, 1);
                         productosLocalStorage.push(productosLocalStorageActualizado)
                    }

                    localStorage.setItem('productos', JSON.stringify(productosLocalStorage));

                    actualizarCantidades(obtenerProductosLocalStorage())
                    
               })
          })


          function actualizarCantidades(obtenerProductosLocalStorage){

               let montoAcumulado = 0;
               dataCarrito.innerHTML = "";
               carritoLength.innerHTML = "";
          obtenerProductosLocalStorage.forEach((producto, i) => {
               dataCarrito.innerHTML += 
                    `<input type="text" name="producto${i+1}" value=${producto.id}_${producto.cantidad}_${producto.talle}_${producto.precio*producto.cantidad} hidden>`;
               montoAcumulado += producto.precio *producto.cantidad;
          });
          
          carritoLength.innerHTML = `<input type="number" name="carritoLength" value=${obtenerProductosLocalStorage.length} hidden>
          <input type="number" name="carritoSubtotal" value=${montoAcumulado} hidden>
          <input type="number" name="carritoTotal" value=${montoAcumulado*1.21} hidden>
          <input type="number" name="idUsuario" value=${idUsuario} hidden>
          `;

          montoAPagar.innerHTML = `$${montoAcumulado * 1.21}`;

          subtotal.innerHTML = `$ ${montoAcumulado }`
          impuestos.innerHTML = `$${montoAcumulado * 0.21}`;
          montoTotal.innerHTML = `$ ${montoAcumulado * 1.21 }`;

          }


          let montoAcumulado = 0;

          productosLocalStorage.forEach((producto, i) => {
               dataCarrito.innerHTML += 
                    `<input type="text" name="producto${i+1}" value=${producto.id}_${producto.cantidad}_${producto.talle}_${producto.precio*producto.cantidad} hidden>`;
               montoAcumulado += producto.precio *producto.cantidad;
          });

          carritoLength.innerHTML += 
          `<input type="number" name="carritoLength" value=${productosLocalStorage.length} hidden>
          <input type="number" name="carritoSubtotal" value=${montoAcumulado} hidden>
          <input type="number" name="carritoTotal" value=${montoAcumulado*1.21} hidden>
          <input type="number" name="idUsuario" value=${idUsuario} hidden>
          `;

          montoAPagar.innerHTML = `$${montoAcumulado * 1.21}`


          

          
          

          button.addEventListener('click', (e)=>{
               obtenerProductosLocalStorage();
               localStorage.clear();
               window.open("https://www.mercadopago.com.ar", "_blank");
               // if(idUser != undefined){
               //      obtenerProductosLocalStorage();
               //      localStorage.clear();
               //      console.log(idUser)
               //      //window.open("https://www.mercadopago.com.ar", "_blank");
               // }else{
               //      e.preventDefault();
               //      document.location.href= '/usuarios/login'
               // }
          })
     }
})