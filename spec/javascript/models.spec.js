// Will requiring Kinship separately from models create two copies of Kinship's
// db?
let Kinship = require('../../app/javascript/kinship/Kinship.js')
let models = require('../../app/javascript/helpers/models.js')
let Item = models.Item
let ItemType = models.ItemType
let Price = models.Price
let Sale = models.Sale
let Exclusion = models.Exclusion
let Upgrade = models.Upgrade
let Qualification = models.Qualification

describe('ItemType', () =>{
	let fullPass
	let weekdayWorkshop
	let fullPassMastersFollow
	let fullPassMastersLead

	beforeEach(() => {
		Kinship.db = {} // does this work as intended?

		fullPass = new ItemType({
			id: 1,
			name: "Full Weekend Pass"
		})

		weekdayWorkshop = new ItemType({
			id: 2,
			name: "weekday Workshop"
		})
	})

	describe('it has no items',() => {
		it('passes a dummy test', () => {
			expect(0).toEqual(0)	
		})
	})
})