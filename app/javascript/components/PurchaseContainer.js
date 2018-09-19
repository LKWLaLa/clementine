import React from 'react'
import {Elements} from 'react-stripe-elements'
import PurchaseableItemsTable from './PurchaseableItemsTable.js'
import PurchasedItemsTable from './PurchasedItemsTable.js'
import UpgradesTable from './UpgradesTable.js'
import CheckoutForm from './CheckoutForm.js'
import Filter from '../helpers/Filter.js'

class PurchaseContainer extends React.Component {
	constructor(props) {
		super(props)
		this.handlePurchaseableItemSelection = this.handlePurchaseableItemSelection.bind(this)
		this.handleUpgradeSelection = this.handleUpgradeSelection.bind(this)
		this.updateIdSet = this.updateIdSet.bind(this)
		this.updateState = this.updateState.bind(this)
		this.itemStatus = this.itemStatus.bind(this)
		this.itemStatuses = this.itemStatuses.bind(this)

		this.state = {
			selectedPurchaseableItemIds: new Set(),
			selectedUpgradeIds: new Set()
		}
	}

	/********************************* State Updaters ****************************/

	// Each of these functions is involved in the process of updating the state.

	updateIdSet(e,idSet) {
		let newIdSet = new Set(idSet) // copy
		let id = parseInt(e.target.getAttribute('id'),10)
		e.target.checked ? newIdSet.add(id) : newIdSet.delete(id)
		return newIdSet
	}

	handlePurchaseableItemSelection(e) {
		let selectedPurchaseableItemIds = this.updateIdSet(e,this.state.selectedPurchaseableItemIds)
		this.updateState(this.state,
			this.props,
			selectedPurchaseableItemIds,
			this.state.selectedUpgradeIds)
	}

	handleUpgradeSelection(e) {
		let selectedUpgradeIds = this.updateIdSet(e,this.state.selectedUpgradeIds)
		this.updateState(this.state,
			this.props,
			this.state.selectedPurchaseableItemIds,
			selectedUpgradeIds)
	}
	
	updateState(state,props,selectedPurchaseableItemIds,selectedUpgradeIds) {
		let priorItemIds = Filter.priorItems(props.purchasedItemIds,
			selectedPurchaseableItemIds,
			selectedUpgradeIds,
			props.upgrade)
		let eligibleItemIds = Filter.eligibleItems(priorItemIds,props.itemIds,props.qualifications)
		let excludedItemIds = Filter.excludedItems(priorItemIds,props.exclusions)

		// deselect any purchaseableItems that are ineligible given priorItems		
		selectedPurchaseableItemIds = new Set([...selectedPurchaseableItemIds]
			.filter(i => eligibleItemIds.has(i)))

		// deselect any upgrades whose upgradeToItems are excluded or ineligible given priorItems
		// TODO: fix this so that an item that was a valid selection prior to the current
		// selection (or deselection) but is no longer valid is automatically deselected.
		// doesn't get auto-deselected by excluding itself
		// selectedUpgradeIds = new Set([...selectedUpgradeIds]
		// 	.filter(u => {
		// 		let uToId = props.upgrade[u].upgradeToItemId
		// 		return eligibleItemIds.has(uToId) && !excludedItemIds.has(uToId)}))

		// set the state
		this.setState({
			selectedPurchaseableItemIds: selectedPurchaseableItemIds,
			selectedUpgradeIds: selectedUpgradeIds
		})
	}

	/******************************** Prop Computers *******************************/

	// These functions are not involved in updating the state.
	// After the state has been updated, the functions compute state-based values
	// that are passed to children of `this` as props during render.

	itemStatus(itemId) {
		let priorItemIds = Filter.priorItems(this.props.purchasedItemIds,
			this.state.selectedPurchaseableItemIds,
			this.state.selectedUpgradeIds,
			this.props.upgrade)

		let status = {ineligible: false, excluded: false, upgradeOnly: false}

		// is the item ineligible?
		let itemQualifications = this.props.qualifications
			.filter(q => q.qualifiedItemId == itemId)
		if (itemQualifications.length > 0) {
			let itemQualifiers = itemQualifications
				.filter(q => priorItemIds.has(q.qualifierItemId))
			if (itemQualifiers.length == 0) {
				status.ineligible = true
				status.qualifierItemIds = itemQualifications.map(q => q.qualifierItemId)
			}
		}

		// is the item excluded?
		let excluderItemIds = this.props.exclusions
			.filter(e => ((e.excludedItemId == itemId) && (priorItemIds.has(e.excluderItemId))))
			.map(e => e.excluderItemId)
		if (excluderItemIds.length > 0) {
			status.excluded = true
			status.excluderItemIds = excluderItemIds
		}

		// is the item upgradeOnly?
		let upgradeFromItemIds = this.props.upgrades
			.filter(u => u.upgradeToItemId == itemId && priorItemIds.has(u.upgradeFromItemId))
			.map(u => u.upgradeFromItemId)
		if (upgradeFromItemIds.length > 0) {
			status.upgradeOnly = true
			status.upgradeFromItemIds = upgradeFromItemIds
		}

		return status
	}

	itemStatuses() {
		let status = {}
		this.props.itemIds.forEach((itemId) => {
	    	status[itemId] = this.itemStatus(itemId)
	    })
	    return status
	}

	/******************* Render ********************/

	render() {
		let status = this.itemStatuses()
		let priorItemIds = Filter.priorItems(this.props.purchasedItemIds,
			this.state.selectedPurchaseableItemIds,
			this.state.selectedUpgradeIds,
			this.props.upgrade)

		return (
			<div className="purchaseable-items-container">
				<PurchasedItemsTable
					purchasedItemIds = {this.props.purchasedItemIds}
					item = {this.props.item}
				/>
				<PurchaseableItemsTable
					purchaseableItemsByType = {this.props.purchaseableItemsByType}
					selectedItemIds = {this.state.selectedPurchaseableItemIds}
					status = {status}
					item = {this.props.item}
					handleSelection = {this.handlePurchaseableItemSelection}
				/>
				<UpgradesTable 
					upgrade = {this.props.upgrade}
					upgrades = {this.props.availableUpgrades}
					exchanges = {this.props.availableExchanges}
					item = {this.props.item}
					purchasedItems = {this.props.currentUser.purchasedItems}
					priorItemIds = {priorItemIds}
					selectedUpgradeIds = {this.state.selectedUpgradeIds}
					status = {status}
					handleSelection = {this.handleUpgradeSelection}
				/>
				<h3>Checkout: </h3> 
	            <Elements>
	            	<CheckoutForm name={this.props.currentUser.name}/>
	            </Elements>
			</div>
		)
	}
}

export default PurchaseContainer