import React from 'react'
import {Elements} from 'react-stripe-elements'
import PurchaseableItemsTable from './PurchaseableItemsTable.js'
import PurchasedItemsTable from './PurchasedItemsTable.js'
import ConversionsContainer from './ConversionsContainer.js'
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
		this.purchaseDescription = this.purchaseDescription.bind(this)
		this.upgradeToItemId = this.upgradeDescription.bind(this)
		this.purchaseDescriptions = this.purchaseDescriptions.bind(this)
		this.upgradeDescriptions = this.upgradeDescriptions.bind(this)
		this.description = this.description.bind(this)

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

	subtotal() {
		let newPurchaseSubtotal = [...this.state.selectedPurchaseableItemIds]
			.reduce((sum,id) => sum + this.props.item[id].currentPrice,0)
		let upgradeSubtotal = this.props.availableUpgrades.reduce((sum,u) => 
			this.state.selectedUpgradeIds.has(u.id) ? sum + u.upgradePrice : sum, 0
		)
		return newPurchaseSubtotal + upgradeSubtotal
	}

	upgradeDescription(upgradeId) {
		let upgrade = this.props.upgrade[upgradeId]
		let fromItem = this.props.item[upgrade.upgradeFromItemId]
		let toItem = this.props.item[upgrade.upgradeToItemId]
		return "Upgrade from " + fromItem.name + " to " + toItem.name
	}

	purchaseDescription(itemId) {
		return "Purchase " + this.props.item[itemId].name
	}

	upgradeDescriptions() {
		return this.props.availableUpgrades
			.filter((u) => this.state.selectedUpgradeIds.has(u.id))
			.reduce((d,u) => d + this.upgradeDescription(u.id) + '\n','')
	}

	purchaseDescriptions() {
		return this.props.items
			.filter((i) => this.state.selectedPurchaseableItemIds.has(i.id))
			.reduce((d,i) => d + this.purchaseDescription(i.id) + '\n','')
	}

	// returns a description of all currently selected purchases and upgrades
	description() {
		return this.purchaseDescriptions() + '\n' + this.upgradeDescriptions()
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
				<ConversionsContainer
					upgrade = {this.props.upgrade}
					upgrades = {this.props.availableUpgrades}
					exchanges = {this.props.availableExchanges}
					item = {this.props.item}
					priorItemIds = {priorItemIds}
					selectedUpgradeIds = {this.state.selectedUpgradeIds}
					status = {status}
					handleSelection = {this.handleUpgradeSelection}
					currentUser = {this.props.currentUser}
				/>
				<h3>Checkout: </h3> 
	            <Elements>
	            	<CheckoutForm 
	            		amount = {this.subtotal()}
	            		description = {this.description}
	            		purchases = {this.props.items.filter((i) =>
	            			this.state.selectedPurchaseableItemIds.has(i.id))}
	            		upgrades = {this.props.availableUpgrades.filter((u) =>
	            			this.state.selectedUpgradeIds.has(u.id))}
	            	/>
	            </Elements>
			</div>
		)
	}
}

export default PurchaseContainer