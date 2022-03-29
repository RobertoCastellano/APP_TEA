import { Link } from "react-router-dom";


const Menu = () => {
	return(
		<ul className="nav justify-content-center bg-light shadow p-3 mb-5 bg-body rounded">

		<a className="navbar-brand d-flex mt-2 mb-2 me-5" href="/">
			<img src="https://investim.guru/sites/default/files/styles/coverbig/public/images/cover/102-231.png?itok=Dou6xbPl" alt="..." height="36"/>
		</a>

		<div className="d-flex mt-2 mb-2 me-3">
			<input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search"/>
			<button className="btn btn-outline-primary fa-solid fa-magnifying-glass" type="submit"></button>
		</div>
			<ul className="nav">
				<li className="nav-item mt-3 me-3"><Link className="nav-link" to="/encuentra-tu-profesional">Encuentra tu profesional </Link></li>
				<li className="nav-item mt-3 me-3"><Link className="nav-link" to="/teacch">Método TEACCH </Link></li>
				<li className="nav-item mt-3 me-3"><Link className="nav-link" to="/about_us">¿Qué hacemos? </Link></li>
				<li className="nav-item mt-3 me-3"><Link className="nav-link" to="/contact">Contacto </Link></li>
				<li className="nav-item mt-3 me-3"><Link className="nav-link" to="/blog">Blog </Link></li>
			</ul>
		</ul>
	);
}

export default Menu;