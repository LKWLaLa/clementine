// Will requiring Kinship separately from models create two copies of Kinship's
// db?
let Kinship = require('../../app/javascript/kinship/Kinship.js')
let models = require('../../app/javascript/helpers/models.js')

let RC = Kinship.RecordCollection

let Item = models.Item
let ItemType = models.ItemType
let Price = models.Price
let Sale = models.Sale
let Exclusion = models.Exclusion
let Upgrade = models.Upgrade
let Qualification = models.Qualification

describe('ItemType', () =>{
	let fullPass, weekdayWorkshop
	let fpif, fpil
	let tuesdayWorkshopLead

	describe('it has some items and prices', ()=>{
		beforeAll(() => {
			Kinship.resetDb()
			
			fullPass = new ItemType({
				id: 1,
				name: "Full Weekend Pass"
			})

			weekdayWorkshop = new ItemType({
				id: 2,
				name: "Weekday Workshop"
			})

			fpif = new Item({
				id: 1,
				name: "Full Pass Intermediate Follow",
				itemType: fullPass
			})
			fpil = new Item({
				id: 2,
				name: "Full Pass Intermediate Lead",
				itemType: fullPass
			})

			tuesdayWorkshopLead = new Item({
				id: 8,
				name: "Tuesday Workshop Lead",
				itemType: weekdayWorkshop
			})
		})

		it('itemType.items returns itemType\'s items',()=>{
			expect(fullPass.items.equals(new RC([fpif,fpil]))).toBe(true)
		})

	})
})