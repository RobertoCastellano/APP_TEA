
/**
 * @param {title}
 * @param {uri}
 * @param {photo}
 */
const ArticleCard = (props) => {
	return (<div className="col-4">
		<div className="p-3 border bg-light text-center shadow p-3 mb-5 bg-body rounded">
			<img src={props.photo} className="mb-3 rounded card-img-top" alt="..." />
			{props.title}
		</div>
	</div>);
}

export default ArticleCard;