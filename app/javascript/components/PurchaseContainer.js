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
import Network from '../helpers/Network.js'

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
		this.loadPartnerships = this.loadPartnerships.bind(this)
		this.handleInviteeChange = this.handleInviteeChange.bind(this)
		this.newPartnerships = this.newPartnerships.bind(this)
		// this.handlePartnerSubmission = this.handlePartnerSubmission.bind(this)

		this.loadPartnerships();

		this.state = {
			selectedPurchaseableItems: new RecordCollection(),
			selectedUpgrades: new RecordCollection()
		}
	}

	/******************************** Loading ************************************/
	loadPartnerships() {
		let partnershipPromises = [
			Network.get_request('/api/buyer_partnerships'),
			Network.get_request('/api/invitee_partnerships')
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

	handleInviteeChange(partnershipId,invitee) {
		//debugger;
		let buyerPartnerships = [...this.state.buyerPartnerships]
		let partnership = buyerPartnerships.find(bp => bp.id == partnershipId)
		partnership.invitee = invitee
		this.setState({buyerPartnerships: buyerPartnerships})
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

		// if buyerPartnerships contains a partnership for an item that is no
		// longer in priorItems, remove the partnership
		let buyerPartnerships = this.state.buyerPartnerships.filter(bp => 
			priorItems.has(Item.byId(bp.item.id)))

		// if priorItems contains any partneredItem for which no buyerPartnership
		// yet exists, create a new buyer partnership
		let partneredItems = priorItems.filter(
			pi => pi.partnered && 
				!this.state.buyerPartnerships.find(bp => bp.item.id == pi.id)
		)
		let newPartnerships = partneredItems.map(pi => ({
			// random negative id - not in Db yet, but needs key
			id: Math.ceil(Math.random()*(-1000000)),
			buyer: this.props.user,
			item: pi,
			invitee: null,
			sale: null
		}))

		this.setState({
			selectedPurchaseableItems: selectedPurchaseableItems,
			selectedUpgrades: selectedUpgrades,
			buyerPartnerships: [...buyerPartnerships,...newPartnerships]
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

	newPartnerships() {
		if (this.state.buyerPartnerships) {
			return this.state.buyerPartnerships.filter(bp => !bp.sale)	
		}
		return null
	}

	/******************* Render ********************/

	render() {
		let priorItems = Filter.priorItems(this.props.user.purchasedItems,
			this.state.selectedPurchaseableItems,
			this.state.selectedUpgrades)
		let partnershipsHeading = null
		if ((this.state.buyerPartnerships && this.state.buyerPartnerships.length > 0) ||
			(this.state.inviteePartnerships && this.state.inviteePartnerships.length > 0)) {
			partnershipsHeading = <h3 className="partnerships-title">Partnerships</h3>
		}
		let currentItems = Filter.currentItems(this.props.user.purchasedItems)
		let expiredItems = Filter.expiredItems(this.props.user.purchasedItems)
		let expiredItemsTable = expiredItems.size > 0 ?
			<div className="flex-item">
				<PurchasedItemsTable
					purchasedItems = {expiredItems}
					title = "Past Purchases"
					msg = "You have not purchased admission to any activities that have passed"
				/>
			</div> :
			null 
		
		return (
			<div className="purchaseable-items-container">
				<div className="flex-container">
					<div className="flex-item">
						<PurchasedItemsTable
							purchasedItems = {currentItems}
							title = "Your Purchased Items"
							msg = "You haven't purchased any items yet"
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
					{expiredItemsTable}
				</div>
				<Timer startTime = {this.props.timeout * 60}/>
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
				{partnershipsHeading}
				<BuyerPartnershipsTable 
					partnerships = {this.state.buyerPartnerships}
					handleInviteeChange = {this.handleInviteeChange}
					currentUser = {this.props.user}
				/>
				<InviteePartnershipsTable
					partnerships = {this.state.inviteePartnerships}
				/><br/><br/><br/>
	            <Elements>
	            	<CheckoutForm 
	            		user = {this.props.user}
	            		amount = {this.subtotal()}
	            		description = {this.description}
	            		purchases = {this.state.selectedPurchaseableItems}
	            		upgrades = {this.state.selectedUpgrades}
	            		showTransactionComplete = {this.props.showTransactionComplete}
	            		newPartnerships = {this.newPartnerships()}
	            	/>
	            </Elements>
			</div>
		)
	}
}

export default PurchaseContainer