import {useState, useEffect} from "react";
import { useForm } from 'react-hook-form';
import API from '../../../config/API';

const Form = () =>{
	
	const [state, setState] = useState({
		loaded: false,
		users: []
	});

	useEffect(()=>{
		API.get('users/list').then((datos) => {
			console.log(datos);
			if(datos.status===true){
				setState({
					loaded: true,
					users: datos.data,
				});
			}
		});
	},[]);

	const { register, handleSubmit } = useForm();

	const onSubmit = data => {
		console.log(data);
		API.post('leads/add', data).then((datos) => {
		console.log("Leads",datos);
		});
	};

	return (
		<div className="container bg-light rounded shadow">
			<div className="row">
				<div className="col-md-12">
					<form onSubmit={handleSubmit(onSubmit)}>
						<legend className="text-center header">Contacto</legend>
						<div>
							<div className="col-md-8 mb-3 mx-auto d-block">
							<select {...register("ID_user")} className="form-control">
								<option value="none">Elige un profesional</option>;
								{
									(state.loaded===false? <option>Cargando...</option> :
									state.users.map(e=>{
										return <option key={e.ID} value={e.ID}>{e.name}</option>;
									})
									)
								}
							</select>
							</div>
						</div>
						<div>
							<div>
								<div className="col-md-8 mb-3 mx-auto d-block text-left">
									<input type="text" placeholder="Nombre" {...register("name", {})} className="form-control"/>
								</div>
							</div>
							<div>
								<div className="col-md-8 mb-3 mx-auto d-block">
									<input type="text" placeholder="Apellidos" {...register("surname", {})} className="form-control"/>
								</div>
							</div>
							<div>
								<div className="col-md-8 mb-3 mx-auto d-block">
									<input type="number" placeholder="Teléfono" {...register("phone", {})} className="form-control"/>
								</div>
							</div>
							<div>
								<div className="col-md-8 mb-3 mx-auto d-block">
									<input type="email" placeholder="Email" {...register("email_lead", {})} className="form-control"/>
								</div>
							</div>
							<div>
								<div className="col-md-8 mb-3 mx-auto d-block">
									<textarea type="text" placeholder="Deja tu mensaje" {...register("texto", {})} rows="5" className="form-control"></textarea>
								</div>
							</div>
						</div>
						<div>
							<div className="col-md-12 text-center mb-3">
								<button type="submit" className="btn btn-primary btn-lg">Enviar</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
	
};

export default Form;
