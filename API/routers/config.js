const express = require('express');
const router = express.Router();
const db = require('../config/db');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add', async (req, res) => {

		const required = ["clave"];
	
		// Comprobamos que estén todos los campos obligatorios
		const security = required.find((e)=>{
			if( req.body[e] === undefined ){ return true; }
		})
	
		if( security !== undefined){
			return res.json(`Falta el campo ${security}`);
		}
	
		const obj = {
			clave: req.body.clave
		};
		const result = await db('config').insert(obj);
		res.json("AÑADIR "+req.body.clave);
	});

	router.put('/edit/:id', async (req, res) => {
		const result = await db('config')
		.update({
			clave: req.body.clave
		})
		.where("ID", req.params.id);
	
		res.json({ status: true });
		res.json("EDITAR "+req.params.id);
	});

	router.delete('/delete/:id', async (req, res) => {
		await db('config')
		.where('ID', req.params.id)
		.delete();
	
		res.json({status:true});
		res.json("BORRAR "+req.params.id);
	});

	router.get('/select/:id', async (req, res) => {
		const resultado = await db
		.select("*")
		.from('config')
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
		res.json("SELECCIONAR "+req.params.id);
	});
	router.get('/list', async (req, res) => {
		const resultado = await db
		.select("*")
		.from('config');
	
		res.json({
			status: true,
			data: resultado
		});
	});

module.exports = router;