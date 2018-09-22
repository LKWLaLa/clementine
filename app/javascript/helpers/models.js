let Kinship = require('../kinship/Kinship.js')
let Record = Kinship.Record
let RecordCollection = Kinship.RecordCollection

class ItemType extends Record {}
class Item extends Record {}
class Price extends Record {}
class Sale extends Record {}
class Exclusion extends Record {}
class Upgrade extends Record {}
class Qualification extends Record {}

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
Item.hasMany({
	relatedModel: Price,
	foreignKey: null,
	aliasSingular: 'price',
	aliasPlural: 'prices',
	through: 'itemType' 
})
Item.hasMany({
	relatedModel: Exclusion,
	foreignKey: 'excluderItem',
	aliasSingular: 'excluderExcluded',
	aliasPlural: 'excluderExcludeds'
})
Item.hasMany({
	relatedModel: Item,
	foreignKey: null,
	aliasSingular: 'excludedItem',
	aliasPlural: 'excludedItems',
	through: 'excluderExcludeds'
})

Price.belongsTo({
	relatedModel: ItemType,
	foreignKey: 'itemType',
	aliasSingular: 'itemType',
	aliasPlural: 'itemTypes'
})
Price.hasMany({
	relatedModel: Item,
	foreignKey: null,
	aliasSingular: 'item',
	aliasPlural: 'items',
	through: 'itemType'
})
Price.hasMany({
	relatedModel: Sale,
	foreignKey: 'price',
	aliasSingular: 'sale',
	aliasPlural: 'sales',
	through: null
})

Sale.belongsTo({
	relatedModel: Price,
	foreignKey: 'price',
	aliasSingular: 'price',
	aliasPlural: 'prices'
})
Sale.belongsTo({
	relatedModel: Item,
	foreignKey: 'item',
	aliasSingular: 'item',
	aliasPlural: 'items'
})

Exclusion.belongsTo({
	relatedModel: Item,
	foreignKey: 'excluderItem',
	aliasSingular: 'excluderItem',
	aliasPlural: 'excluderItems'
})
Exclusion.belongsTo({
	relatedModel: Item,
	foreignKey: 'excludedItem',
	aliasSingular: 'excludedItem',
	aliasPlural: 'excludedItems'
})

Upgrade.belongsTo({
	relatedModel: Item,
	foreignKey: 'upgradeToItem',
	aliasSingular: 'upgradeToItem',
	aliasPlural: 'upgradeToItems'
})
Upgrade.belongsTo({
	relatedModel: Item,
	foreignKey: 'upgradeFromItem',
	aliasSingular: 'upgradeFromItem',
	aliasPlural: 'upgradeFromItems'
})

Qualification.belongsTo({
	relatedModel: Item,
	foreignKey: 'qualifierItem',
	aliasSingular: 'qualifierItem',
	aliasPlural: 'qualifierItems'
})
Qualification.belongsTo({
	relatedModel: Item,
	foreignKey: 'qualifiedItem',
	aliasSingular: 'qualifiedItem',
	aliasPlural: 'qualifiedItems'
})

module.exports.Item = Item
module.exports.ItemType = ItemType
module.exports.Price = Price
module.exports.Sale = Sale
module.exports.Exclusion = Exclusion
module.exports.Upgrade = Upgrade
module.exports.Qualification = Qualification


















