const express = require('express');
const router = express.Router();
const db = require('../config/db');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

router.post('/add', async (req, res) => {

	const required = ["ID_post","ID_category"];

	const obj = {
		ID_post: 		req.body.ID_post,
		ID_category: 	req.body.ID_category
	};
	const result = await db('post_category').insert(obj);

	res.json("AÑADIMOS CATEGORÍA DEL POST "+req.body.ID_post);
});

router.put('/edit/:id',async (req, res) => {

	const result = await db('post_category')
	.update({
		ID_post: 		req.body.ID_post,
		ID_category: 	req.body.ID_category
	})
	.where("ID", req.params.id);

	res.json({ status: true });
	res.json("EDITAMOS CATEGORÍA DEL POST "+req.params.id);
});

router.delete('/delete/:id', async (req, res) => {
	
	await db('post_category')
	.where('ID', req.params.id)
	.delete();

	res.json({status:true});
	res.json("BORRAMOS CATEGORÍA DEL POST "+req.params.id);
});

router.get('/select/:id', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('post_category')
	.where("ID", req.params.id);

	if(resultado.length === 0){
		res.status(400).json({
			status: false,
			error: "No existe el ID indicado"
		})
	}else{
		res.json({
			status: true,
			data: resultado[0]
		});
	}
	res.json("SELECCIONAMOS CATEGORÍA DEL POST "+req.params.id);
});

router.get('/list', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('post_category');

	res.json({
		status: true,
		data: resultado
	});
	res.json("SELECCIONAMOS CATEGORÍAS DE LOS POST "+req.params.id);
});

module.exports = router;