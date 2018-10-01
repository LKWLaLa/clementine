import React from 'react'
import {Elements} from 'react-stripe-elements'
import PurchaseableItemsTable from './PurchaseableItemsTable.js'
import PurchasedItemsTable from './PurchasedItemsTable.js'
import ConversionsContainer from './ConversionsContainer.js'
import CheckoutForm from './CheckoutForm.js'
import Filter from '../helpers/Filter.js'
import {User,ItemType,Item,Sale,Exclusion,Upgrade,Qualification} from '../helpers/models.js'
import {Record, RecordCollection} from '../kinship/Kinship.js'

class PurchaseContainer extends React.Component {
	constructor(props) {
		super(props)

		this.handlePurchaseableItemSelection = this.handlePurchaseableItemSelection.bind(this)
		this.handleUpgradeSelection = this.handleUpgradeSelection.bind(this)
		this.updateSelection= this.updateSelection.bind(this)
		this.updateState = this.updateState.bind(this)
		this.itemStatus = this.itemStatus.bind(this)
		this.purchaseDescription = this.purchaseDescription.bind(this)
		this.upgradeDescription = this.upgradeDescription.bind(this)
		this.purchaseDescriptions = this.purchaseDescriptions.bind(this)
		this.upgradeDescriptions = this.upgradeDescriptions.bind(this)
		this.description = this.description.bind(this)

		this.state = {
			selectedPurchaseableItems: new RecordCollection(),
			selectedUpgrades: new RecordCollection()
		}
	}

	/********************************* State Updaters ****************************/

	// Each of these functions is involved in the process of updating the state.

	updateSelection(e,records,model) {
		let newRC = new RecordCollection(records) // copy
		let id = parseInt(e.target.getAttribute('id'),10)
		e.target.checked ? newRC.add(model.byId(id)) : newRC.delete(model.byId(id))
		return newRC
	}

	handlePurchaseableItemSelection(e) {
		let selectedPurchaseableItems = this.updateSelection(e,this.state.selectedPurchaseableItems,Item)
		this.updateState(selectedPurchaseableItems,this.state.selectedUpgrades)
	}

	handleUpgradeSelection(e) {
		let selectedUpgrades = this.updateSelection(e,this.state.selectedUpgrades,Upgrade)
		this.updateState(this.state.selectedPurchaseableItems,selectedUpgrades)
	}
	
	updateState(selectedPurchaseableItems,selectedUpgrades) {
		let priorItems = Filter.priorItems(this.props.user.purchasedItems,
			selectedPurchaseableItems,
			selectedUpgrades)
		let eligibleItems = Filter.eligibleItems(priorItems,Item.all,Qualification.all)
		let excludedItems = Filter.excludedItems(priorItems,Exclusion.all)

		// deselect any purchaseableItems that are ineligible given priorItems		
		selectedPurchaseableItems = selectedPurchaseableItems
			.filter(i => eligibleItems.has(i))

		// deselect any upgrades whose upgradeToItems are excluded or ineligible given priorItems
		// TODO: fix this so that an item that was a valid selection prior to the current
		// selection (or deselection) but is no longer valid is automatically deselected.
		// doesn't get auto-deselected by excluding itself
		// selectedUpgrades = new RecordCollection(selectedUpgrades)
		// 	.filter(u => {
		// 		let uTo = u.upgradeToItem
		// 		return eligibleItems.has(uTo) && !excludedItems.has(uTo)}))

		// set the state
		this.setState({
			selectedPurchaseableItems: selectedPurchaseableItems,
			selectedUpgrades: selectedUpgrades
		})
	}

	/******************************** Prop Computers *******************************/

	// These functions are not involved in updating the state.
	// After the state has been updated, the functions compute state-based values
	// that are passed to children of `this` as props during render.

	itemStatus(item) {
		let priorItems = Filter.priorItems(this.props.user.purchasedItems,
			this.state.selectedPurchaseableItems,
			this.state.selectedUpgrades)

		let status = {ineligible: false, excluded: false, upgradeOnly: false}
		if (!Filter.eligibleItems(priorItems,Item.all,Qualification.all).has(item)) {
			status.ineligible = true
			status.qualifierItems = item.qualifierItems
		}

		// is the item excluded?
		let excluderItems = Exclusion.all
			.filter(e => ((e.excludedItem == item) && (priorItems.has(e.excluderItem))))
			.map(e => e.excluderItem)
		if (excluderItems.length > 0) {
			status.excluded = true
			status.excluderItems = excluderItems
		}

		// is the item upgradeOnly?
		let upgradeFromItems = Upgrade.all
			.filter(u => u.upgradeToItem == item && priorItems.has(u.upgradeFromItem))
			.map(u => u.upgradeFromItem)
		if (upgradeFromItems.length > 0) {
			status.upgradeOnly = true
			status.upgradeFromItems = upgradeFromItems
		}

		return status
	}

	subtotal() {
		let newPurchaseSubtotal = this.state.selectedPurchaseableItems
			.reduce((sum,item) => sum + item.itemType.currentPrice,0)
		let upgradeSubtotal = this.state.selectedUpgrades
			.filter(u => this.props.availableUpgrades.has(u))
			.reduce((sum,u) => sum + u.upgradePrice,0)
		return newPurchaseSubtotal + upgradeSubtotal
	}

	upgradeDescription(upgrade) {
		let fromItem = upgrade.upgradeFromItem
		let toItem = upgrade.upgradeToItem
		return "Upgrade from " + fromItem.name + " to " + toItem.name
	}

	purchaseDescription(item) {
		return "Purchase " + item.name
	}

	upgradeDescriptions() {
		return this.state.selectedUpgrades
			.reduce((d,u) => d + this.upgradeDescription(u) + '\n','')
	}

	purchaseDescriptions() {
		return this.state.selectedPurchaseableItems
			.reduce((d,i) => d + this.purchaseDescription(i) + '\n','')
	}

	// returns a description of all currently selected purchases and upgrades
	description() {
		return this.purchaseDescriptions() + '\n' + this.upgradeDescriptions()
	}

	/******************* Render ********************/

	render() {
		let priorItems = Filter.priorItems(this.props.user.purchasedItems,
			this.state.selectedPurchaseableItems,
			this.state.selectedUpgrades)
		
		return (
			<div className="purchaseable-items-container">
				<div className="flex-container">
					<div className="flex-item">
						<PurchasedItemsTable
							purchasedItems = {this.props.user.purchasedItems}
						/>
					</div>
					<div className="flex-item">
						<PurchaseableItemsTable
							purchaseableItemsByType = {this.props.purchaseableItemsByType}
							selectedItems = {this.state.selectedPurchaseableItems}
							handleSelection = {this.handlePurchaseableItemSelection}
							status = {this.itemStatus}
						/>
					</div>
				</div>
				<ConversionsContainer
					upgrades = {this.props.availableUpgrades}
					exchanges = {this.props.availableExchanges}
					priorItems = {priorItems}
					selectedUpgrades = {this.state.selectedUpgrades}
					handleSelection = {this.handleUpgradeSelection}
					user = {this.props.user}
					status = {this.itemStatus}
					showTransactionComplete = {this.props.showTransactionComplete}
				/>
				<h3>Checkout: </h3> 
	            <Elements>
	            	<CheckoutForm 
	            		amount = {this.subtotal()}
	            		description = {this.description}
	            		purchases = {this.state.selectedPurchaseableItems}
	            		upgrades = {this.state.selectedUpgrades}
	            		showTransactionComplete = {this.props.showTransactionComplete}
	            	/>
	            </Elements>
			</div>
		)
	}
}

export default PurchaseContainer