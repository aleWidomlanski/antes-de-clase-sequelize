/* Utilizando Promesas
Vamos a practicar un poco el manejo de promises (promesas) en javascript. Recordá que las promesas nos permiten ejecutar código asincrónico, es decir, que a una función que devulve una promesa puedo concatenarle el método then, que sólo se va a ejecutar cuando la función haya concluido. En este ejemplo tenemos la función buscarProducto, que espera un id de producto y devulve una promesa.

El objetivo nuestro es concatenar el método then al final de la ejecución de la función y hacer un conosle log de parámetro que recibe. */

const { sequelize } = require("./Ale/repo/practicas-antes-de-la-clase/models");


buscarProducto(1).then(function (params) {
    console.log(params)
})


/* ¿Y si la promesa falla?
Las promesas, además de manejar el resultado de código asincrónico, también nos permite saber si el código no se pudo ejecutar con éxito. El manejo de errores en las promesas se hace concatenando al final del método (o métodos) then un método espcial llamdo catch. Este método catch se va a ejecuar sólo si hubo un error en alguno de los métodos then anteriores, es decir, si alguna de las promesas falló.

En este ejemplo tenemos la función buscarProducto. En el método then, mostramos por consola el producto encontrado. Nuestro objetivo ahora es agregar un método catch para el caso de que buscarProducto fallé. Dentro del método catch vamos a agregar un console log del error. */

buscarProducto(1)
    .then(producto => {
        console.log(producto);
    })
    .catch(error =>
        console.log(error)
    )



//Ejercitando 

module.exports = (sequelize, dataTypes) => {
    const Usuario = sequelize.define("Usuarios", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            types: dataTypes.INTEGER
        },
        nombre: {
            allowNull: false,
            types: dataTypes.STRING
        }
    }, {
        tablename: "tablaMeLlamoAsi",
        timestamp: false
    });

    return Usuario;
}



/* Creando un modelo
Nuestra base de datos cuenta con una tabla llamada usuarios que tiene tres columnas: nombre, email y password (todas del tipo string).

El objetivo de este ejercicio es poder crear un modelo asociado a la tabla usuarios.
 */


const Sequelize = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('usuarios', {
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = Usuario;


/* 
Evitando errores a la hora de crear nuestros modelos
A la hora de configurar nuestros modelos, Sequelize hace algunas suposiciones respecto de nuestras tablas. Una de ellas es que espera que todas nuestras tablas tengan las columnas created_at y updated_at.

Si creamos un modelo de una tabla que no tenga alguna de estas columnas, podemos encontrarnos con el clásico error: "Unknown column 'createdAt' in 'field list'".

Para evitar esto, debemos decirle explícitamente a Sequelize que no vamos a usar ninguna de las columnas created_at o updated_at. Para hacer esto es necesario pasar, como tercer parámetro del método define, un JSON con esta estructura: {timestamps: false}.

En este ejemplo ya tenemos configurado el modelo para la tabla usuarios, pero necesitamos aclarar que no tenemos las columnas created_at o updated_at. Nuestro objetivo va a ser agregar la configuración correspondiente. */


const Sequelize = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('usuarios', {
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
}, {
    timestamps: false,
});

module.exports = Usuario;


// Trayendo todas las películas
// A partir de nuestro modelo Peliculas vamos a recuperar todas las películas de nuestra base de datos y hacer console log del resultado.

// Para esto podemos usar el método findAll del modelo Peliculas. Recordemos que este método es asincrónico.

const Peliculas = require('model/peliculas.js');

db.Peliculas.findAll()
    .then(function (resultados) {
        console.log(resultados)
    })



/*     Trayendo pelis por ID
A partir de nuestro modelo Peliculas vamos a recuperar la película con el id 1.

Sequelize nos ofrece el método findByPk que recupera un elemento de la base en función de su primary key. Podemos usar este método a partir de nuestro objeto Peliculas.

Tengamos en cuenta que este método es asincrónico, por lo que será necesario trabajar con promises. */



const Peliculas = require('model/peliculas.js');

Peliculas.findByPk(1)
    .then(function (resultados) {
        console.log(resultados)
    })



/*   Trayendo productos ordenados
En este ejercicio el objetivo va a ser traer todos los productos ordenados por precio, de menor a mayor.

Recordemos que dentro del método findAll podemos pasar un JSON que tenga como clave la palabra order y cuyo valor sea un array indicando sobre qué columna o columnas vamos a ordenar y qué tipo de ordenamiento va a ser: ASC o DESC.
*/


const Producto = require('model/productos.js');


Producto.findAll({
    order: [
        ["precio", "ASC"]
    ]
})
    .then(productos => {
        console.log(productos)
    });




/*     Paginando resultados
Cuando devolvemos al usuario un listado, por lo general, es recomendable ir paginando esos resultados para no traer tanta información junta de la base de datos.

En este ejemplo, estamos ejecutando un findAll sobre el modelo Producto. El objetivo va a ser pasar un parámetro al método findAll para ejecutar un limit de MySQL y traer tan solo los primeros 5 productos. */



const Producto = require('model/productos.js');

Producto.findAll({
    limit: 5
}).then(productos => {
    console.log(productos)
});



/* Funciones de agregación
Sequelize nos permite iteractuar con nuestro modelos utilizando las mismas funciones de agregación que ya conocemos de MySQL, como por ejemplo: max, min, count, sum, etc.

En este caso queremos recupear de la base de datos el precio cuyo valor sea el mayor de entre todos los precios de nuestros productos.

Para ello podemos usar el método max sobre nuestro modelo Producto.

Recordá que el método max espera el nombre de la columna.

Finalmente recuperá el resultado dentro del método then y mostralo con un console log: then(mayorPrecio => {console.log(mayorPrecio)}) */


const Producto = require('model/productos.js');

Producto.max("precio")
    .then(function (mayorPrecio) {
        console.log(mayorPrecio)
    })



/*     Usando Método Count
Dado el modelo Usuario contar la cantidad total de usuarios que se encuentran en la base de datos.

Para ello será necesario utilizar el método count del modelo Usuario.

Mostrar el resultado con un console log */

const Usuario = require('model/usuarios.js');

Usuario.count()
    .then(function (resultados) {
        console.log(resultados)
    })



/* Usando método query
Usando el método query del objet sequilize ejecutá la siguiente consulta: "SELECT * FROM usuarios".

Recordá que el método query es asincrónico y devuelve una promesa.Por tanto, luego de ejecutar el méotdo query es necesario que concatenes el método then para recuperar la respuesta.Dentro del método then hace un console log del resultado devuelto.

Finalmente agrega el méotdo catch para capturar el error.Dentro de méotdo catch hace un console log del error. */

const dbConfig = require('../config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('config');

sequelize.query('SELECT * FROM usuarios')
    .then(function (resultados) {
        console.log(resultados)
    })
    .catch(function (error) {
        console.log(error)
    })



/*  Utilizando nuevamente el método query
 Tenemos nuestro productoController que se encarga de las operaciones relacionadas con los productos (listar todos, cargar productos, etc).
 
 Lo que queremos hacer es agregar la lógica para el método mostrar. Este método recibe un id del produto y debe devolver el producto cuyo id conincida en la base de datos. Finalmente usando el método send del objeto response lo debemos devolver.
 
 Para encontrar el producto en nuestra base podemos usar el método query del objeto sequilize y hacer una consulta del tipo: "SELECT * FROM productos where id = " + req.params.id.
 
 Recordá que el resultado lo debes recuperar dentro del méotdo then. Va a ser dentro de este méotdo que vas a ejecutar el código res.send() */


const dbConfig = require('../config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('config');

const mostrar = (req, res) => {
    sequelize.query("SELECT * FROM productos WHERE id = " + req.params.id)
        .then(function (resultados) {
            res.send(resultados)
        })
}


/* no hay 2 sin 3: Devuelta el método query
Dentro de peliculaController tenemos el método borrar. Este método espera un id y elimina de la base la película que coincide con el.

Para resolver el ejercicio va a ser necesario ejecutar dentro del método borrar una query del tipo: "DELETE FROM peliculas WHERE id = " + req.params.id

Para finalizar, dentro del método then envía el mensaje "Producto elimiado con éxito" y dentro del méotdo catch el mensaje "Error al eliminar el producto". */

const dbConfig = require('../config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('config');

const borrar = (req, res) => {
    sequelize.query("DELETE FROM peliculas WHERE id = " + req.params.id)
        .then(function (resultado) {
            res.send("Película elimiada con éxito")
        })
        .catch(function (error) {
            res.send("Error al eliminar el producto")
        })
}
