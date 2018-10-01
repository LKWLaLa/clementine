import React, {Component} from 'react'
import PurchaseContainer from './PurchaseContainer.js'
import Filter from '../helpers/Filter.js'
import models, {Item, ItemType, User, Sale, Exclusion, Upgrade, Qualification} from '../helpers/models.js'
import Kinship, {Record, RecordCollection} from '../kinship/Kinship.js'

class DashboardContainer extends Component {
	constructor(props) {
		super(props)

		this.showTransactionComplete = this.showTransactionComplete.bind(this)
		this.load = this.load.bind(this)
		this.reload = this.reload.bind(this)

		this.load()
	}

	load() {
		this.loadData().then(apiArrays => {
			console.log(apiArrays)
			let user = this.buildDb(apiArrays)

			let availableUpgrades = new RecordCollection(Upgrade.all.filter(u => {
				return user.purchasedItems.has(u.upgradeFromItem)
				&& u.upgradeFromItem.itemType != u.upgradeToItem.itemType})
				.map(u => {
					u.priorSale = user.sales.findBy({item: u.upgradeFromItem})
					let upgradeToPrice = u.upgradeToItem.itemType.currentPrice
					u.upgradePrice = upgradeToPrice - u.priorSale.price.amount
					u.upgradeToPrice = upgradeToPrice
					return u
				})
			)

			let availableExchanges = Upgrade.all.filter(u =>
				user.purchasedItems.has(u.upgradeFromItem)
				&& u.upgradeFromItem.itemType == u.upgradeToItem.itemType)
				.map(u => {
					u.priorSale = user.sales.findBy({item: u.upgradeFromItem})
					return u
				})

			console.log(user.purchasedItems)
			let purchaseableItems = Filter.purchaseableItems(
				user.purchasedItems,
				Item.all,
				Exclusion.all,
				Upgrade.all)

			this.setState({
				user: user,
				availableUpgrades: availableUpgrades,
				availableExchanges: availableExchanges,
				purchaseableItems: purchaseableItems,
				transactionComplete: false
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
						let foreignKey = propName.slice(0,-2) // chop off the ""
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

	showTransactionComplete() {
		this.setState({transactionComplete: true})
	}

	reload() {
		Kinship.resetDb()
		console.log(Kinship.getDb())
		this.load()
	}

	render(){
		if (this.state) {
			let firstName = this.state.user.firstName
			if (this.state.transactionComplete) {
				return(
					<div>
						<h2>Purchase complete. Thanks for your registration!</h2>
						<button onClick = {this.reload}>
						Click here to return to your dashboard.
						</button>
					</div>
				)
			} else {
				return (
				  	<div className="dashboard-container">
					  	<PurchaseContainer
					  		user = {this.state.user}
					  		purchaseableItems = {this.state.purchaseableItems}
					  		purchaseableItemsByType = {this.state.purchaseableItems.groupBy('itemType')}
					  		availableUpgrades = {this.state.availableUpgrades}
					  		availableExchanges = {this.state.availableExchanges}
					  		showTransactionComplete = {this.showTransactionComplete}
					  	 />
				    </div>
				)
			}
					
			
		} else {
			return (null)
		}
	}
}

export default DashboardContainer
