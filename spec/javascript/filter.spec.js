import Filter from '../../app/javascript/helpers/Filter.js'
import expect from './customMatchers.js'
import Kinship, {Record, RecordCollection} from '../../app/javascript/kinship/Kinship.js'
import models, {Item,ItemType,Exclusion,Upgrade,Qualification} from '../../app/javascript/helpers/models.js'
let RC = RecordCollection

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function factory(model) {
	return function(obj) {
		if (!obj.id) {
			while (model.byId(obj.id = getRandomInt(1000000))) {}
		}
		return new model(obj)
	}
}

let EX = factory(Exclusion)
let UP = factory(Upgrade)
let QU = factory(Qualification)

describe('Filter', () => {
	let items = new RC()
	let exclusions = []
	let upgrades = []
	let qualifications = []
	let purchasedItems = new RC()
	let priorItems = new RC()

	// separate vars (no brackets) will make for more pleasant reading
	let i1,i2,i3,i4,i5,i6,i7,i8,i9,i10

	let type = new ItemType({
		id: 1,
		name: "Any Type"
	})

	function reset() {
		Kinship.resetDb()
		let i = []
		for (let j = 1; j <= 10; ++j) {
			i[j] = new Item({
				id: j,
				itemType: type
			})
		}
		
		i1 = i[1]
		i2 = i[2]
		i3 = i[3]
		i4 = i[4]
		i5 = i[5]
		i6 = i[6]
		i7 = i[7]
		i8 = i[8]
		i9 = i[9]
		i10 = i[10]
	}

	beforeAll(()=>{
		reset();
	})
	
	describe('excludedItems', () => {
		it('should return the excludedItems for the priorItems', () => {
			let exclusions = new RC([
				EX({excluderItem: i1,excludedItem: i3}),
				EX({excluderItem: i2,excludedItem: i5}),
				EX({excluderItem: i2,excludedItem: i6})
			])
			expect(Filter.excludedItems(new RC([i2,i4]),exclusions))
				.includesExactly([i5,i6])
		})

		it('should work with different exclusions', () => {
			let exclusions = new RC([
				EX({excluderItem: i1, excludedItem: i1}),
				EX({excluderItem: i2, excludedItem: i2}),
				EX({excluderItem: i1, excludedItem: i2})
			])
			expect(Filter.excludedItems(new RC([i2]),exclusions))
				.includesExactly([i2])
			expect(Filter.excludedItems(new RC([i1]),exclusions))
				.includesExactly([i1,i2])
		})
	})

	describe('upgradeToItems', () => {
		beforeEach(() => {
			priorItems = new RC([i2,i4])
			upgrades = new RC([
				UP({upgradeFromItem: i1,upgradeToItem: i3}),
				UP({upgradeFromItem: i2,upgradeToItem: i5}),
				UP({upgradeFromItem: i2,upgradeToItem: i6})
			])
		})

		it('should return the upgradeToItems for the priorItems', () => {
			expect(Filter.upgradeToItems(priorItems,upgrades))
				.includesExactly([i5,i6])
		})
	})

	describe('eligibleItems', () => {
		beforeEach(() => {
			items = new RC([i1,i2,i3,i4,i5])
			qualifications = new RC([
				QU({qualifierItem: i1, qualifiedItem: i5}),
				QU({qualifierItem: i2, qualifiedItem: i4}),
				QU({qualifierItem: i3, qualifiedItem: i4})
			])
		})
		
		it('should return the eligibleItems for the priorItems and the items', () => {
			expect(Filter.eligibleItems(new RC(),items,qualifications))
				.includesExactly([i1,i2,i3])
			expect(Filter.eligibleItems(new RC([i2]),items,qualifications))
				.includesExactly([i1,i2,i3,i4])
		})
	})

	describe('purchaseableItems', () => {
		beforeEach(() => {
			items = new RC([i1,i2,i3,i4])
			exclusions = new RC([
				EX({excluderItem: i1, excludedItem: i1}),
				EX({excluderItem: i2, excludedItem: i2}),
				EX({excluderItem: i1, excludedItem: i2})
			])
			upgrades = new RC([
				UP({upgradeFromItem: i2, upgradeToItem: i1}),
				UP({upgradeFromItem: i2, upgradeToItem: i3})
			])
		})
		
		it('should return all items if purchasedItems is empty', () => {
			expect(Filter.purchaseableItems(new RC(),items,exclusions,upgrades))
				.includesExactly([i1,i2,i3,i4])
		})
		it('should return all items except the excluded ones when there are no upgrades', () => {
			expect(Filter.purchaseableItems(new RC([i1]),items,exclusions,upgrades))
				.includesExactly([i3,i4])
		})
		it('should function properly in a vareity of non-edge cases', () => {
			expect(Filter.purchaseableItems(new RC([i2]),items,exclusions,upgrades))
				.includesExactly([i4])
			expect(Filter.purchaseableItems(new RC([i1,i2]),items,exclusions,upgrades))
				.includesExactly([i4])
		})
	})

	describe('enabledPurchaseableItems', () => {
		beforeEach(() => {
			items = new RC([i1,i2,i3,i4])
			exclusions = new RC([
				EX({excluderItem: i1, excludedItem: i1}),
				EX({excluderItem: i2, excludedItem: i2}),
				EX({excluderItem: i3, excludedItem: i3}),
				EX({excluderItem: i4, excludedItem: i4}),
				EX({excluderItem: i1, excludedItem: i2})
			])
			upgrades = new RC([
				UP({upgradeFromItem: i2, upgradeToItem: i1})
			])
			qualifications = new RC([
				QU({qualifierItem: i1, qualifiedItem: i4}),
				QU({qualifierItem: i2, qualifiedItem: i4})
			])
		})

		it(`should return purchaseableItems that are not excludedItems
			 or upgradeToItems of the currently selected items, for which the
			 user is eligible based on purchased items and selected items`, () => {

			let enabledPurchaseableItems = (purchasedItems,selectedItems) => {
				return Filter.enabledPurchaseableItems(
				 	purchasedItems,
				 	selectedItems,
				 	items,
				 	exclusions,
				 	upgrades,
				 	qualifications)
			}
			expect(enabledPurchaseableItems(new RC(), new RC()))
				.includesExactly([i1,i2,i3])
			expect(enabledPurchaseableItems(new RC([i1]), new RC()))
				.includesExactly([i3,i4])
			expect(enabledPurchaseableItems(new RC(), new RC([i1])))
				.includesExactly([i1,i3,i4])
			expect(enabledPurchaseableItems(new RC([i1]), new RC([i3])))
				.includesExactly([i3,i4])
			expect(enabledPurchaseableItems(new RC([i1,i3]), new RC()))
				.includesExactly([i4])
			expect(enabledPurchaseableItems(new RC([i1,i3,i4]), new RC()))
				.includesExactly([])
			expect(enabledPurchaseableItems(new RC(), new RC([i1,i3,i4])))
				.includesExactly([i1,i3,i4])
			expect(enabledPurchaseableItems(new RC(), new RC([i1,i4])))
				.includesExactly([i1,i3,i4])
		})
	})

	describe('ineligibleItems', () => {
		beforeEach(() => {
			qualifications = new RC([
				QU({qualifierItem: i1, qualifiedItem: i4}),
				QU({qualifierItem: i2, qualifiedItem: i4}),
				QU({qualifierItem: i5, qualifiedItem: i6}),
				QU({qualifierItem: i8, qualifiedItem: i10}),
				QU({qualifierItem: i9, qualifiedItem: i10})
			])
		})

		it('should return all restricted items if the user has not made a purchase', () => {
			expect(Filter.ineligibleItems(new RC(),qualifications))
				.includesExactly([i4,i6,i10])
		})

		it('should return all restricted items if the user has not made a qualifier purchase', () => {
			expect(Filter.ineligibleItems(new RC([i3,i7]),qualifications))
				.includesExactly([i4,i6,i10])
		})
		
		it('should return those restricted items for which the user has not purchased a qualifier item', () => {
			expect(Filter.ineligibleItems(new RC([i8]),qualifications))
				.includesExactly([i4,i6])
			expect(Filter.ineligibleItems(new RC([i2,i8]),qualifications))
				.includesExactly([i6])
		})
	})

	describe('priorItems', () => {
		let u1;
		let selectedPurchaseableItems;
		let selectedUpgrades;

		beforeAll(() => {
			reset()
			u1 = UP({upgradeFromItem: i1, upgradeToItem: i2})
		})

		describe('no purchasedItems', () => {
			describe('no selectedPurchaseableItems', () => {
				it('returns no items', () => {
					expect(Filter.priorItems(
						new RC(),
						new RC(),
						new RC()).size).toEqual(0)
				})
			})

			describe('some selectedPurchaseableItems', () => {
				it('returns the selectedPurchaseableItems', () => {
					expect(Filter.priorItems(
						new RC(),
						new RC([i1,i2]),
						new RC()))
						.includesExactly([i1,i2])
				})
			})
		})

		describe('some purchasedItems', () => {
			describe('no selectedPurchaseableItems', () => {
				describe('no selectedUpgrades', () => {
					it('returns the purchasedItems', () => {
						expect(Filter.priorItems(
							new RC([i1,i6]),
							new RC(),
							new RC()))
							.includesExactly([i1,i6])
					})
				})

				describe('some selectedUpgrades', () => {
					it('returns (purchasedItems U upgradeToItems) - upgradeFromItems', () =>{
						expect(Filter.priorItems(
							new RC([i1,i6]),
							new RC(),
							new RC([u1])))
							.includesExactly([i2,i6])
					})
				})
			})

			describe('some selectedPurchaseableItems', () => {
				describe('no selectedUpgrades', () => {
					it('returns purchasedItems U selectedPurchaseableItems', () => {
						expect(Filter.priorItems(
							new RC([i1,i6]),
							new RC([i4]),
							new RC()))
							.includesExactly([i1,i4,i6])
					})
				})

				describe('some selectedUpgrades', () => {
					it('returns purchasedItems U selectedPurchaseableItems U upgradeTos - upgradeFroms', () => {
						expect(Filter.priorItems(
							new RC([i1,i6]),
							new RC([i4]),
							new RC([u1])))
							.includesExactly([i2,i4,i6])
					})
				})
			})
		})
	})	
})
