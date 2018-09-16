import React, {Component} from 'react'
import PurchaseContainer from './PurchaseContainer.js'
import Filter from '../helpers/Filter.js'

class DashboardContainer extends Component {
	constructor(props) {
		super(props)

		// get the data
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
			fetch('/api/exclusions',init),
			fetch('/api/upgrades', init),
			fetch('/api/qualifications', init),
			fetch('/api/items',init)]
		
		Promise.all(promises).then(values => {
			// debug
			let jsonPromises = []
			values.forEach(value => {
				jsonPromises.push(value.json())
			})
			return Promise.all(jsonPromises)
		}).then(values => {
			let currentUser = values[0]
			let itemTypes = values[1]
			let exclusions = values[2]
			let upgrades = values[3]
			let qualifications = values[4]
			let items = values[5]

			let itemIds = new Set(items.map(i => i.id))
			let purchasedItemIds = new Set(currentUser.purchasedItems.map(i => i.id))
			let purchaseableItemIds = Filter.purchaseableItems(
					purchasedItemIds,
					itemIds,
					exclusions,
					upgrades)

			let purchaseableItemsByType = itemTypes
				.map(oldType => {
					let type = {...oldType} // shallow copy
					type.items = oldType.items.filter(item => purchaseableItemIds.has(item.id))
					return type
				})
				.filter(type => type.items.length > 0)

			this.setState({
				currentUser: currentUser,
				itemTypes: itemTypes,
				exclusions: exclusions,
				upgrades: upgrades,
				qualifications: qualifications,
				items: items,
				itemIds: itemIds,
				purchasedItemIds: purchasedItemIds,
				purchaseableItemIds: purchaseableItemIds,
				purchaseableItemsByType: purchaseableItemsByType
			})
		})
	}

	render(){
		if (this.state) {
			return (
			  	<div className="dashboard-container">
				    <h2>Welcome to your registration dashboard</h2>
				    <PurchaseContainer
				    	currentUser = {this.state.currentUser}
						itemTypes = {this.state.itemTypes}
						exclusions = {this.state.exclusions}
						upgrades = {this.state.upgrades}
						qualifications = {this.state.qualifications}
						items = {this.state.items}
						itemIds = {this.state.itemIds}
						purchasedItemIds = {this.state.purchasedItemIds}
						purchaseableItemIds = {this.state.purchaseableItemIds}
						purchaseableItemsByType = {this.state.purchaseableItemsByType}
				    />
			    </div>
			)
		} else {
			return (null)
		}
	}
}

export default DashboardContainer
