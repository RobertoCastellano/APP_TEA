
const api = {
	endpoint: 'http://127.0.0.1:3005/',
	save_token: function(token){
		localStorage.setItem('token', token);
	},
	get_token: function(){
		if(localStorage.getItem('token') == null){
			return null;
		}else{
			return localStorage.getItem('token');
		}
	},
	remove_token: function(){
		localStorage.removeItem('token');
	},
	post: async function(uri, obj={}, type="POST"){
		const url = this.endpoint+uri;

		const response = await fetch(url, {
			method: type,
			headers: {
				'Content-Type': 'application/json',
				'token': this.get_token()
			},
			body: JSON.stringify(obj)
		})

		return response.json();

	},
	get: async function(uri, obj={}){

		const url = this.endpoint+uri+"?"+(new URLSearchParams(obj).toString());

		const response = await fetch(url, {
			method: "GET",
			headers:{
				'Content-Type': 'application/json',
				'token': this.get_token()
			}
		})

		return response.json();

	},
	put: function(url, obj={}){
		return this.post(url, obj, "PUT");
	},
	delete: function(url, obj={}){
		return this.post(url, obj, "DELETE");
	},
}

export default api;