import {Fragment, useState,useEffect} from "react";
import API from '../../../config/API';
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";


const Post = ()=>{

	const [state, setState] = useState({
		loaded: false,
		posts: []
	});

	useEffect(()=>{
		// Hacemos petición a users/list
		API.get('post/list').then((datos) => {
			console.log(datos);
			if(datos.status===true){

				setState({
					loaded: true,
					posts: datos.data
				});
			}
		});
	},[])

	const columns = [

		{
			name: 'ID',
			selector: row => row.ID,
			sortable: true,
		},
		{
			name: 'Título',
			selector: row => row.title,
			sortable: true,
		},
		{
			name: 'Autor',
			selector: row => row.author,
			sortable: true,
		},
		{
			name: 'Añadir contenido',
			selector: row => row.add_content,
			sortable: true,
		},
		{
			name: 'Opciones',
			selector: (row)=>{
				return <Link to={"/app/post/edit/"+row.ID} className="fa-solid fa-pen-to-square btn btn-primary"></Link>
			},
			sortable: true,
		},
		{
			name: 'Eliminar',
			selector: row => <Link to={"/app/post/delete/"+row.ID}  className="fa-solid fa-trash-can btn btn-primary"></Link>,
			sortable: false
		}
	];

	const customStyles ={
		rows: {
			style: {
				minHeight: '72px',
				fontSize: '14px',
				fontFamily: 'Verdana',
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

	return (
		<Fragment>
			<DataTable
			columns={columns}
			data={state.posts}
			customStyles={customStyles}
			pagination
			paginationComponentOptions={pageOpt}
			/>
		</Fragment>
	)
}


export default Post;