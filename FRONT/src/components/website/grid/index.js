/**
 * @param {title}
 * @param {uri}
 * @param {photo}
 */
const Grid= (props) => {
	return (
		<div className="col">
			<div className="container-md mt-5" className="card mb-3">
					<img src= {props.photo} className="rounded card-img-top rounded shadow" alt="..."/>
				<div className="card-body">
					<h5 className="card-title text-center">{props.title}</h5>
						<p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
				</div>
			</div>
		</div>
	);
}

export default Grid;