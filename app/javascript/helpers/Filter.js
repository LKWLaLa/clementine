class Filter {
	static excludedItems(priorItemIds,exclusions) {
	  return new Set(exclusions
	    .filter(e => priorItemIds.has(e.excluderItemId))
	    .map(e => e.excludedItemId))
	}

	static upgradeToItems(priorItemIds,upgrades) {
	  return new Set(upgrades
	    .filter(u => priorItemIds.has(u.upgradeFromItemId))
	    .map(u => u.upgradeToItemId))
	}

	// items that, based on priorItemIds, the user is eligible to purchase because
	// (1) item i requires no qualifications or
	// (2) one of priorItemIds qualifies the user to purchase i
	static eligibleItems(priorItemIds,itemIds,qualifications) {
	  // items that the user has qualified to purchases based on priorItems
	  let qualifiedItemIds = new Set(qualifications
	    .filter(q => priorItemIds.has(q.qualifierItemId))
	    .map(q => q.qualifiedItemId))

	  // items that require a qualifying purchase
	  let restrictedItemIds = new Set(qualifications
	    .map(q => q.qualifiedItemId))

	  // items that do not require a qualifying purchase
	  let unrestrictedItemIds = new Set([...itemIds]
	    .filter(i => !restrictedItemIds.has(i)))

	  return new Set([...qualifiedItemIds,...unrestrictedItemIds])
	}

	// Items that require a qualifying purchase, where none of priorItems
	// qualify the user for the purchase
	static ineligibleItems(priorItems,qualifications) {
		// items that require a qualifying purchase
		let restrictedItemIds = new Set(qualifications
	    	.map(q => q.qualifiedItemId))

		return new Set([...restrictedItemIds].filter(rId => qualifications
				.filter(q => q.qualifiedItemId == rId)
				.filter(q => priorItems.has(q.qualifierItemId))
				.length == 0
			)
		)
	}

	// Items that are not excluded or upgrade_to items (but may not be qualified for yet)
	// These are the items that should be displayed on the purchaseableItems Table, given
	// that the user has purchased prior_items.
	static purchaseableItems(purchasedItemIds,itemIds,exclusions,upgrades) {
	  return new Set([...itemIds]
	    .filter(i => !this.excludedItems(purchasedItemIds,exclusions).has(i))
	    .filter(i => !this.upgradeToItems(purchasedItemIds,upgrades).has(i)))
	}

	// Items that appear as enabled on the purchaseable items table
	// return set should contain (in priority order):
	// 	only purchaseablItems(purchasedItemIds,...)
	// 	all selectedItemIds
	// 	no items excluded by or upgradeable from the selectedItems (except the selectedItems themselves)
	//  only items for which the user is eligible, based on purchased items and selected items
	static enabledPurchaseableItems(purchasedItemIds,
	    selectedItemIds,
	    itemIds,
	    exclusions,
	    upgrades,
	    qualifications) {
	  let priorItemIds = new Set([...purchasedItemIds,...selectedItemIds])
	  let a = new Set([...this.purchaseableItems(priorItemIds,itemIds,exclusions,upgrades)]
	    .filter(i => this.eligibleItems(priorItemIds,itemIds,qualifications).has(i)))
	  return new Set([...a,...selectedItemIds])
	}
}

export default Filter;