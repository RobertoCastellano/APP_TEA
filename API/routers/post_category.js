const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authtoken = require('../config/authtoken');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

router.post('/add',[authtoken], async (req, res) => {

	if( req.tokendata.rols != "admin" ){
		return res.status(403).json({status:false, error:"No tienes permiso para añadir una categoría al post"});
	}

	const required = ["ID_post","ID_category"];

	const obj = {
		ID_post: 		req.body.ID_post,
		ID_category: 	req.body.ID_category
	};
	const result = await db('post_category').insert(obj);

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
		return res.status(403).json({status:false, error:"No tienes permiso para editar una categoría al post"});
	}

	const result = await db('post_category')
	.update({
		ID_post: 		req.body.ID_post,
		ID_category: 	req.body.ID_category
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

router.delete('/delete/:id_post/:id_category',[authtoken], async (req, res) => {

	if( req.tokendata.rols != "admin" ){
		return res.status(403).json({status:false, error:"No tienes permiso para eliminar una categoría del post"});
	}
	
	const result = await db('post_category')
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

router.get('/select/:id_post', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('post_category')
	.where("ID_post", req.params.id_post);

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
	.select("*")
	.from('post_category');

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