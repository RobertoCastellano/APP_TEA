const express = require('express');
const router = express.Router();
const db = require('../config/db');
var crypto = require('crypto');
const authtoken = require('../config/authtoken');
const { CLIENT_RENEG_LIMIT } = require('tls');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add', async (req, res) => {

		const required = ["name",,"surname","password", "rols", "email", "university_degree", "experience", "ID_city", "gender", "birthday"];

		// Comprobamos que estén todos los campos obligatorios
			const security = required.find((e)=>{
				if( req.body[e] === undefined ){ return true; }
			})

				if( security !== undefined){
					return res.json(`Falta el campo ${security}`);
			}

			var sha1 = crypto.createHash('sha1').update(req.body.password).digest('hex');
			var token = crypto.createHash('sha1').update(req.body.password+(+new Date())).digest('hex');

		const obj = {
			name: 		req.body.name,
			password:	sha1,
			token: 		token,
			rols: 		req.body.rols,
			surname:	req.body.surname,
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

		if( parseInt(req.tokendata.ID) != parseInt(req.params.id) || req.tokendata.rols != "admin" ){
			return res.status(403).json({status:false, error:"No tienes permiso para actualizar este usuario, ya que no es tuyo"});
		}

		const result = await db('users')
			.update({
				name:  req.body.name,
				surname: req.body.surname,
				email: req.body.email,
				phone: req.body.phone,
				university_degree: req.body.university_degree,
				experience: req.body.experience
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

	router.get('/get/:id', async (req, res) => {

		const resultado = await db
			.select(["name","surname","email","phone","university_degree","experience","gender","birthday"])
			.from('users')
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


	router.get('/list/', async (req, res) => {

		const resultado = await db
			.select(["name","surname","email","phone","university_degree","experience","gender","birthday","ID"])
			.from('users');

			//Devolver true or false
			if( resultado.length > 0 ){
				//true
				return res.json({status:true, data: resultado});
			}else{
				//false
				return res.json({status:false});
			}
	});	

	router.delete('/delete/:id',[authtoken], async (req, res) => {

		if( parseInt(req.tokendata.ID) != parseInt(req.params.id) || req.tokendata.rols != "admin" ){
			return res.status(403).json({status:false, error:"No tienes permiso para eliminar este usuario, ya que no es tuyo"});
		}

		const result = await db('users')
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

	// LOGIN
	router.post('/login', async (req, res) => {

		var sha1 = crypto.createHash('sha1').update(req.body.password).digest('hex');

		const resultado = await db
			.select(["ID", "rols", "email", "gender", "token"])
			.from('users')
			.where("email", req.body.user)
			.where("password", sha1);

		//Devolver true or false
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

		//Devolver true or false
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

		//Devolver true or false
		if( resultado.length > 0 ){
			//true
			return res.json({status:true, data: resultado[0]});
		}else{
			//false
			return res.json({status:false});
		}

	});


module.exports = router;




