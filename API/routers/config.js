const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authtoken = require('../config/authtoken');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add',[authtoken], async (req, res) => {

		if( req.tokendata.rols != "admin" ){
			return res.status(403).json({status:false, error:"No tienes permiso para configurar"});
		}

		const required = ["clave"];
	
		// Comprobamos que estén todos los campos obligatorios
		const security = required.find((e)=>{
			if( req.body[e] === undefined ){ return true; }
		})
	
			if( security !== undefined){
				return res.json(`Falta el campo ${security}`);
		}
	
		const obj = {
			clave: req.body.clave,
			content: req.body.content
		};
		const result = await db('config').insert(obj);

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
			return res.status(403).json({status:false, error:"No tienes permiso para editar la configuración"});
		}

		const result = await db('config')
		.update({
			clave: req.body.clave,
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

	router.delete('/delete/:id',[authtoken], async (req, res) => {

		if( req.tokendata.rols != "admin" ){
			return res.status(403).json({status:false, error:"No tienes permiso para eliminar la configuración"});
		}

		const result = await db('config')
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
		.select(["clave","content"])
		.from('config')
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
		.select(["clave","content"])
		.from('config');
	
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