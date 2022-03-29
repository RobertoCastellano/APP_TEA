const express = require('express');
const router = express.Router();
const db = require('../config/db');
//const authtoken = require('../config/authtoken');
const { read } = require('fs');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

	router.post('/add', async (req, res) => {

		const required = ["ID_user", "name", "surname", "phone", "email_lead", "texto"];
		
		// Comprobamos que estén todos los campos obligatorios
		const security = required.find((e)=>{
			if( req.body[e] === undefined ){ return true; }
		})
			if( security !== undefined){
				return res.json(`Falta el campo ${security}`);
		}

		//var token = crypto.createHash('sha1').update(req.body.password+(+new Date())).digest('hex');

		const obj = {
			ID_user: 	req.body.ID_user,
			name: 		req.body.name,
			surname:	req.body.surname,
			phone: 		req.body.phone,
			email_lead:	req.body.email_lead,
			texto:		req.body.texto
		};
		const result = await db('leads').insert(obj);

		//Devolver true or false
		if( result.length > 0 ){
			//true
			return res.json({status:true, data: result[0]});
		}else{
			//false
			return res.json({status:false});
		}
	});

	router.put('/edit/:id',async (req, res) => {

		const result = await db('leads')
		.update({
			ID_user: 	req.body.ID_user,
			name: 		req.body.name,
			surname:	req.body.surname,
			phone: 		req.body.phone,
			email_lead:	req.body.email_lead,
			texto:		req.body.texto
		})
		.where("ID", req.params.id);

		//res.json({ status: true });
		//res.json("EDITAMOS UN LEAD "+req.params.id);

		//Devolver true or false
		if( result.length > 0 ){
			//true
			return res.json({status:true, data: result[0]});
		}else{
			//false
			return res.json({status:false});
		}
	});

	router.delete('/delete/:id', async (req, res) => {
		
		const result = await db('leads')
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
		.select(["ID", "name","surname","phone","email_lead","texto","info"])
		.from('leads')
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
		.select(["ID", "name","surname","phone","email_lead", "texto", "info"])
		.from('leads');

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