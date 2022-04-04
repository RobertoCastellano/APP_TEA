// Le podemos llamar como queramos... seguridad.js o portero.js
const db = require("./db");

// next es una función, por lo que se ejecuta así: next()
// Si se ejecuta next() sigue el workflow, es decir, se termina de ejecutar el endpoint
// Si no ejecutamos next, no pasa nada, PERO debemos de ejecutar un resp.json() o resp.send()
const authtoken = async(req, resp, next) => {

	// 1º DETECTAR SI NOS HA MANDADO EL TOKEN
		// 1.1 Si NO nos manda el token 'cerrar la conexión'
		// 1.2 Si nos manda el token, pasar al paso 2
		const token = req.headers.token;

		if(token == undefined){
			return resp.status(401).json({
				status: false,
				error: "No has mandado el token"
			});
		}

	// 2º COMPROBAR SI EL TOKEN EXISTE
		// 2.1 Si NO existe, capar la conexión y decirle que "quizás" caducó
		// 2.2 Si existe, pasamos al punto 3
		const resultado = await db.select(["ID", "token", "rols", "email", "ID_city", "gender"]).from('users').where('token', token);

		if(resultado.length == 0){
			return resp.status(401).json({
				status: false,
				error: "El token parece que está caducado"
			});
		}


	// 3º SACAMOS LOS DATOS (del usuario) DEL TOKEN
		// 3.1 Y prototipamos al "req"
		req.tokendata = resultado[0];

	// 4º NEXT!
	next();

}

module.exports = authtoken;
