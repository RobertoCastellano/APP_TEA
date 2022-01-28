const express = require('express');
const router = express.Router();
const db = require('../config/db');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

router.post('/add', async (req, res) => {

	const required = ["ID_user","title"];
	
	// Comprobamos que estén todos los campos obligatorios
	const security = required.find((e)=>{
		if( req.body[e] === undefined ){ return true; }
	})

	if( security !== undefined){
		return res.json(`Falta el campo ${security}`);
	}

	const obj = {
		ID_user: req.body.ID_user,
		title: req.body.title
	};
	const result = await db('pages').insert(obj);
	res.json("AÑADIMOS PÁGINA "+req.body.title);
});

router.put('/edit/:id',async (req, res) => {

	const result = await db('pages')
	.update({
		title: req.body.title
	})
	.where("ID", req.params.id);

	res.json({ status: true });
	res.json("EDITAMOS PÁGINA "+req.params.id);
});

router.delete('/delete/:id', async (req, res) => {
	
	await db('pages')
	.where('ID', req.params.id)
	.delete();

	res.json({status:true});
	res.json("BORRAMOS PÁGINA "+req.params.id);
});

router.get('/select/:id', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('pages')
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
	res.json("SELECCIONAMOS PÁGINA "+req.params.id);
});

router.get('/list', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('pages');

	res.json({
		status: true,
		data: resultado
	});
	res.json("SELECCIONAMOS PÁGINAS "+req.params.id);
});

module.exports = router;