import { Fragment, useState ,useEffect } from "react";
import API from '../../../config/API';
import DataTable from 'react-data-table-component';
import {Link} from 'react-router-dom';

const Profesionales = () => {

	const [state, setState] = useState({
		loaded: false,
		users: []
	});

	useEffect(()=>{
		// Hacemos petición a users/list
		API.get('users/list').then((datos) => {
			console.log(datos);
			if(datos.status===true){

				setState({
					loaded: true,
					users: datos.data
				});
			}
		});
	},[])

	// https://react-data-table-component.netlify.app/?path=/docs/getting-started-examples--page

	const columns = [
		{
			name: 'ID',
			selector: row => row.ID,
			sortable: true,
		},
		{
			name: 'Nombre',
			selector: row => row.name,
			sortable: true,
		},
		{
			name: 'Apellidos',
			selector: row => row.surname,
			sortable: true,
		},
		{
			name: 'Email',
			selector: row => row.email,
			sortable: true,
		},
		{
			name: 'Teléfono',
			selector: row => row.phone,
			sortable: true,
		},
		{
			name: 'Titulación',
			selector: row => row.university_degree,
			sortable: true,
		},
		{
			name: 'Experiencia',
			selector: row => row.experience,
			sortable: true,
		},
		{
			name: 'Género',
			selector: row => row.gender,
			sortable: true,
		},
		{
			name: 'Nacimiento',
			selector: row => row.birthday,
			sortable: true,
		},
		{
			name: 'Opciones',
			selector:row => <Link to={"/app/profesionales/edit/"+row.ID}  className="fa-solid fa-pen-to-square btn btn-primary"></Link>,
			sortable: false
		},
		{
			name: 'Eliminar',
			selector: row => <Link to={"/app/profesionales/delete/"+row.ID}  className="fa-solid fa-trash-can btn btn-primary"></Link>,
			sortable: false
		}
	];	

	const customStyles ={
		rows: {
			style: {
				minHeight: '72px',
				fontSize: '14px',
				fontFamily: 'Verdana',
				textAlign: "center",
			},
		},
		headCells: {
			style: {
				paddingLeft: '8px',
				paddingRight: '8px',
				background:'#56baed',
				fontSize: '15px',
				fontWeight: 'bold',
				color: '#fff',
				fontFamily: 'Verdana',
			},
		},
		cells: {
			style: {
				paddingLeft: '8px',
				paddingRight: '8px',
				background:'#dce7ee',
			},
		},
	}

	const pageOpt = {
		rowsPerPageText: 'Filas por página',
		rangeSeparatorText: 'de',
		selectAllRowsItem: true,
		selectAllRowsItemText: 'Todos'
	}
		
	return(
	<Fragment>
		<DataTable
		columns={columns}
		data={state.users}
		customStyles={customStyles}
		pagination
		paginationComponentOptions={pageOpt}
		/>
	</Fragment>
	)

}

export default Profesionales;
