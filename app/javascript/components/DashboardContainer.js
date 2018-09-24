import React, {Component} from 'react'
import PurchaseContainer from './PurchaseContainer.js'
import Filter from '../helpers/Filter.js'
import models from '../helpers/models.js'
import Kinship from '../kinship/Kinship.js'

class DashboardContainer extends Component {
	constructor(props) {
		super(props)

		this.loadData().then(apiArrays => {
			let currentUser = this.buildDb(apiArrays)
			this.setState({
				currentUser: currentUser
			})
		}) // TODO: add error handling for the data loading
	}

	buildDb(apiValues) {
		// apiValues[0] should be the currentUser
		// which is not wrapped in an array
		if (apiValues.length != models.loadSequence.length) {throw 'apiValues and models.loadSequence must have the same length'}

		let currentUser = new models.User(apiValues[0])
		for (let i = 1; i < apiValues.length; ++i) {
			// construct instances of the ith model from
			// objects in the ith api array
			let m = models.loadSequence[i]
			let arr = apiValues[i]
			arr.forEach(obj => {
				let x = {}
				Object.getOwnPropertyNames(obj).forEach(propName => {
					if (m.foreignKeyIds.has(propName)) {
						// All instances that x depends on
						// must be created prior to creation
						// of instance x.
						// The order in which data is loaded
						// is therefore critically important.
						let foreignKey = propName.slice(0,-2) // chop off the "Id"
						x[foreignKey] = m.relatedModel(foreignKey).byId(obj[propName])
					} else {
						x[propName] = obj[propName]
					}
				})
				// Calling the constructor of the model loads
				// the newly created instance into Kinship
				// even though no reference is retained here.
				new m(x)
			})
		}
		return currentUser
	}

	loadData() {
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

		let promises = [fetch('/api/current_user', init),
			fetch('/api/item_types', init),
			fetch('/api/items',init),
			// fetch('/api/price',init), 
			fetch('/api/sales',init), // for current user only
			fetch('/api/exclusions',init),
			fetch('/api/upgrades', init),
			fetch('/api/qualifications', init),
			]
		
		// return a single promise that is fulfilled when all
		// api calls have returned been
		// converted into arrays of Javascript objects
		return Promise.all(promises).then(values => {
			let jsonPromises = []
			values.forEach(value => {
				jsonPromises.push(value.json())
			})
			return Promise.all(jsonPromises)
		})
	}

	render(){
		if (this.state) {
			let firstName = this.state.currentUser.firstName			
			return (
			  	<div className="dashboard-container">
				    <h2>Welcome to your registration dashboard, {firstName}!</h2>
				  	<PurchaseContainer
				  		currentUser = {this.state.currentUser}
				  	 /> 
			    </div>
			)
		} else {
			return (null)
		}
	}
}

export default DashboardContainer
