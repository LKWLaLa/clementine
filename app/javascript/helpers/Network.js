class Network {
	static get_request(route) {
		let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		let init = {
		    method: 'GET',
		    headers: {'Content-Type': 'application/json',
		        'Accept': 'application/json',
		        'X-Requested-With': 'XMLHttpRequest',
		        'X-CSRF-Token': csrfToken
			},
			credentials: 'same-origin'
		}

		return fetch(route,init)
	}

	static patch_request(route,data) {
		return this.request_with_data(route,data,'PATCH')
	}

	static post_request(route,data) {
		return this.request_with_data(route,data,'POST')
	}

	static request_with_data(route,data,verb) {
		let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		let init = {
			method: verb,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				'X-CSRF-Token': csrfToken
			},
			body: JSON.stringify(data),
			credentials: 'same-origin'
		}
		return fetch(route, init)
	}

	static json_get(route) {
		return this.get_request(route)
			.then(res => {
				return res.json()
			})
	}
}


export default Network