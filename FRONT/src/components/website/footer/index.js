
const Footer = () => {
	return(
	<footer className="rounded-top container-md bg-primary text-white text-center">
		<div className="container p-4">
			<div className="row">

			<div className="col-lg-4 ms-5 col-md-6 mb-4 mb-md-0">
				<h5 className="text-uppercase">Links</h5>
					<ul className="list-unstyled mb-0">
						<li>
							<a href="#!" className="text-white">Link 1</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 2</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 3</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 4</a>
						</li>
					</ul>
			</div>

			<div className="col-lg-3 col-md-6 mb-4 mb-md-0">
				<h5 className="text-uppercase">Links</h5>
					<ul className="list-unstyled mb-0">
						<li>
							<a href="#!" className="text-white">Link 1</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 2</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 3</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 4</a>
						</li>
					</ul>
			</div>

			<div className="col-lg-3 col-md-6 mb-4 mb-md-0">
				<h5 className="text-uppercase mb-0">Links</h5>
					<ul className="list-unstyled">
						<li>
							<a href="#!" className="text-white">Link 1</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 2</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 3</a>
						</li>
						<li>
							<a href="#!" className="text-white">Link 4</a>
						</li>
					</ul>
			</div>
		</div>
	</div>

	<div className="text-center p-3">
		© <span className="text-white"> Web Tea </span>
		{new Date().getFullYear()}
	</div>
	</footer>);
}

export default Footer;
