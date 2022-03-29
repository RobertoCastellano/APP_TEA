import API from '../../../../config/API';
import {Fragment, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const DeleteProfesional = () => {

	const [state, setState]= useState({
		status:"loading",
		data:{}
	})

	const {id} = useParams();
	const redirect = useNavigate();

	useEffect(()=>{

		API.get('users/get/'+id)
		.then((datos)=>{

			console.log("DATOS", datos);

			setState({
				...state,
				data:datos.data,
				status:"loaded"
			});
		});
	},[])

	const profesionalDelete=()=>{
		API.delete('users/delete/'+id)
		.then(()=>{
			redirect('/app/profesionales');
		});
	};

	if(state.status==="loading"){return(<div>Cargando...</div>)}

	if(state.status==="loaded"){

	return ( 
		<Fragment>
		<div className=" text-center mt-3">
			<h3 className="mb-5">Eliminar profesional</h3>
			<div>¿Desea a eliminar a <strong>{state.data.name}</strong>?</div>
			<button type="button" onClick={profesionalDelete} className="btn-danger mt-5">Eliminar profesional</button>
		</div>
		</Fragment>
	 );
	}
}
 
export default DeleteProfesional;