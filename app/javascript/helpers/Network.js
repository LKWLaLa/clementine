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
		let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		let init = {
		    method: 'PATCH',
		    headers: {'Content-Type': 'application/json',
		        'Accept': 'application/json',
		        'X-Requested-With': 'XMLHttpRequest',
		        'X-CSRF-Token': csrfToken
			},
			body: JSON.stringify(data),
			credentials: 'same-origin'
		}

		return fetch(route,init)
	}

	static json_get(route) {
		return this.get_request(route)
			.then(res => {
				return res.json()
			})
	}
}


export default Network