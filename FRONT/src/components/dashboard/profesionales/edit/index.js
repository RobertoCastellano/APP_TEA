import { useState ,useEffect } from "react";
import {  useParams } from 'react-router-dom';
import API from '../../../../config/API';


const EditProfesionales = () => {

	const {id} = useParams();

	const [state, setState] = useState({
		loaded: false,
		data: []
	});


	useEffect(()=>{

		// Hacemos petición a users/list
		API.get('users/get/'+id).then((datos) => {
			setState({
				...state,
				data: datos.data,
				loaded: true
			});
		});
	},[])

	const editarUsuario = () => {

		// Recupera los campos

		// API.post('users/edit/'+id, {objeto})...

		const obj=	{
			name: document.getElementById('name').value,
			surname: document.getElementById('surname').value,
			email: document.getElementById('email').value,
			phone: document.getElementById('phone').value,
			university_degree: document.getElementById('university_degree').value,
			experience: document.getElementById('experience').value
		}

		console.log("obj", obj);

		API.put('users/edit/'+id, obj)
		.then((datos) => {	
			if(datos.status===true){
				setState({
					loaded: true,
					users: datos.data
				});
			}	
			console.log("datos ", datos)
		});
	}

	console.log("EL ID A EDITAR ES: "+id);

	if(!state.loaded){ return(<div>Cargando usuario con ID {id}</div>); }

	return(
		<div>
			<div className="row row-cols-2 justify-content-md-center mt-3">
				<input  type="text"  id="name" placeholder="Nombre" defaultValue={state.data.name} />
				<input  type="text"  id="surname" placeholder="Apellidos" defaultValue={state.data.surname} />
				<input  type="email" id="email" placeholder="Email" defaultValue={state.data.email} />
				<input  type="number"id="phone" placeholder="Teléfono" defaultValue={state.data.phone} />
				<input  type="text"  id="university_degree" placeholder="Titulación" defaultValue={state.data.university_degree} />
				<input  type="text"  id="experience" placeholder="Años de experiencia" defaultValue={state.data.experience} />
				<button className="botonEdit" type="button" onClick={editarUsuario}>Actualizar</button>
			</div>		
		</div>
	);

}

export default EditProfesionales;

