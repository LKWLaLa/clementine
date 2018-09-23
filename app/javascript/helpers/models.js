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
	name: 'items'
})
ItemType.hasMany({
	relatedModel: Price,
	foreignKey: 'itemType',
	name: 'prices'
})

Item.belongsTo({
	relatedModel: ItemType,
	foreignKey: 'itemType',
	name: 'itemType'
})
Item.hasMany({
	relatedModel: Price,
	name: 'prices',
	through: 'itemType',
	source: 'prices'
})

// Exclusion Aliasing
Item.hasMany({
	relatedModel: Exclusion,
	foreignKey: 'excluderItem',
	name: 'excluderExcludeds'
})
Item.hasMany({
	relatedModel: Item,
	name: 'excludedItems',
	through: 'excluderExcludeds',
	source: 'excludedItem'
})

Item.hasMany({
	relatedModel: Exclusion,
	foreignKey: 'excludedItem',
	name: 'excludedExcluders'
})
Item.hasMany({
	relatedModel: Item,
	name: 'excluderItems',
	through: 'excludedExcluders',
	source: 'excluderItem'
})

// Upgrade Aliasing
Item.hasMany({
	relatedModel: Upgrade,
	name: 'upgradeFromTos',
	foreignKey: 'upgradeFromItem',
})
Item.hasMany({
	relatedModel: Item,
	name: 'upgradeToItems',
	through: 'upgradeFromTos',
	source: 'upgradeToItem'
})

Item.hasMany({
	relatedModel: Upgrade,
	name: 'upgradeToFroms',
	foreignKey: 'upgradeToItem',
	
})
Item.hasMany({
	relatedModel: Item,
	name: 'upgradeFromItems',
	through: 'upgradeToFroms',
	source: 'upgradeFromItem'
})

// Qualifier Aliasing
Item.hasMany({
	relatedModel: Qualification,
	name: 'qualifierQualifieds',
	foreignKey: 'qualifierItem',
	
})
Item.hasMany({
	relatedModel: Item,
	name: 'qualifiedItems',
	through: 'qualifierQualifieds',
	source: 'qualifiedItem'
})

Item.hasMany({
	relatedModel: Qualification,
	name: 'qualifiedQualifiers',
	foreignKey: 'qualifiedItem',
	
})
Item.hasMany({
	relatedModel: Item,
	name: 'qualifierItem',
	through: 'qualifiedQualifiers',
	source: 'qualifierItem'
})

Price.belongsTo({
	relatedModel: ItemType,
	foreignKey: 'itemType',
	name: 'itemType'
})
Price.hasMany({
	relatedModel: Item,
	name: 'items',
	through: 'itemType',
	source: 'items'
})
Price.hasMany({
	relatedModel: Sale,
	foreignKey: 'price',
	name: 'sales'
})

Sale.belongsTo({
	relatedModel: Price,
	foreignKey: 'price',
	name: 'price'
})
Sale.belongsTo({
	relatedModel: Item,
	foreignKey: 'item',
	name: 'item'
})

Exclusion.belongsTo({
	relatedModel: Item,
	foreignKey: 'excluderItem',
	name: 'excluderItem'
})
Exclusion.belongsTo({
	relatedModel: Item,
	foreignKey: 'excludedItem',
	name: 'excludedItem'
})

Upgrade.belongsTo({
	relatedModel: Item,
	foreignKey: 'upgradeToItem',
	name: 'upgradeToItem'
})
Upgrade.belongsTo({
	relatedModel: Item,
	foreignKey: 'upgradeFromItem',
	name: 'upgradeFromItem'
})

Qualification.belongsTo({
	relatedModel: Item,
	foreignKey: 'qualifierItem',
	name: 'qualifierItem'
})
Qualification.belongsTo({
	relatedModel: Item,
	foreignKey: 'qualifiedItem',
	name: 'qualifiedItem'
})

module.exports.Item = Item
module.exports.ItemType = ItemType
module.exports.Price = Price
module.exports.Sale = Sale
module.exports.Exclusion = Exclusion
module.exports.Upgrade = Upgrade
module.exports.Qualification = Qualification
module.exports.resetDb = Kinship.resetDb
module.exports.getDb = Kinship.getDb


















