import { Link } from "react-router-dom";


const Panel = (props) => {

	// https://fontawesome.com/icons

	return (
			<div className="container-fluid">
			<div className="row">
				<div className="col-2 collapse show d-md-flex bg-light pt-5 pl-0 min-vh-100" id="sidebar"> 
					<ul className="nav flex-column flex-nowrap overflow-hidden mt-3">						
						<li className="nav-item">
							<Link className="nav-link text-truncate" to="/app"><i className="fa-solid fa-house"></i> <span className="d-none d-sm-inline">Inicio</span></Link>
						</li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/profesionales"><i className="fa-solid fa-user-graduate"></i> <span className="d-none d-sm-inline">Profesionales</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/post"><i className="fa-solid fa-book"></i> <span className="d-none d-sm-inline">Post</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/post/add"><i className="fa-solid fa-circle-plus ps-3"></i> <span className="d-none d-sm-inline">Añadir</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/pages"><i className="fa-solid fa-file"></i> <span className="d-none d-sm-inline">Páginas</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/pages/add"><i className="fa-solid fa-circle-plus ps-3"></i> <span className="d-none d-sm-inline">Añadir</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/categories"><i className="fa-solid fa-folder-open"></i> <span className="d-none d-sm-inline">Categorías</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/categories/add"><i className="fa-solid fa-circle-plus ps-3"></i> <span className="d-none d-sm-inline">Añadir</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/leads"><i className="fa-solid fa-address-card"></i> <span className="d-none d-sm-inline">Leads</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app/config"><i className="fa-solid fa-gear"></i> <span className="d-none d-sm-inline">Configuración</span></Link></li>
						<li className="nav-item"><Link className="nav-link text-truncate" to="/app"><i className="fa-solid fa-arrow-right-from-bracket"></i> <span className="d-none d-sm-inline">Logout</span></Link></li>
					</ul>
				</div>
				<div className="col-10 pt-2 mt-5">
					{props.contenido}
				</div>
			</div>
		</div>
	);
}

export default Panel;
