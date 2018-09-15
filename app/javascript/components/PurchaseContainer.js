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

		let selectedPurchaseableItemIds = new Set()
		this.state = {
			enabledPurchaseableItemIds: this.enabledPurchaseableItems(selectedPurchaseableItemIds),
			selectedPurchaseableItemIds: selectedPurchaseableItemIds,
		}
	}

	handlePurchaseableSelection(e) {
	    let id = parseInt(e.target.getAttribute('id'),10)
	    let newSelectedItemIds = new Set(this.state.selectedPurchaseableItemIds) 
	    if (e.target.checked) {
	    	newSelectedItemIds.add(id)	
	    } else {
	    	newSelectedItemIds.delete(id)

		    // deselecting an item may make other already selected items ineligible
		    // if so, deselect the ineligible items automatically
		    let eligibleItemIds = Filter.eligibleItems(
		    	new Set([...newSelectedItemIds,...this.props.purchasedItemIds]),
		    	this.props.itemIds,
		    	this.props.qualifications)
		    newSelectedItemIds = new Set([...newSelectedItemIds]
		    	.filter(i => eligibleItemIds.has(i)))
	    }

	    this.setState({
	    	enabledPurchaseableItemIds: this.enabledPurchaseableItems(newSelectedItemIds),
	    	selectedPurchaseableItemIds : newSelectedItemIds
	    })
	}

	enabledPurchaseableItems(selectedItemIds) {
		return Filter.enabledPurchaseableItems(
			this.props.purchasedItemIds,
			selectedItemIds,
			this.props.itemIds,
			this.props.exclusions,
			this.props.upgrades,
			this.props.qualifications)
	}

	render() {
		return (
			<div className="purchaseable-items-container">
				<PurchaseableItemsTable
					itemTypes = {this.props.itemTypes}
					purchaseableItemIds = {this.props.purchaseableItemIds}
					enabledItemIds = {this.state.enabledPurchaseableItemIds}
					selectedItemIds = {this.state.selectedPurchaseableItemIds}
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