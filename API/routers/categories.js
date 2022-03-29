const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authtoken = require('../config/authtoken');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

router.post('/add',[authtoken], async (req, res) => {

	if( req.tokendata.rols != "admin" ){
		return res.status(403).json({status:false, error:"No tienes permiso para añadir una categoría"});
	}

	const required = ["title"];

	const obj = {
		title: 	req.body.title
	};
	const result = await db('categories').insert(obj);

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
		return res.status(403).json({status:false, error:"No tienes permiso para añadir una categoría"});
	}

	const result = await db('categories')
	.update({
		ID: req.body.ID,
		title: req.body.title
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
		return res.status(403).json({status:false, error:"No tienes permiso para añadir una categoría"});
	}
	
	const result = await db('categories')
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

	const resultado = await db
	.select(["ID","title"])
	.from('categories')
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
	.select("ID","title")
	.from('categories');

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