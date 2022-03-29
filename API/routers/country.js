const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { read } = require('fs');
var crypto = require('crypto');
const authtoken = require('../config/authtoken');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add', async (req, res) => {

		const required = ["country"];
		
		// Comprobamos que estén todos los campos obligatorios
		const security = required.find((e)=>{
		if( req.body[e] === undefined ){ 
			return true;
		}
		})

		if( security !== undefined){
			return res.json(`Falta el campo ${security}`);
		}

		const obj = {
			country: req.body.country,
		};

		const result = await db('country').insert(obj);

		//Devolver true or false
		if( result.length > 0 ){
			//true
			return res.json({status:true, data: result[0]});
		}else{
			//false
			return res.json({status:false});
		}
	});

	router.put('/edit/:id', async (req, res) => {
		
		const result = await db('country')
			.update({
				country: req.body.country
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

	router.get('/select/:id', async (req, res) => {

		const resultado = await db
		.select(["ID","country"])
		.from('country')
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
			.select("*")
			.from('country')

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