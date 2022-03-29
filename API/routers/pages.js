const express = require('express');
const router = express.Router();
const db = require('../config/db');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

router.post('/add', async (req, res) => {

	const required = ["ID_user","title","content"];
	
	// Comprobamos que estén todos los campos obligatorios
	const security = required.find((e)=>{
		if( req.body[e] === undefined ){ return true; }
	})

		if( security !== undefined){
			return res.json(`Falta el campo ${security}`);
	}

	const obj = {
		ID_user:	req.body.ID_user,
		title:		req.body.title,
		content:	req.body.content
	};
	const result = await db('pages').insert(obj);
	//res.json("AÑADIMOS PÁGINA "+req.body.title);

	//Devolver true or false
	if( result.length > 0 ){
		//true
		return res.json({status:true, data: result[0]});
	}else{
		//false
		return res.json({status:false});
	}
});

router.put('/edit/:id',async (req, res) => {

	const result = await db('pages')
	.update({
		title: req.body.title,
		content: req.body.content
	})
	.where("ID", req.params.id);

	//Devolver true or false
	if( result.length > 0 ){
		//true
		return res.json({status:true, data: result[0]});
	}else{
		//false
		return res.json({status:false});
	}
});

router.delete('/delete/:id', async (req, res) => {
	
	const result = await db('pages')
	.where('ID', req.params.id)
	.delete();

	//Devolver true or false
	if( result.length > 0 ){
		//true
		return res.json({status:true, data: result[0]});
	}else{
		//false
		return res.json({status:false});
	}

});

router.get('/select/:id', async (req, res) => {

	var resultado = await db.select("title","content")
	.from('pages')
	.where("ID", req.params.id);

	//Devolver true or false
	if( resultado.length > 0 ){
		//true
		return res.json({status:true, data: resultado[0]});
	}else{
		//false
		return res.json({status:false});
	}
});

router.get('/list', async (req, res) => {

	const resultado = await db
	.select("ID","title","content")
	.from('pages');

	//res.json("SELECCIONAMOS PÁGINAS "+req.params.id);

	//Devolver true or false
	if( resultado.length > 0 ){
		//true
		return res.json({status:true, data: resultado});
	}else{
		//false
		return res.json({status:false});
	}
});

module.exports = router;