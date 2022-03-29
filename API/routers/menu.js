const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authtoken = require('../config/authtoken');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add',[authtoken], async (req, res) => {

		if( req.tokendata.rols != "admin" ){
			return res.status(403).json({status:false, error:"No tienes permiso para añadir un menú"});
		}

		const required = ["html"];
	
		// Comprobamos que estén todos los campos obligatorios
		const security = required.find((e)=>{
			if( req.body[e] === undefined ){ return true; }
		})
	
			if( security !== undefined){
				return res.json(`Falta el campo ${security}`);
		}
	
		const obj = {
			html: req.body.html
		};
		const result = await db('menu').insert(obj);

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
			return res.status(403).json({status:false, error:"No tienes permiso para editar el menú"});
		}

		const result = await db('menu')
		.update({
			html: req.body.html
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
			return res.status(403).json({status:false, error:"No tienes permiso para eliminar un menú"});
		}

		const result = await db('menu')
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
		.select("html")
		.from('menu')
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
		.select("html")
		.from('menu');
		
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