const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { read } = require('fs');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add', async (req, res) => {

		const required = ["country"];
		
		// Comprobamos que estén todos los campos obligatorios
		const security = required.find((e)=>{
		if( req.body[e] === undefined ){ return true; }
		})

		if( security !== undefined){
		return res.json(`Falta el campo ${security}`);
		}

		const obj = {
			country: req.body.country
		};

		const result = await db('country').insert(obj);

		res.json("AÑADIMOS UN PAÍS "+req.body.country);
	});

	router.put('/edit/:id', async (req, res) => {
		
		const result = await db('country')
			.update({
				country: req.body.country
			})
			.where("ID", req.params.id);

		res.json("EDITAMOS UN PAÍS "+req.params.id);
		res.json({ status: true });
	});

	router.get('/list', async (req, res) => {

		const resultado = await db
			.select("*")
			.from('country')

			res.json({ status: true, data: resultado });
		
		res.json("SELECCIONAMOS UN PAÍS "+req.params.id);

	});

module.exports = router;