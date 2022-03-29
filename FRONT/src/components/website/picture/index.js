/**
 * @param {photo}
 */

const Picture = (props)=>{

	return(
	<div className="container-md">
		<img src={props.photo} class="rounded mx-auto d-block mt-5"/>
	</div>
	);
}

export default Picture;