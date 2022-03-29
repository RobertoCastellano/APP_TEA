import {Fragment, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import API from '../../../config/API';


const EditPost = () => {

	const {id} = useParams();

	const [state, setState]= useState({
		loaded: false,
		data: []
	});

	useEffect (()=>{
		API.get('post/edit/'+id).then((datos)=>{
			setState({
				...state,
				data: datos.data,
				loaded: true
			});
		});	
	},[])


	const postEdit =()=>{

		const obj ={
			title: document.getElementById('title').value,
			author: document.getElementById('author').value,
			add_content: document.getElementById('add_content').value
		}

		console.log("obj", obj);

		API.put('post/edit/'+id,obj)
		.then((datos) => {	
			if(datos.status===true){
				setState({
					loaded: true,
					post: datos.data
				});
			}	
			console.log("datos ", datos)
		});
	}

	console.log("EL POST A EDITAR ES: ",+id )

	return(
		<Fragment>
			<div className="row row-cols-2 justify-content-md-center mt-3">
				<h3 className="mb-5">Editar post</h3>
				<input type="text" id="title" placeholder="Título" defaultValue={state.data.title}/>
				<input type="text" id="author" placeholder="Autor" defaultValue={state.data.author}/>
				<textarea type="text" id="add_content" placeholder="Contenido" defaultValue={state.data.add_content}/>
				<button type="button" onClick={postEdit}>Editar post</button>
			</div>
		</Fragment>
	);
}

export default EditPost;