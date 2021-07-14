////////////----------------REQUIRES-------------------////////////

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')







let rutasMain = require('./routes/main')


////////////////////-EJS-///////////////////////
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


////////////-----------------PUBLIC--------------------////////////
app.use(express.static(path.join(__dirname, '../public')));



////////////---------------MIDDLEWARES-----------------//////////// 
app.use(express.urlencoded({extended : false}))
app.use(express.json());



//Este middleware verificará si la cookie del usuario todavía está guardada en el navegador y el usuario no está logueado, si es asi, cerrará automáticamente la sesión del usuario.
// Esto generalmente sucede cuando detiene su servidor express después de iniciar sesión, su cookie aún permanece guardada en el navegador.




////////////------------------RUTAS--------------------////////////
app.use('/', rutasMain) //funciona OK


////////////////////- ERROR 404 -///////////////
app.use((req, res, next) => {
     res.status(404).render('templateView', {
          title: 'Caniada - Not found', 
          view: 'not_found',
     })
})


////////////---------------PUERTO:3000-----------------////////////
app.listen(process.env.PORT || 3000, function () {
     console.log('Server running at http://localhost:3000/')
}) // parametros distintos a "('localhost', 3000)" porque para heroku se necesita tener estos parametros pasados. 







