window.addEventListener('load', function(){

    if (window.location.pathname == "/usuarios/register"){
        const form = document.querySelector('#form')
        const nombre = document.querySelector('#nombre')
        const apellido = document.querySelector('#apellido')
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')
        const password2 = document.querySelector('#repassword')
        const small = document.querySelectorAll('small')
        const input = document.querySelectorAll('#form input')
        const terminos = document.querySelector('#legal')
    
        const campos = {
            nombre:false,
            apellido:false,
            email:false,
            password:false
        }
    
    
        const expresiones = {
            usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
            nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
            password: /^.{4,12}$/, // 4 a 12 digitos.
            email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            telefono: /^\d{7,14}$/ // 7 a 14 numeros.
        }    
        const validarFormulario = (e) => {
            switch (e.target.name){
                case "nombre":
                    if (expresiones.nombre.test(e.target.value)) {
                        document.getElementById("nombre").classList.remove('incorrecto')
                        document.getElementById("nombre").classList.add('correcto');
                        document.querySelector('#cardNombre').classList.remove('desaprobado')
                        document.querySelector('#cardNombre').classList.add('aprobado')
                        document.querySelector('#errorNombre').innerText = ''
                        campos.nombre = true
                        
                    }else {
                        document.getElementById("nombre").classList.add('incorrecto')
                        document.querySelector('#cardNombre').classList.remove('aprobado')
                        document.querySelector('#cardNombre').classList.add('desaprobado')
                        document.querySelector('#errorNombre').innerText = ' El nombre debera tener entre 1 y 40 caracteres, sin signos'
                        campos.nombre = false
    
                    }
                    break;
                 
                case "apellido":
                    if (expresiones.nombre.test(e.target.value)) {
                        document.getElementById("apellido").classList.remove('incorrecto')
                        document.getElementById("apellido").classList.add('correcto');
                        document.querySelector('#cardApellido').classList.remove('desaprobado')
                        document.querySelector('#cardApellido').classList.add('aprobado')
                        document.querySelector('#errorApellido').innerText = ''
                        campos.apellido = true
    
    
                        
                    }else {
                        document.getElementById("apellido").classList.add('incorrecto')
                        document.querySelector('#cardApellido').classList.remove('aprobado')
                        document.querySelector('#cardApellido').classList.add('desaprobado')
                        document.querySelector('#errorApellido').innerText = 'error'
                        campos.apellido = false
    
                    }
                    break;
                 
                case "email":
                    if (expresiones.email.test(e.target.value)) {
                        document.getElementById("email").classList.remove('incorrecto')
                        document.getElementById("email").classList.add('correcto');
                        document.querySelector('#cardEmail').classList.remove('desaprobado')
                        document.querySelector('#cardEmail').classList.add('aprobado')
                        document.querySelector('#errorEmail').innerText = ''
                        campos.email = true
                        
    
                        
                    }else {
                        document.getElementById("email").classList.add('incorrecto')
                        document.querySelector('#cardEmail').classList.remove('aprobado')
                        document.querySelector('#cardEmail').classList.add('desaprobado')
                        document.querySelector('#errorEmail').innerText = 'Email Invalido'
                        campos.email = false
    
                    }
                    break;
                 
                case "password":
                    if (expresiones.password.test(e.target.value)) {
                        document.getElementById("password").classList.remove('incorrecto')
                        document.getElementById("password").classList.add('correcto');
                        document.querySelector('#cardPass').classList.remove('desaprobado')
                        document.querySelector('#cardPass').classList.add('aprobado')
                        document.querySelector('#errorPass').innerText = ''
                        validarPassword()
                        campos.password = true
    
                        
                    }else {
                        document.getElementById("password").classList.add('incorrecto')
                        document.querySelector('#cardPass').classList.remove('aprobado')
                        document.querySelector('#cardPass').classList.add('desaprobado')
                        document.querySelector('#errorPass').innerText = 'Contraseña debera contener blablabla'
                        campos.password = false
    
                    }
                    break;
                 
                case "repassword":
                   validarPassword()
                    break;
                 
            }
            console.log(e.target.name);
        }
    
        const validarPassword = () =>{
            if (password.value !== password2.value){
                document.getElementById("repassword").classList.add('incorrecto')
                document.querySelector('#cardRePass').classList.remove('aprobado')
                document.querySelector('#cardRePass').classList.add('desaprobado')
                document.querySelector('#errorRePass').innerText = 'Las contraseñas no coinciden'
                campos.password = false
    
            }else {
                 document.getElementById("repassword").classList.remove('incorrecto')
                        document.getElementById("repassword").classList.add('correcto');
                        document.querySelector('#cardRePass').classList.remove('desaprobado')
                        document.querySelector('#cardRePass').classList.add('aprobado')
                        document.querySelector('#errorRePass').innerText = ''
                        campos.password = true
    
            }
        }
    
        input.forEach(input => {
            input.addEventListener('keyup', validarFormulario );
            input.addEventListener('blur', validarFormulario );
            })
            
           
    
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        
            // checkInputs()
            if(campos.nombre && campos.apellido && campos.email & campos.password && terminos.checked){
                form.submit()
             
             }
        } );
        
        console.log(terminos)
        console.log(campos.nombre)
        console.log(campos.apellido)
        console.log(campos.email)
        console.log(campos.password)
        console.log(terminos.checked)
    
        
        
        // function checkInputs(){
        //     //chequeamos los inputs
        
        //     let nombreUsuarioValue = nombre.value.trim()
        //     let apellidoUsuarioValue = apellido.value.trim()
        //     let emailUsuarioValue = email.value.trim()
        //     let passwordUsuarioValue = password.value.trim()
        //     let password2UsuarioValue = password2.value.trim()
    
        
        
            
        //     if(nombreUsuarioValue === '') {
        //         setErrorFor(nombre, 'Debes completar el Nombre');
        //     } else {
        //         setSuccessFor(nombre);
        //     }
            
        //     if(apellidoUsuarioValue === '') {
        //         setErrorFor(apellido, 'Debes completar el Apellido');
        //     } else {
        //         setSuccessFor(apellido);
        //     }
            
        //     if(emailUsuarioValue === '') {
        //         setErrorFor(email, 'Debes completar el email');
        //     } else if (!isEmail(emailUsuarioValue)) {
        //         setErrorFor(email, 'Email no valido');
        //     } else {
        //         setSuccessFor(email);
        //     }
            
        //     if(passwordUsuarioValue === '') {
        //         setErrorFor(password, 'Debes completar la password');
        //     } else if(!isPassword(passwordUsuarioValue)) {
        //         setErrorFor(password, 'La contraseña debe tener minimo 8 caracteres y una mayuscula ');
        //     }else if (!isPassword(emailUsuarioValue)) {
        //         setErrorFor(passwordUsuarioValue, 'Email no valido');
        //     } else {
        //         setSuccessFor(password);
        //     }
            
        //     if(password2UsuarioValue === '') {
        //         setErrorFor(password2, 'Debes completar la password');
        //     } else if(passwordUsuarioValue !== password2UsuarioValue) {
        //         setErrorFor(password2, 'Passwords no concuerdan');
        //     } else{
        //         setSuccessFor(password2);
        //     }
            
        // }
        
        // function setErrorFor(input, message) {
        //     const formControl = input.parentElement
        //     const small = formControl.querySelector('small')
        //     small.innerText = message;
        // }
        
        // function setSuccessFor(input) {
        //     const formControl = input;
        //     const small = input.querySelector('small')
    
        //     // small.className = 'form-control success';
        // }
        
        
        // function isEmail(email) {
        //     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        // }
    
        // function isPassword(password) {
        //     return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        //     .test(password);
        // }
     };
    

})





//form.submit()



//falcon master ]

// let errors = {}

// despues le mando errores.title 