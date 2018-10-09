import React from 'react'
import {Elements} from 'react-stripe-elements'
import PurchaseableItemsTable from './PurchaseableItemsTable.js'
import PurchasedItemsTable from './PurchasedItemsTable.js'
import ConversionsContainer from './ConversionsContainer.js'
import CheckoutForm from './CheckoutForm.js'
import Filter from '../helpers/Filter.js'
import Timer from './Timer'
import BuyerPartnershipsTable from './BuyerPartnershipsTable.js'
import InviteePartnershipsTable from './InviteePartnershipsTable.js'
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
		this.onPartnerSelected = this.onPartnerSelected.bind(this)
		this.loadPartnerships = this.loadPartnerships.bind(this)
		// this.handlePartnerSubmission = this.handlePartnerSubmission.bind(this)

		this.loadPartnerships();

		this.state = {
			selectedPurchaseableItems: new RecordCollection(),
			selectedUpgrades: new RecordCollection()
		}
	}

	/******************************** Loading ************************************/
	loadPartnerships() {
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

		let partnershipPromises = [
			fetch('/api/buyer_partnerships',init),
			fetch('/api/invitee_partnerships',init)
		]

		Promise.all(partnershipPromises)
			.then(values => {
				let jsonPromises = []
				values.forEach(value => {
					jsonPromises.push(value.json())
				})
				return Promise.all(jsonPromises)
			})
			.then(partnerships => {
			this.setState({
				buyerPartnerships: partnerships[0],
				inviteePartnerships: partnerships[1]
			})
		})
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

	// react-autosuggest
	onPartnerSelected(event, {
		suggestion,
		suggestionValue,
		suggestionIndex,
		sectionIndex,
		method }) {
		this.setState({
		  selection: suggestion
		})
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

		// is the item ineligible?
		if (!Filter.eligibleItems(priorItems,Item.all,Qualification.all).has(item)) {
			status.ineligible = true
			status.qualifierItems = item.qualifierItems
		}

		// is the item excluded?
		if (priorItems.allRelated('excludedItems').has(item)) {
			status.excluded = true
			status.excluderItems = priorItems.filter(i => item.excluderItems.has(i))
		}

		// is the item upgradeOnly?
		if (priorItems.allRelated('upgradeToItems').has(item)) {
			status.upgradeOnly = true
			status.upgradeFromItems = priorItems.filter(i => item.upgradeFromItems.has(i))
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
		let partnershipsHeading = this.state.buyerPartnerships ||
			this.state.inviteePartnerships ?
			<h2>Partnerships</h2> :
			null
		let buyerPartnershipsElement = this.state.buyerPartnerships ?
			<BuyerPartnershipsTable 
				partnerships = {this.state.buyerPartnerships}
				handlePartnerChange = {this.handlePartnerChange}
			/> :
			null
		let inviteePartnershipsElement = this.state.inviteePartnerships ?
			<InviteePartnershipsTable
				partnerships = {this.state.inviteePartnerships}
			/> :
			null

		
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
				<Timer startTime = {this.props.timeout * 60}/>
				{partnershipsHeading}
				{buyerPartnershipsElement}
				{inviteePartnershipsElement}
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
				<h3 className="checkout-title"> Checkout</h3> 
	            <Elements>
	            	<CheckoutForm 
	            		user = {this.props.user}
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