import Filter from '../../app/javascript/helpers/Filter.js'


describe('Filter', () => {
	let itemIds = new Set()
	let exclusions = []
	let upgrades = []
	let qualifications = []
	let purchasedItemIds = new Set()
	let priorItemIds = new Set()


	describe('excludedItems', () => {
		it('should return the excludedItems for the priorItemIds', () => {
			let exclusions = [
				{excluderItemId: 1,excludedItemId: 3},
				{excluderItemId: 2,excludedItemId: 5},
				{excluderItemId: 2,excludedItemId: 6}
			]
			expect([...Filter.excludedItems(new Set([2,4]),exclusions)].sort()).toEqual([5,6])
		})

		it('should work with different exclusions', () => {
			let exclusions = [
				{excluderItemId: 1, excludedItemId: 1},
				{excluderItemId: 2, excludedItemId: 2},
				{excluderItemId: 1, excludedItemId: 2}
			]
			expect([...Filter.excludedItems(new Set([2]),exclusions)].sort()).toEqual([2])
			expect([...Filter.excludedItems(new Set([1]),exclusions)].sort()).toEqual([1,2])
		})
	})

	describe('upgradeToItems', () => {
		beforeEach(() => {
			priorItemIds = new Set([2,4])
			upgrades = [
				{upgradeFromItemId: 1,upgradeToItemId: 3},
				{upgradeFromItemId: 2,upgradeToItemId: 5},
				{upgradeFromItemId: 2,upgradeToItemId: 6}
			]
		})

		it('should return the upgradeToItems for the priorItemIds', () => {
			expect([...Filter.upgradeToItems(priorItemIds,upgrades)].sort()).toEqual([5,6])
		})
	})

	describe('eligibleItems', () => {
		beforeEach(() => {
			itemIds = new Set([1,2,3,4,5])
			qualifications = [
				{qualifierItemId: 1, qualifiedItemId: 5},
				{qualifierItemId: 2, qualifiedItemId: 4},
				{qualifierItemId: 3, qualifiedItemId: 4}
			]		
		})
		
		it('should return the eligibleItems for the priorItemIds and the itemIds', () => {
			expect([...Filter.eligibleItems(new Set(),itemIds,qualifications)].sort()).toEqual([1,2,3])
			expect([...Filter.eligibleItems(new Set([2]),itemIds,qualifications)].sort()).toEqual([1,2,3,4])
		})
	})

	describe('purchaseableItems', () => {
		beforeEach(() => {
			itemIds = new Set([1,2,3,4])
			exclusions = [
				{excluderItemId: 1, excludedItemId: 1},
				{excluderItemId: 2, excludedItemId: 2},
				{excluderItemId: 1, excludedItemId: 2}
			]
			upgrades = [
				{upgradeFromItemId: 2, upgradeToItemId: 1},
				{upgradeFromItemId: 2, upgradeToItemId: 3}
			]
		})
		
		it('should return all itemIds if purchasedItemIds is empty', () => {
			expect([...Filter.purchaseableItems(new Set(),itemIds,exclusions,upgrades)].sort())
				.toEqual([1,2,3,4])
		})
		it('should return all itemIds except the excluded ones when there are no upgrades', () => {
			expect([...Filter.purchaseableItems(new Set([1]),itemIds,exclusions,upgrades)].sort())
				.toEqual([3,4])
		})
		it('should function properly in a vareity of non-edge cases', () => {
			expect([...Filter.purchaseableItems(new Set([2]),itemIds,exclusions,upgrades)].sort())
				.toEqual([4])
			expect([...Filter.purchaseableItems(new Set([1,2]),itemIds,exclusions,upgrades)].sort())
				.toEqual([4])
		})
	})

	describe('enabledPurchaseableItems', () => {
		beforeEach(() => {
			itemIds = new Set([1,2,3,4])
			exclusions = [
				{excluderItemId: 1, excludedItemId: 1},
				{excluderItemId: 2, excludedItemId: 2},
				{excluderItemId: 3, excludedItemId: 3},
				{excluderItemId: 4, excludedItemId: 4},
				{excluderItemId: 1, excludedItemId: 2},
			]
			upgrades = [
				{upgradeFromItemId: 2, upgradeToItemId: 1},
			]
			qualifications = [
				{qualifierItemId: 1, qualifiedItemId: 4},
				{qualifierItemId: 2, qualifiedItemId: 4},
			]
		})

		it(`should return purchaseableItems that are not excludedItems
			 or upgradeToItems of the currently selected items, for which the
			 user is eligible based on purchased items and selected items`, () => {

			let wrapEnabledPurchaseableItems = (purchasedItemIds,selectedItemIds) => {
				return [...Filter.enabledPurchaseableItems(
				 	purchasedItemIds,
				 	selectedItemIds,
				 	itemIds,
				 	exclusions,
				 	upgrades,
				 	qualifications)]
				.sort()
			}
			expect(wrapEnabledPurchaseableItems(new Set(), new Set())).toEqual([1,2,3])
			expect(wrapEnabledPurchaseableItems(new Set([1]), new Set())).toEqual([3,4])
			expect(wrapEnabledPurchaseableItems(new Set(), new Set([1]))).toEqual([1,3,4])
			expect(wrapEnabledPurchaseableItems(new Set([1]), new Set([3]))).toEqual([3,4])
			expect(wrapEnabledPurchaseableItems(new Set([1,3]), new Set())).toEqual([4])
			expect(wrapEnabledPurchaseableItems(new Set([1,3,4]), new Set())).toEqual([])
			expect(wrapEnabledPurchaseableItems(new Set(), new Set([1,3,4]))).toEqual([1,3,4])
			expect(wrapEnabledPurchaseableItems(new Set(), new Set([1,4]))).toEqual([1,3,4])
		})
	})

	describe('ineligibleItems', () => {
		beforeEach(() => {
			qualifications = [
				{qualifierItemId: 1, qualifiedItemId: 4},
				{qualifierItemId: 2, qualifiedItemId: 4},
				{qualifierItemId: 5, qualifiedItemId: 6},
				{qualifierItemId: 8, qualifiedItemId: 10},
				{qualifierItemId: 9, qualifiedItemId: 10}
			]
		})

		it('should return all restricted items if the user has not made a purchase', () => {
			expect([...Filter.ineligibleItems(new Set(),qualifications)]
				.sort((a,b) => a-b))
				.toEqual([4,6,10])
		})

		it('should return all restricted items if the user has not made a qualifier purchase', () => {
			expect([...Filter.ineligibleItems(new Set([3,7]),qualifications)]
				.sort((a,b) => a-b))
				.toEqual([4,6,10])
		})
		
		it('should return those restricted items for which the user has not purchased a qualifier item', () => {
			expect([...Filter.ineligibleItems(new Set([8]),qualifications)]
				.sort((a,b) => a-b))
				.toEqual([4,6])
			expect([...Filter.ineligibleItems(new Set([2,8]),qualifications)]
				.sort((a,b) => a-b))
				.toEqual([6])
		})
	})

	describe('priorItems', () => {
		let upgrade;
		let selectedPurchaseableItemIds;
		let selectedUpgradeIds;

		beforeEach(() => {
			// items
			// 1 : full pass intermediate follow
			// 2 : full pass intermediate lead
			// 3 : dance pass
			// 4 : tuesday workshop follow
			// 5 : tuesday workshop lead
			// 6 : contest entry
			upgrade = {
				1 : {upgradeFromItemId: 1, upgradeToItemId: 2},
				2 : {upgradeFromItemId: 2, upgradeToItemId: 1},
				3 : {upgradeFromItemId: 3, upgradeToItemId: 1},
				4 : {upgradeFromItemId: 3, upgradeToItemId: 2},
				5 : {upgradeFromItemId: 4, upgradeToItemId: 5},
				6 : {upgradeFromItemId: 5, upgradeToItemId: 4}
			}
		})

		describe('no purchasedItemIds', () => {
			beforeEach(() => {
				purchasedItemIds = new Set()
				selectedUpgradeIds = new Set()
			})

			describe('no selectedPurchaseableItemIds', () => {
				beforeEach(() => {
					selectedPurchaseableItemIds = new Set()
				})
				it('returns no items', () => {
					expect(Filter.priorItems(
						purchasedItemIds,
						selectedPurchaseableItemIds,
						selectedUpgradeIds,
						upgrade).size).toEqual(0)
				})
			})

			describe('some selectedPurchaseableItemIds', () => {
				beforeEach(() => {
					selectedPurchaseableItemIds = new Set([1,2])
				})
				it('returns the selectedPurchaseableItemIds', () => {
					expect([...Filter.priorItems(
							purchasedItemIds,
							selectedPurchaseableItemIds,
							selectedUpgradeIds,
							upgrade)]
							.sort())
						.toEqual([1,2])
				})
			})
		})

		describe('some purchasedItemIds', () => {
			beforeEach(() => {
				purchasedItemIds = new Set([1,6])
			})

			describe('no selectedPurchaseableItemIds', () => {
				beforeEach(() => {
					selectedPurchaseableItemIds = new Set()
				})

				describe('no selectedUpgradeIds', () => {
					beforeEach(() => {
						selectedUpgradeIds = new Set()
					})

					it('returns the purchasedItemIds', () => {
						expect([...Filter.priorItems(
							purchasedItemIds,
							selectedPurchaseableItemIds,
							selectedUpgradeIds,
							upgrade)]
							.sort())
							.toEqual([1,6])
					})
				})

				describe('some selectedUpgradeIds', () => {
					beforeEach(() => {
						selectedUpgradeIds = new Set([1])
					})

					it('returns (purchasedItemIds U upgradeToItemIds) - upgradeFromItemIds', () =>{
						expect([...Filter.priorItems(
							purchasedItemIds,
							selectedPurchaseableItemIds,
							selectedUpgradeIds,
							upgrade)]
							.sort())
							.toEqual([2,6])
					})
				})
			})

			describe('some selectedPurchaseableItemIds', () => {
				beforeEach(() => {
					selectedPurchaseableItemIds = new Set([4])
				})

				describe('no selectedUpgradeIds', () => {
					beforeEach(() => {
						selectedUpgradeIds = new Set()
					})

					it('returns purchasedItemIds U selectedPurchaseableItemIds', () => {
						expect([...Filter.priorItems(
							purchasedItemIds,
							selectedPurchaseableItemIds,
							selectedUpgradeIds,
							upgrade)]
							.sort())
							.toEqual([1,4,6])
					})
				})

				describe('some selectedUpgradeIds', () => {
					beforeEach(() => {
						selectedUpgradeIds = new Set([1])
					})

					it('returns purchasedItemIds U selectedPurchaseableItemIds U upgradeToIds - upgradeFromIds', () => {
						expect([...Filter.priorItems(
							purchasedItemIds,
							selectedPurchaseableItemIds,
							selectedUpgradeIds,
							upgrade)]
							.sort())
							.toEqual([2,4,6])
					})
				})
			})
		})
	})	
})
