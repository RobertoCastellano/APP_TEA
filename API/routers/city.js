const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { read } = require('fs');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add', async (req, res) => {

		const required = ["ID_country","city"];
		
		// Comprobamos que estén todos los campos obligatorios
		const security = required.find((e)=>{
			if( req.body[e] === undefined ){ return true; }
		})
	
			if( security !== undefined){
				return res.json(`Falta el campo ${security}`);
		}

		const obj = {
			ID_country: req.body.ID_country,
			city: req.body.city
		};

		const result = await db('city').insert(obj);

		res.json("AÑADIMOS UNA CIUDAD "+req.body.city);

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
		
		const result = await db('city')
			.update({
				ID_country: req.body.ID_country,
				city: req.body.city
			})
			.where("ID", req.params.id);

		res.json("EDITAMOS UNA CIUDAD "+req.params.id);
		res.json({ status: true });

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
		.select(["ID","city"])
		.from('city')
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
			.select("city")
			.from('city')

		//res.json({ status: true, data: resultado });
			
		//res.json("LISTADO DE CIUDADES "+req.body.city);

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