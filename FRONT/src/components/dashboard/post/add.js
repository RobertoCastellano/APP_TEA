import {Fragment, useState, useEffect} from 'react';
import API from '../../../config/API';
import { useNavigate,useParams } from 'react-router-dom';

const AddPost = () => {

	const {id}= useParams();
	const redirect = useNavigate();

	const [state, setState] = useState({
		loaded: false,
		data: []
	})

	useEffect(()=>{

		API.post('post/add'+id).then((datos) => {

			setState({
				...state,
				data: datos.data,
				loaded: true
			});
		})
	})

	const createPost = ()=>{

		const obj =	{
			title: document.getElementById('title').value,
			author: document.getElementById('author').value,
			add_content: document.getElementById('add_content').value
		}

		API.post('post/add',obj).then((datos) => {

			redirect('/app/post');

			console.log("EL POST CREADO ES : "+ id, datos);

		})
		
	}

	return(
		<Fragment>
			<div className="row row-cols-2 justify-content-md-center mt-3">
			<h3 className="mb-5">Añadir post</h3>
			<input type="text" id="title" placeholder="Título" defaultValue={state.data.title}/>
			<input type="text" id="author" placeholder="Autor" defaultValue={state.data.author}/>
			<textarea type="text" id="add_content" placeholder="Contenido" defaultValue={state.data.add_content}/>
			<button type="button" className="justify-content-center" onClick={createPost}>Añadir post</button>
			</div>
		</Fragment>	
	);

}

export default AddPost;