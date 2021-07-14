
 
    document.querySelectorAll('.agregarCarrito').forEach(item => {
        
        item.addEventListener('click', () => {
            
          var existing = localStorage.getItem('Producto');// traigo la data que exista hasta el momento
          existing = existing ? existing.split(',') : []; //si no existe data, hago un array, y si es un array lo hago string.
          existing.push(item.dataset.myvalue); //agrego nueva data al array

         localStorage.setItem('Producto', existing.toString()); //lo guardo de nuevo en local storage


          
      })

  
     
   })




//  let agregarCarrito = document.querySelectorAll('agregarCarrito')
//     console.log(agregarCarrito);
//     Array.prototype.forEach.call(agregarCarrito, function(agregarCarrito) {
//         var id = agregarCarrito.dataset.myvalue;
//         console.log("ID producto: "+ id);})