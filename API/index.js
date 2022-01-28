const express = require('express');
const app = express();
const port = 3000;

// Aceptamos recibir el body con JSON
	app.use(express.json());

// Añadimos las rutas
	const users 	 		= 	require('./routers/users');
	const country 	 		= 	require('./routers/country');
	const city 		 		= 	require('./routers/city');
	const pages 	 		= 	require('./routers/pages');
	const post 	 			= 	require('./routers/post');
	const categories 		= 	require('./routers/categories');
	const post_category		=	require('./routers/post_category');
	const leads 	 		= 	require('./routers/leads');
	const menu 				= 	require('./routers/menu');
	const config 			= 	require('./routers/config');

	app.use ('/users', users);
	app.use ('/country', country);
	app.use ('/city', city);
	app.use ('/pages', pages);
	app.use ('/post', post);
	app.use ('/categories', categories);
	app.use ('/post_category', post_category);
	app.use ('/leads', leads);
	app.use ('/menu', menu);
	app.use ('/config', config);



app.listen(port, ()=>{
	console.log("Acabamos de conectarnos");
})