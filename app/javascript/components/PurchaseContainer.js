import React, {Component} from 'react'
import {Elements} from 'react-stripe-elements'
import PurchaseableItemsTable from './PurchaseableItemsTable.js'
import CheckoutForm from './CheckoutForm.js'
import Filter from '../helpers/Filter.js'

class PurchaseContainer extends Component {
	// props should contain:
	// - itemTypes, an array of all itemTypes,
	//   where each itemType is an object with the following properties
	//   - id
	//   - name
	//   - currentPrice
	//   - items, an array of items
	//     where each item is an object with...
	//	   - id
	//     - name
	//     - itemType
	//     - currentPrice	
	// - itemIds, a set of all item Ids (computable from itemTypes, but convenient to have)
	// - purchasedItemIds, a set of integers identifying the items the user has
	//   purchased during previous sessions
	// - purchaseableItemIds, the items to be displayed on the purchaseableItemsTable
	// - exclusions, an array of all exclusions,
	//   where each exclusion is an object with the following properties
	//   - excluderItemId
	//   - excludedItemId
	// - upgrades, an array of all upgrades,
	//   where each upgrade is an object with the following properties
	//   - upgradeFromItemId
	//   - upgradeToItemId
	// - qualifications, an array of all qualifications,
	//   where each qualification is an object with the following properties
	//   - qualifierItemId
	//   - qualifiedItemId
	// - currentUser

	constructor(props) {
		super(props)
		this.handlePurchaseableSelection = this.handlePurchaseableSelection.bind(this)
		this.itemStatus = this.itemStatus.bind(this)

		this.state = {
			selectedPurchaseableItemIds: new Set()
		}
	}

	handlePurchaseableSelection(e) {
	    let id = parseInt(e.target.getAttribute('id'),10)
	    let newState = {...this.state}
	    newState.selectedPurchaseableItemIds = new Set(this.state.selectedPurchaseableItemIds) 
	    if (e.target.checked) {
	    	newState.selectedPurchaseableItemIds.add(id)	
	    } else {
	    	newState.selectedPurchaseableItemIds.delete(id)

	    	// deselecting an item may make other already selected items ineligible
		    // if so, deselect the ineligible items automatically
		    let eligibleItemIds = Filter.eligibleItems(
		    	new Set([...newState.selectedPurchaseableItemIds,...this.props.purchasedItemIds]),
		    	this.props.itemIds,
		    	this.props.qualifications)
		    newState.selectedPurchaseableItemIds = new Set([...newState.selectedPurchaseableItemIds]
		    	.filter(i => eligibleItemIds.has(i)))
	    }

	    this.setState(newState)
	}

	enabledPurchaseableItems(selectedPurchaseableItemIds) {
		return Filter.enabledPurchaseableItems(
			this.props.purchasedItemIds,
			selectedPurchaseableItemIds,
			this.props.itemIds,
			this.props.exclusions,
			this.props.upgrades,
			this.props.qualifications)
	}

	// Returns an object with properties
	// enabled:  boolean
	// message:  string
	// limitationType: string
	// limitingItems: array
	// if enabled == false, then message contains a description of why
	// the item is not enabled, or how to enable it
	// limitationType is one of 'ineligible', 'excluded', or 'upgradeOnly'
	// limitingItems contains itemIds.  which ones depends on the limitationType
	// 	limitationType == nil:  limitingItems is empty
	// 	limitationType == 'ineligible':  limitingItems contains the qualifierIds for the item
	// 	limitationType == 'excluded': limitingItems contains the 
	itemStatus(itemId) {
		let priorItems = new Set([...this.props.purchasedItemIds,...this.state.selectedPurchaseableItemIds])

		// is the item ineligible?
		let itemQualifications = this.props.qualifications
			.filter(q => q.qualifiedItemId == itemId)
		if (itemQualifications.length > 0) {
			let itemQualifiers = itemQualifications
				.filter(q => priorItems.has(q.qualifierItemId))
			if (itemQualifiers.length == 0) {
				// item should only be enabled if has already been selected
				return {enabled: this.state.selectedPurchaseableItemIds.has(itemId),
					message: 'requires one of the following: ',
					limitationType: 'ineligible',
					limitingItems: itemQualifications.map(q => q.qualifierItemId)}
			}
		}

		// is the item excluded?
		let excluderItemIds = this.props.exclusions
			.filter(e => e.excludedItemId == itemId)
			.filter(e => priorItems.has(e.excluderItemId))
			.map(e => e.excluderItemId)
		if (excluderItemIds.length > 0) {
			return {enabled: this.state.selectedPurchaseableItemIds.has(itemId),
				message: 'unavailable because you have selected:',
				limitationType: 'excluded',
				limitingItems: excluderItemIds}
		}

		// is the item upgradeOnly?
		let upgradeFromItemIds = this.props.upgrades
			.filter(u => u.upgradeToItemId == itemId)
			.filter(u => priorItems.has(u.upgradeFromItemId))
			.map(u => u.upgradeFromItemId)
		if (upgradeFromItemIds.length > 0) {
			return {enabled: this.state.selectedPurchaseableItemIds.has(itemId),
				message: 'unavailable because you have selected:',
				limitationType: 'upgradeOnly',
				limitingItems: upgradeFromItemIds}
		}

		return {enabled: true,
			message: null,
			limitationType: null,
			limitingItems: null
		}
	}

	status() {
		let status = {}
		this.props.purchaseableItemIds.forEach((itemId) => {
	    	status[itemId] = this.itemStatus(itemId)
	    })
	    return status
	}

	// itemTypes(selectedPurchaseableItemIds) {
	// 	let out = []
	// 	this.props.itemTypes.forEach((itemType) => {
	// 		// Shallow copy itemType.
	// 		// Should have only one non-primitive child, items.
	// 		// Be careful not to modify the children of items.
	// 		// We must not accidentally modify props.itemTypes
	// 		let type = {...itemType} 
	// 		type.items.forEach((oldItem) => {
	// 			if (!this.props.purchaseableItemIds.has(oldItem.id)) {continue}
	// 			let item = {...oldItem} // shallow copy, but item shouldn't contain any non-primitive children, so it's equivalent to a deep copy
	// 			if (this.props.)
	// 		})
	// 	})
	// }

	render() {
		return (
			<div className="purchaseable-items-container">
				<PurchaseableItemsTable
					purchaseableItemsByType = {this.props.purchaseableItemsByType}
					selectedItemIds = {this.state.selectedPurchaseableItemIds}
					status = {this.status()}
					items = {this.props.items}
					handleSelection = {this.handlePurchaseableSelection}
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