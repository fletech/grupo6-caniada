window.addEventListener('load', ()=>{
     let headerUsuario = document.getElementById('data-user');
     let idUser = headerUsuario.dataset.idUsuario

          if(idUser != undefined){

               let body = document.querySelector('body')
               let menuUsuario = document.querySelector('.avatar img');
               let flechaMenuUsuario = document.querySelector('.flecha-menu');
               let menuDropdown = document.querySelector('.menu-dropdown');

               

               function desplegarMenu (){
                    
                    menuDropdown.classList.toggle('menu-dropdown-toggled')
                    

               }

               function esconderMenu(){
                    menuDropdown.classList= 'menu-dropdown'
               }



               // LISTENERS

               menuUsuario.addEventListener('click', (e)=>{
                    e.stopPropagation();
                    desplegarMenu();
               })
               
               
               flechaMenuUsuario.addEventListener('click', (e)=>{
                    e.stopPropagation();
                    desplegarMenu();
               });

               body.addEventListener('click', (e)=>{

                    esconderMenu();
               })

               body.addEventListener('keydown', (e)=>{
                    if(e.key == "Escape"){
                         esconderMenu();
                    }
               })



          }

     
})