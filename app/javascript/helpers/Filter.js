let RecordCollection = require('../kinship/RecordCollection')

class Filter {
	static excludedItems(priorItems,exclusions) {
	  return new RecordCollection(exclusions
	    .filter(e => priorItems.has(e.excluderItem))
	    .map(e => e.excludedItem))
	}

	static upgradeToItems(priorItems,upgrades) {
	  return new RecordCollection(upgrades
	    .filter(u => priorItems.has(u.upgradeFromItem))
	    .map(u => u.upgradeToItem))
	}

	// items that, based on priorItems, the user is eligible to purchase because
	// (1) item i requires no qualifications or
	// (2) one of priorItems qualifies the user to purchase i
	static eligibleItems(priorItems,items,qualifications) {
	  // items that the user has qualified to purchases based on priorItems
	  let qualifiedItems = new RecordCollection(qualifications
	    .filter(q => priorItems.has(q.qualifierItem))
	    .map(q => q.qualifiedItem))

	  // items that require a qualifying purchase
	  let restrictedItems = new RecordCollection(qualifications
	    .map(q => q.qualifiedItem))

	  // items that do not require a qualifying purchase
	  let unrestrictedItems = new RecordCollection([...items]
	    .filter(i => !restrictedItems.has(i)))

	  return new RecordCollection([...qualifiedItems,...unrestrictedItems])
	}

	// Items that require a qualifying purchase, where none of priorItems
	// qualify the user for the purchase
	static ineligibleItems(priorItems,qualifications) {
		// items that require a qualifying purchase
		let restrictedItems = new RecordCollection(qualifications
	    	.map(q => q.qualifiedItem))

		return new RecordCollection([...restrictedItems].filter(r => qualifications
				.filter(q => (q.qualifiedItem == r && priorItems.has(q.qualifierItem)))
				.size == 0
			))
	}

	// Items that are not excluded or upgrade_to items (but may not be qualified for yet)
	// These are the items that should be displayed on the purchaseableItems Table, given
	// that the user has purchased prior_items.
	// PurchaseableItems include items that have sold out, since sold out items
	// should still be displayed to the user with a "sold out" message.
	static purchaseableItems(purchasedItems,items,exclusions,upgrades) {
	  return new RecordCollection([...items]
	    .filter(i => !this.excludedItems(purchasedItems,exclusions).has(i))
	    .filter(i => !this.upgradeToItems(purchasedItems,upgrades).has(i))
	  	.filter(i => !i.expiration || (new Date()) < (new Date(i.expiration)))
	  	)
	}

	// Items that appear as enabled on the purchaseable items table
	// return set should contain (in priority order):
	// 	only purchaseablItems(purchasedItems,...)
	// 	all selectedItems
	// 	no items excluded by or upgradeable from the selectedItems (except the selectedItems themselves)
	//  only items for which the user is eligible, based on purchased items and selected items
	static enabledPurchaseableItems(purchasedItems,
	    selectedItems,
	    items,
	    exclusions,
	    upgrades,
	    qualifications) {
	  let priorItems = new RecordCollection([...purchasedItems,...selectedItems])
	  let a = new RecordCollection([...this.purchaseableItems(priorItems,items,exclusions,upgrades)]
	    .filter(i => this.eligibleItems(priorItems,items,qualifications).has(i)))
	  return new RecordCollection([...a,...selectedItems])
	}

	// items that
	// (a) the user has purchased
	// (b) or that the user has signaled intent to purchase via selections on the 
	// 		purchaseableItems or upgrades tables
	// except items that the user has chosen to upgrade from, thereby
	// implying that the user will no longer own that item
	static priorItems(purchasedItems,
			selectedPurchaseableItems,
			selectedUpgrades) {
		let upgradeTos = selectedUpgrades.allRelated('upgradeToItem')
		let upgradeFroms = selectedUpgrades.allRelated('upgradeFromItem')
		return new RecordCollection([...purchasedItems,...selectedPurchaseableItems,...upgradeTos]
			.filter(i => !upgradeFroms.has(i)))
	}
}

export default Filter;