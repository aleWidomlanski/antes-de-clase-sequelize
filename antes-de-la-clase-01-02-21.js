/* Creando un usuario
Imaginemos que tenemos un modelo de Sequelize llamado Usuario. Este modelo posee tres atributos: nombre, email, password, todos ellos del tipo string.

Lo que debemos hacer es, a partir de este modelo, insertar en la base de datos un usuario indicando un valor para cada atributo.

Para poder resolver esto, recordemos que debemos usar el método create de tu modelo. */

const Usuario = require('model/usuario.js');

Usuario.create({
    nombre: "Alejandro",
    email: "alejandro@gmail.com",
    password: "contraseña"
})


/* Creando usuarios
En determinadas situaciones necesitamos subir más de un registro a la base de datos. Si bien podemos usar el método create varias veces, Sequelize nos facilita esta tarea con el método bulkCreate. Este método recibe un array, en donde cada posición es un objeto con las mismas características del objeto que recibe el método create. Es decir, el método bulkCreate es como el método create, pero con la ventaja que permite insertar varios registros de una sola vez.

En este ejemplo, tenemos el modelo Pelicula. Nuestro objetivo es insertar dos películas usando el método bulkCreate. Cada película a insertar tiene que tener un título y un género.

IMPORTANTE: Para los nombres de los atributos usar "titulo" y "genero" sin tilde. */


const Pelicula = require('model/pelicula.js');

Pelicula.bulkCreate([
    {
        titulo: "Duplex",
        genero: "Comedio"
    },
    {
        titulo: "Volver al Futuro",
        genero: "Ciencia Ficción"
    }
])


/* Productos Web
En este ejemplo tenemos el controlador productoController que tiene el método create. A su vez, hay un formulario que tiene los campos nombre y precio y que envía esos datos a nuestro controller, mediante un request del tipo POST.

La idea del ejercicio es poder recuperar ambos campos y, usando el modelo Producto, insertarlos en nuestra base.

Para ello va a ser necesario usar el método create del modelo Producto. Como parámetro del método debemos pasar un JSON con los atributos nombre y precio. El valor para estos atributos los vamos a tener que recuperar a partir del request. */


Producto.create(
    {
        nombre: req.body.nombre,
        precio: req.body.precio
    }
)



/* Actualizando el precio
Tenemos en nuestra base un producto cuyo id es igual a 1. Nuestro objetivo es actualizar el precio con el valor 1234.

Para esto vamos a utilizar el método update de nuestro modelo Producto. El método update recibe dos parámetros: el primero es un JSON en donde cada atributo es un nombre de columna y cada valor es aquel que queremos guardar en nuestra base, el segundo parámetro es un JSON con una query para identificar qué registros se deben actualizar. */


const Producto = require('model/producto.js');
const { canTreatArrayAsAnd } = require('sequelize/types/lib/utils');

Producto.update(
    {
        precio: 1234
    }, {
    where: {
        id: 1
    }
})



/* Actualizando Serie
En determinadas circunstancias podemos usar el método update para actualizar más de un registro.

En este ejemplo, queremos cambiar el valor de la columna "genero" de todas aquellas series cuyo género sea igual a "comedia" y reeplazarlo por el valor "sitcom".

Para el segundo parámetro del método update debemos hacer un where por la columna "genero". */

Serie.update(
    {
        genero: {
            género: "sitcom"
        }
    },
    {
        where: {
            genero: "comedia"
        }
    }
)


Actualizando Usuario
Para algunos casos vamos a necesitar actualizar un registro en la base o crearlo en caso que no exista.Para estos casos podemos usar el método upsert de Sequelize.

En este ejemplo, vamos a actualizar un registro de usuario.Vamos a pasar como valores para el upsert el email y la edad.Si el usuario ya existe, debemos actualizar la edad, caso contrario debemos insertar el usuario(con email y edad) en la base.

Recordemos que para usar el upsert debemos pasar al menos un atribuoto que sea único(en este caso el email), para así poder identificar el registro en la base.

