const express = require('express');
const router = express.Router();
const db = require('../config/db');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

router.post('/add', async (req, res) => {

	const required = ["title"];

	const obj = {
		title: 	req.body.title
	};
	const result = await db('categories').insert(obj);
	res.json("AÑADIMOS CATEGORÍA "+req.body.id);
});

router.put('/edit/:id',async (req, res) => {

	const result = await db('categories')
	.update({
		ID: req.body.ID,
		title: req.body.title
	})
	.where("ID", req.params.id);

	res.json({ status: true });
	res.json("EDITAMOS CATEGORÍA "+req.params.id);
});

router.delete('/delete/:id', async (req, res) => {
	
	await db('categories')
	.where('ID', req.params.id)
	.delete();

	res.json({status:true});
	res.json("BORRAMOS CATEGORÍA "+req.params.id);
});

router.get('/select/:id', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('categories')
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
	res.json("SELECCIONAMOS CATEGORÍA "+req.params.id);
});

router.get('/list', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('categories');

	res.json({
		status: true,
		data: resultado
	});
	res.json("SELECCIONAMOS CATEGORÍAS "+req.params.id);
});

module.exports = router;