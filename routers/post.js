const express = require('express');
const authtoken = require('../config/authtoken');
const router = express.Router();
const db = require('../config/db');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

router.post('/add',[authtoken], async (req, res) => {

	if( req.tokendata.rols != "admin" ){
		return res.status(403).json({status:false, error:"No tienes permiso para añadir un post"});
	}

	const required = ["title","add_content","author"];
	
	// Comprobamos que estén todos los campos obligatorios
	const security = required.find((e)=>{
		if( req.body[e] === undefined ){ return true; }
	})

	if( security !== undefined){
		return res.json(`Falta el campo ${security}`);
	}

	const obj = {
		title: req.body.title,
		author: req.body.author,
		add_content: req.body.add_content
	};
	const result = await db('post').insert(obj);
	//res.json("AÑADIMOS POST "+req.body.title);

	//Devolver true or false
	if( result.length > 0 ){
		//true
		return res.json({status:true, data: result[0]});
	}else{
		//false
		return res.json({status:false});
	}
	
});

router.put('/edit/:id',[authtoken], async (req, res) => {

	if( req.tokendata.rols != "admin" ){
		return res.status(403).json({status:false, error:"No tienes permiso para editar un post"});
	}

	const result = await db('post')
	.update({
		title: req.body.title,
		author: req.body.author,
		add_content: req.body.add_content
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

router.delete('/delete/:id',[authtoken], async (req, res) => {

	if( req.tokendata.rols != "admin" ){
		return res.status(403).json({status:false, error:"No tienes permiso para eliminar un post"});
	}
	
	const result = await db('post')
	.where('ID', req.params.id)
	.delete();

	//Devolver true or false
	if( result.length > 0 ){
		//true
		return res.json({status:true, data: result[0]});
	}else{
		//false
		return res.json({status:false});
	};

});

router.get('/select/:id', async (req, res) => {

	const resultado = await db
	.select("ID","title","author","add_content")
	.from('post')
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

	if(req?.query?.limit){
		var resultado = await db.select("*").from('post').limit(req.query.limit).orderBy('ID', 'desc');
	}else{
		var resultado = await db.select("*").from('post').orderBy('ID', 'desc');
	}

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