const express = require('express');
const router = express.Router();
const db = require('../config/db');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add', async (req, res) => {

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
		res.json("AÑADIMOS ELEMENTO AL MENÚ "+req.body.html);
	});

	router.put('/edit/:id', async (req, res) => {
		const result = await db('menu')
		.update({
			html: req.body.html
		})
		.where("ID", req.params.id);
	
		res.json({ status: true });
		res.json("EDITAMOS MENÚ "+req.params.id);
	});

	router.delete('/delete/:id', async (req, res) => {
		await db('menu')
		.where('ID', req.params.id)
		.delete();
	
		res.json({status:true});
		res.json("BORRAMOS MENÚ "+req.params.id);
	});

	router.get('/select/:id', async (req, res) => {
		const resultado = await db
		.select("*")
		.from('menu')
		.where("ID", req.params.id);
	
		if(resultado.length === 0){
			res.status(400).json({
				status: false,
				error: "No existe el ID indicado"
			})
		}else{
			res.json({
				status: true,
				data: resultado[0]
			});
		}
		res.json("SELECCIONAMOS ELEMENTO DEL MENÚ "+req.params.id);
	});

	router.get('/list', async (req, res) => {
		const resultado = await db
		.select("*")
		.from('menu');

		res.json({
			status: true,
			data: resultado
		});
		
		res.json("SELECCIONAMOS VARIOS ELEMENTOS DEL MENÚ "+req.params.id);
	});

module.exports = router;