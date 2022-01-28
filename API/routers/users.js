const express = require('express');
const router = express.Router();
const db = require('../config/db');
var crypto = require('crypto');
const { read } = require('fs');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add', async (req, res) => {

		const required = ["password", "rols", "email", "university_degree", "experience", "ID_city", "gender", "birthday"];

		// Comprobamos que estén todos los campos obligatorios
			const security = required.find((e)=>{
				if( req.body[e] === undefined ){ return true; }
			})

			if( security !== undefined){
				return res.json(`Falta el campo ${security}`);
			}

		var sha1 = crypto.createHash('sha1').update(req.body.password).digest('hex');

		const obj = {
			password:	sha1,
			rols: 		req.body.rols,
			email:		req.body.email,
			phone:		req.body.phone,
			university_degree: req.body.university_degree,
			experience:	req.body.experience,
			ID_city:	req.body.ID_city,
			gender:		req.body.gender,
			birthday:	req.body.birthday
		};

		const result = await db('users').insert(obj);

		console.log("RESULT", result);
		res.json(`Se acaba de añadir a ${result[0]}`);

		//res.json("Se acaba de añadir " +req.body.nombre);
	});


	router.get('/get/:id', async (req, res) => {

		const resultado = await db
			.select("*")
			.from('users')
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
	});


	router.get('/list/', async (req, res) => {

		const resultado = await db
			.select("*")
			.from('users');

			res.json({
				status: true,
				data: resultado
			});
	});

	router.put('/edit/:id', async (req, res) => {
		

		const result = await db('users')
			.update({
				email: req.body.email,
				phone: req.body.phone,
				university_degree: req.body.university_degree,
				experience: req.body.experience
			})
			.where("ID", req.params.id);

		res.json({ status: true });
	});

	router.delete('/delete/:id', async (req, res) => {

		await db('users')
			.where('ID', req.params.id)
			.delete();

		res.json({status:true});
	});

	// LOGIN
	router.post('/login', async (req, res) => {

		var sha1 = crypto.createHash('sha1').update(req.body.password).digest('hex');

		const resultado = await db
			.select("*")
			.from('users')
			.where("email", req.body.user)
			.where("password", sha1);

		if( resultado.length > 0 ){
			//true
			return res.json({status:true, data: resultado[0]});
		}else{
			//false
			return res.json({status:false});
		}

	});

	// CHANGE PASSWORD
	router.put('/change_password', async (req, res) => {

		var sha1 = crypto.createHash('sha1').update(req.body.password).digest('hex');

		const resultado = await db
		.select("*")
		.from('users')
		.where("password", sha1);

		if( resultado.length > 0 ){
			//true
			return res.json({status:true, data: resultado[0]});
		}else{
			//false
			return res.json({status:false});
		}
	});

	// RECOVERY PASSWORD
	router.get('/recovery_password', async (req, res) => {

		var sha1 = crypto.createHash('sha1').update(req.body.password).digest('hex');

		const resultado = await db
		.select("*")
		.from('users')
		.where("password", sha1);

		if( resultado.length > 0 ){
			//true
			return res.json({status:true, data: resultado[0]});
		}else{
			//false
			return res.json({status:false});
		}

	});


module.exports = router;

