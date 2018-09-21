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
			
			let item = this.arrayToObjectById(items)
			let exclusion = this.arrayToObjectById(exclusions)
			let upgrade = this.arrayToObjectById(upgrades)
			let qualification = this.arrayToObjectById(qualifications)

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

			let availableUpgrades = upgrades.filter(u => 
				purchasedItemIds.has(u.upgradeFromItemId)
				&& item[u.upgradeFromItemId].itemTypeId != item[u.upgradeToItemId].itemTypeId)
				.map(u => {
					let priorItem = currentUser.purchasedItems.find(i => i.id == u.upgradeFromItemId)
					let upgradeToPrice = item[u.upgradeToItemId].currentPriceInfo
					u.upgradePrice = upgradeToPrice.amount - priorItem.purchasePrice
					u.priorSaleId = priorItem.saleId
					u.upgradeToPrice = upgradeToPrice
					return u
				})

			let availableExchanges = upgrades.filter(u =>
				purchasedItemIds.has(u.upgradeFromItemId)
				&& item[u.upgradeFromItemId].itemTypeId == item[u.upgradeToItemId].itemTypeId)
				.map(u => {
					let priorItem = currentUser.purchasedItems.find(i => i.id == u.upgradeFromItemId)
					u.priorSaleId = priorItem.saleId
					return u
				})

			let availableUpgrade = this.arrayToObjectById(availableUpgrades)
			let availableExchange = this.arrayToObjectById(availableExchanges)

			this.setState({
				currentUser: currentUser,
				itemTypes: itemTypes,
				exclusions: exclusions,
				upgrades: upgrades,
				qualifications: qualifications,
				exclusion: exclusion,
				upgrade: upgrade,
				qualification: qualification,
				item: item,
				items: items,
				itemIds: itemIds,
				purchasedItemIds: purchasedItemIds,
				purchaseableItemIds: purchaseableItemIds,
				purchaseableItemsByType: purchaseableItemsByType,
				availableExchanges: availableExchanges,
				availableUpgrades: availableUpgrades,
				availableUpgrade: availableUpgrade,
				availableExchange: availableExchange
			})
		})
	}

	// build an object mapping each the id of each item in array
	// to the item itself
	arrayToObjectById(array) {
		let obj = {}
		array.forEach(i => {
			obj[i.id] = i
		})
		return obj
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
						item = {this.state.item}
						exclusion = {this.state.exclusion}
						upgrade = {this.state.upgrade}
						qualification = {this.state.qualification}
						itemIds = {this.state.itemIds}
						purchasedItems = {this.state.purchasedItems}
						purchasedItemIds = {this.state.purchasedItemIds}
						purchaseableItemIds = {this.state.purchaseableItemIds}
						purchaseableItemsByType = {this.state.purchaseableItemsByType}
						availableUpgrades = {this.state.availableUpgrades}
						availableExchanges = {this.state.availableExchanges}
						availableUpgrade = {this.state.availableUpgrade}
						availableExchange = {this.state.availableExchange}
						items = {this.state.items}
				    />
			    </div>
			)
		} else {
			return (null)
		}
	}
}

export default DashboardContainer
