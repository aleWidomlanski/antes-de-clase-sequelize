/* Creando un usuario
Imaginemos que tenemos un modelo de Sequelize llamado Usuario. Este modelo posee tres atributos: nombre, email, password, todos ellos del tipo string.

Lo que debemos hacer es, a partir de este modelo, insertar en la base de datos un usuario indicando un valor para cada atributo.

Para poder resolver esto, recordemos que debemos usar el método create de tu modelo. */

const Usuario = require('model/usuario.js');

Usuario.create({
  nombre: 'Alejandro',
  email: 'alejandro@gmail.com',
  password: 'contraseña',
});

/* Creando usuarios
En determinadas situaciones necesitamos subir más de un registro a la base de datos. Si bien podemos usar el método create varias veces, Sequelize nos facilita esta tarea con el método bulkCreate. Este método recibe un array, en donde cada posición es un objeto con las mismas características del objeto que recibe el método create. Es decir, el método bulkCreate es como el método create, pero con la ventaja que permite insertar varios registros de una sola vez.

En este ejemplo, tenemos el modelo Pelicula. Nuestro objetivo es insertar dos películas usando el método bulkCreate. Cada película a insertar tiene que tener un título y un género.

IMPORTANTE: Para los nombres de los atributos usar "titulo" y "genero" sin tilde. */

const Pelicula = require('model/pelicula.js');

Pelicula.bulkCreate([
  {
    titulo: 'Duplex',
    genero: 'Comedio',
  },
  {
    titulo: 'Volver al Futuro',
    genero: 'Ciencia Ficción',
  },
]);

/* Productos Web
En este ejemplo tenemos el controlador productoController que tiene el método create. A su vez, hay un formulario que tiene los campos nombre y precio y que envía esos datos a nuestro controller, mediante un request del tipo POST.

La idea del ejercicio es poder recuperar ambos campos y, usando el modelo Producto, insertarlos en nuestra base.

Para ello va a ser necesario usar el método create del modelo Producto. Como parámetro del método debemos pasar un JSON con los atributos nombre y precio. El valor para estos atributos los vamos a tener que recuperar a partir del request. */

Producto.create({
  nombre: req.body.nombre,
  precio: req.body.precio,
});

/* Actualizando el precio
Tenemos en nuestra base un producto cuyo id es igual a 1. Nuestro objetivo es actualizar el precio con el valor 1234.

Para esto vamos a utilizar el método update de nuestro modelo Producto. El método update recibe dos parámetros: el primero es un JSON en donde cada atributo es un nombre de columna y cada valor es aquel que queremos guardar en nuestra base, el segundo parámetro es un JSON con una query para identificar qué registros se deben actualizar. */

const Producto = require('model/producto.js');
const { canTreatArrayAsAnd } = require('sequelize/types/lib/utils');

Producto.update(
  {
    precio: 1234,
  },
  {
    where: {
      id: 1,
    },
  }
);

/* Actualizando Serie
En determinadas circunstancias podemos usar el método update para actualizar más de un registro.

En este ejemplo, queremos cambiar el valor de la columna "genero" de todas aquellas series cuyo género sea igual a "comedia" y reeplazarlo por el valor "sitcom".

Para el segundo parámetro del método update debemos hacer un where por la columna "genero". */

Serie.update(
  {
    genero: {
      género: 'sitcom',
    },
  },
  {
    where: {
      genero: 'comedia',
    },
  }
);

/* Actualizando Usuario
Para algunos casos vamos a necesitar actualizar un registro en la base o crearlo en caso que no exista.Para estos casos podemos usar el método upsert de Sequelize.

En este ejemplo, vamos a actualizar un registro de usuario.Vamos a pasar como valores para el upsert el email y la edad.Si el usuario ya existe, debemos actualizar la edad, caso contrario debemos insertar el usuario(con email y edad) en la base.

Recordemos que para usar el upsert debemos pasar al menos un atribuoto que sea único(en este caso el email), para así poder identificar el registro en la base.

 */

const Usuario = require('model/usuario.js');

if (Usuario != undefined) {
  Usuario.upsert(
    {
      email: 'juanito@gmail.com',
      edad: 25,
    },
    {
      where: {
        email: 'juanito@gmail.com',
      },
    }
  );
} else {
  Usuario.upsert({
    email: 'juanito@gmail.com',
    edad: 25,
  });
}

/* Eliminar Película
De la misma manera que insertamos y actualizamos datos en nuestra base, Sequelize también nos permite eliminar registros. Para esta tarea nos provee el método destroy, que lo podemos ejecutar sobre cualquiera de nuestros modelos. Este método espera como parámetro un JSON con una query del tipo where para identificar la fila a eliminar.

El objetivo de este ejercicio es eliminar la película con id igual a 3. */

const Pelicula = require('model/pelicula.js');

Pelicula.destroy({
  where: {
    id: 3,
  },
})
  .then(function (resultado) {
    console.log(resultado);
  })
  .catch(function (error) {
    console.log(error);
  });

/*   Eliminar Usuario
De igual forma que se puede eliminar un registro por su id, se puede hacer lo mismo por alguna otra columna que identifique al elemento unívocamente.

En este ejercicio, vamos a borrar un usuario en función de su email. El objetivo es eliminar al usuario cuyo email sea igual a "kenny@south-park.com".

Para ello vamos a utilizar el método destroy del modelo Usuario, pasando como parámetro una query que haga un where por email. */

const Usuario = require('model/usuario.js');

Usuario.destroy({
  where: {
    email: 'kenny@south-park.com',
  },
})
  .then(function (resultado) {
    console.log(resultado);
  })
  .catch(function (error) {
    console.log(error);
  });

/*   Eliminar Varios Usuarios
El método destroy permite, al igual que el select, pasar otros operados a la query. En vez de utilizar una comparación por el operador igual (la comparación por defecto) podemos usar un like.

En este ejemplo, vamos a eliminar a todos los usuarios cuyo proveedor de correo sea aol.com. Es decir, aquellos cuyo email termine en @aol.com.

Para ello vamos a ejecutar el método destroy del modelo Usuario. Dentro del where (en el método destroy), vamos a pasar un JSON con el nombre de la columna y cuyo valor sea un nuevo JSON con la siguiente sintaxis: email: { [Op.like]: '%aol.com'} */

const Sequelize = require('sequelize');
const Usuario = require('model/usuario.js');
const Op = Sequelize.Op;

Usuario.destroy({
  where: {
    email: {
      [Op.like]: '%aol.com',
    },
  },
})
  .then(function (resultado) {
    console.log(resultado);
  })
  .catch(function (error) {
    console.log(error);
  });


/* 
  Genero
Imaginemos que ya tenemos creado un modelo para género y ahora queremos crear uno para película.

El objetivo va a ser indicar la relación que hay entre una película y un género en el modelo Pelicula. Es decir, una película pertenece a (belongsTo) un género.

Para setear esto va a ser necesario, luego de la declaración del modelo Pelicula, llamar al método belongsTo pasando como primer parámetro el modelo Genero. El segundo parámetro del método belongsTo va a ser un JSON con la configuración para el foreignKey y el as (alias del nombre de la relación). En nuestro caso, el foreignKey va a ser la columna llamada "genero_id" y vamos a indicar como alias "genero". */


const Sequelize = require('sequelize');
const sequelize = require('../database');
const Genero = require('model/genero.js');

const Pelicula = sequelize.define('peliculas', {
  titulo: Sequelize.STRING,
  genero_id: Sequelize.INTEGER,
});


const Sequelize = require('sequelize');
const sequelize = require('../database');
const Genero = require('model/genero.js');

const Pelicula = sequelize.define('peliculas', {
  titulo: Sequelize.STRING,
  genero_id: Sequelize.INTEGER,
});



Pelicula.belongsTo(Genero,
  {
    foreignKey: "genero_id",
    as: "genero"
  })


module.exports = Pelicula;


/* 
Generos
Para este ejercicio nuestra meta va a ser, luego de la definición del modelo de Genero, vincular a este con el modelo Pelicula.

En este caso, un género tiene muchas (has many) películas. Para indicar esto vamos a emplear el método hasMany del modelo Genero.

Para la configuración de la relación el foreignKey va a ser la columna llamada "genero_id" y vamos a indicar como alias "peliculas". */


const Sequelize = require('sequelize');
const sequelize = require('../database');
const Pelicula = require('model/pelicula.js');

const Genero = sequelize.define('generos', {
  nombre: Sequelize.STRING,
});

Genero.hasMany(Pelicula,
  {
    foreignKey: "genero_id",
    as: "peliculas"
  })

module.exports = Genero;



/* Buscar Género
En este ejemplo, tenemos el modelo Pelicula que tiene creada una relación con el modelo Genero.

Nosotros vamos a traer la película con id 1 usando el método findByPk. Pero también es necesario obtener el género relacionado a la película.

Para lograr esto debemos pasar, como segundo parámetro del método findByPk, un JSON que tenga el atributo include. Este atributo va a ser un array con el listado de todas las relaciones que queremos traer asociadas a la película, en nuestro caso, únicamente la relación "genero".

Finalmente vamos a imprimer dentro del método then un console log que nos nuestre el nombre del género: pelicula.genero.nombre */



const Pelicula = require('model/pelicula.js');

Pelicula.findByPk(1, {
  include: ["genero"]
})
  .then(function (pelicula) {
    console.log(pelicula.genero.nombre)
  })



/* Creador
Tener creadas relaciones entre objetos nos permite también, a la hora de crear un nuevo registro en la base, crear tanto el objeto principal como su relación.

En este caso tenemos un modelo Producto que le pertenece a un usuario (el creador).

Nuestro objetivo va a ser crear un producto cuyo nombre sea "Falcon 9" y crear en el mismo método un usuario asociado a ese producto, que tenga como nombre "Elon" y como apellido "Musk".

Para lograr esto debemos usar el método create del modelo Producto. El primer parámetro de este método va a ser un JSON con las columnas a insertar en la table producto (nombre) y a su vez, un atributo con el nombre de la relación y las columnas a insertar en dicha relación. Para nuestro caso el nombre de la relación es "creador" y las columnas a insertar son nombre y apellido.

Por úlitmo, el método create va recibir como segundo parámetro un JSON con el atributo include que va a tener como valor la constante Creador. */



const Sequelize = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('usuarios', {
  nombre: Sequelize.STRING,
  apellido: Sequelize.STRING,
});

const Producto = sequelize.define('productos', {
  nombre: Sequelize.STRING,
  usuario_id: Sequelize.INTEGER,
});

const Creador = Producto.belongsTo(Usuario, { as: 'creador' });


Producto.create({
  nombre: "Falcon 9",
  creador: {
    nombre: 'Elon',
    apellido: 'Musk'
  }
}, {
  include: [Creador]
})


/*
Peliculas Actor
En MySQL a la hora de indicar relaciones de muchos a muchos es necesario crear una tabla pivot. Algo similar sucede con sequelize. Para poder relacionar dos modelos a través de la relación belongsToMany primero debemos crear un modelo "pivot".

En este ejemplo queremos relacionar los modelos pelicula y actor. Para ello vamos a crear el modelo PeliculaActor. Como en la creación de todo modelo el primer parámetro es el nombre de la tabla, en este caso: "pelicula_actor". Como segundo parámetro pasamos un JSON las columnas y sus propiedades. Al ser la representación de una tabla pivot va a tener dos columnas "pelicula_id" y "actor_id".

Además de indicar que cada una de estas columnas es un entero debemos setear el parámetro references indicando los atributos model y key. Model va ser con que modelo se relaciona y key a que columna apunta.

Para la columna pelicula_id el model será "Pelicula" y la key "id". Mientras que para la columna actor_id el model será "Actor" y la key "id".

Manos a la obra. */


const Sequelize = require('sequelize');
const sequelize = require('../database'); 
const Actor = require('model/actor.js');
const Pelicula = require('model/pelicula.js');

const PeliculaActor = sequelize.define('pelicula_actor',{
    pelicula_id: {
    	type: Sequelize.INTEGER,
    	references: {
    		model: 'Pelicula',
    		key: 'id'
    	}
    },
    actor_id: {
    	type: Sequelize.INTEGER,
    	references: {
    		model: 'Actor',
    		key: 'id'
    	}
    }
});






/* Relaciones Pivot
Luego de creado el modelo pivot debemos hacer una relación del tipo belongsTo con cada uno de los modelos que se relaciones.

En nuestro ejemplo necesitaríamos agregar un belongsTo con Pelicula y otro con Actor. Como en todos los belongsTo el primer parámetro va a ser el nombre del modelo y el segundo un JSON indicando el foreignKey (no es necesario setear el "as"). */


const Sequelize = require('sequelize');
const sequelize = require('../database'); 
const Actor = require('model/actor.js');
const Pelicula = require('model/pelicula.js');

const PeliculaActor = sequelize.define('pelicula_actor',{
    pelicula_id: {
    	type: Sequelize.INTEGER,
    	references: {
    		model: 'Pelicula',
    		key: 'id'
    	}
    },
    actor_id: {
    	type: Sequelize.INTEGER,
    	references: {
    		model: 'Actor',
    		key: 'id'
    	}
    }
});

	PeliculaActor.belongsTo(Actor, {
    foreignKey: "actor_id"
})

PeliculaActor.belongsTo(Pelicula, { 
    foreignKey: "pelicula_id"
})


module.exports = PeliculaActor;



/* Peliculas Actor toma 3
El objetivo de este ejercicio es relacionar el modelo Pelicula con Actor a través de una relación de muchos a muchos.

Para indicar esto vamos a emplear el método belongsToMany del modelo Pelicula.

Para la configuración de la relación el foreignKey va a ser la columna llamada "pelicula_id", el alias "actores" y el through va a ser el modelo "PeliculaActor". */


const Sequelize = require('sequelize');
const sequelize = require('../database'); 
const Actor = require('model/actor.js');

const Pelicula = sequelize.define('peliculas',{
  titulo: Sequelize.STRING,
  genero_id: Sequelize.INTEGER,
});


Pelicula.belongsToMany(Actor, {
  through: "PeliculaActor",
  foreignKey: "pelicula_id",
  as: "actores"
})



/* Buscando Actores
En este ejemplo tenemos el modelo Pelicula que tiene una relación de muchos a muchos con Actor.

Nosotros queremos traer toda la información de la película con id junto los actores que tiene asociados.

Para lograr esto debemos pasar como segundo parámetro del método findByPk un JSON que tenga el atributo include. Este atributo include, va a ser una array con el listado de todas las relaciones que queremos traer asociadas a la película, en nuestro caso, únicamente la relación "actores".

Finalmente vamos a imprimer dentro del método then un console log que nos nuestre los actores de la pelicula: pelicula.actores.

Dado que la relación es de muchos a muchos el atributo actores será del tipo array. */


const Pelicula = require('model/pelicula.js');

Pelicula.findByPk(1, {
  include: ["actores"]
})
.then(function (pelicula) {
  console.log(pelicula.actores)
})


/* Agregando Actores
Al crear la relación del tipo belongsToMany entre Pelicula y Actor sequelize nos provee los métodos setActores, que nos permite vincular una películas con uno o varios actores.

En este ejemplo ya contamos con una instancia de pelicula. Lo que vamos a hacer en a la instancia de pelicula ejecutar el método setActores pasando como parámetro un array con los ids de los actores que queremos vincular. Esto va a generar automáticamente los registros en la tabla pivot.

Vincular los actores 3, 5 y 8 */

const Pelicula = require('model/pelicula.js');

Pelicula.findByPk(1).then(pelicula => {
	pelicula.setActores([3,5,8])
})
