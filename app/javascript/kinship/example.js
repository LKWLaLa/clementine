let Kinship = require('./Kinship.js')
let Record = Kinship.Record
let RecordCollection = Kinship.RecordCollection

class ItemType extends Record {}
class Item extends Record {}
class Price extends Record {}
ItemType.hasMany({
	relatedModel: Item,
	foreignKey: 'itemType',
	aliasSingular: 'item',
	aliasPlural: 'items',
	through: null
})
ItemType.hasMany({
	relatedModel: Price,
	foreignKey: 'itemType',
	aliasSingular: 'price',
	aliasPlural: 'prices',
	through: null
})
Item.belongsTo({
	relatedModel: ItemType,
	foreignKey: 'itemType',
	aliasSingular: 'itemType',
	aliasPlural: 'itemTypes'
})
// an alias, just for fun
Item.belongsTo({
	relatedModel: ItemType,
	foreignKey: 'itemType',
	aliasSingular: 'category',
	aliasPlural: 'categories'
})
Item.hasMany({
	relatedModel: Price,
	foreignKey: null,
	aliasSingular: 'price',
	aliasPlural: 'prices',
	through: 'itemType' 
})

fullPass = new ItemType({
	id: 1,
	name: "Full Weekend Pass"
})

weekdayWorkshop = new ItemType({
	id: 2,
	name: "weekday Workshop"
})

dpType = new ItemType({
	id: 3,
	name: "dance pass"
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

tier1 = new Price({
	id: 1,
	name: "Tier 1",
	itemType: fullPass
})

tier2 = new Price({
	id: 2,
	name: "Tier 2",
	itemType: fullPass
})

workshopPrice = new Price({
	id: 3,
	name: "Default Workshop Price",
	itemType: weekdayWorkshop
})

tueWorkshopFollow = new Item({
	id: 3,
	name: "Tuesday Workshop Follow",
	itemType: weekdayWorkshop
})

// console.log(fpif.name)

// console.log(ItemType.all())
// console.log(fullPass.items)
// console.log(weekdayWorkshop.items)
// console.log(fpif.itemType.name)
// console.log(fpif.category.name)
console.log(fpif.prices.map(p => p.name))

// items = new RecordCollection([fpif,tueWorkshopFollow])
// console.log(items.all('prices'))

console.log(Item.byId(1))