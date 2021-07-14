window.addEventListener("load", function() {
 
    // icono para poder interaccionar con el elemento
    showPassword = document.querySelector('#showPass');
    formPass = document.querySelector('#password')


    showPassword.addEventListener("click",function(event){
        if(formPass.type === 'password'){
            formPass.type = 'text'
        }else{
            formPass.type = 'password'
        }
    })
});