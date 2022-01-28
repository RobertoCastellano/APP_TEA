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
	});

	router.get('/select/:id', async (req, res) => {
		
		const result = await db('city')
			.update({
				ID_country: req.body.ID_country,
				city: req.body.city
			})
			.where("ID", req.params.id);

		res.json("SELECCIONAMOS UNA CIUDAD "+req.params.id);
		res.json({ status: true });
	});

	router.get('/list', async (req, res) => {

		const resultado = await db
			.select("*")
			.from('city')

			res.json({ status: true, data: resultado });
			
		res.json("LISTADO DE CIUDADES "+req.body.city);
	
	});

module.exports = router;