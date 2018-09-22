let Arbor = require('./RecordCollection.js')

// https://medium.com/front-end-hacking/creating-an-orm-with-javascript-b28f37ed528

db = {}
let RecordCollection = Arbor.RecordCollection

class Record {
	constructor(obj) {
		if (!obj.id) {throw "Missing id in record constructor"}
		let modelName = this.constructor.name
		
		// create database "table"
		// i.e. nested object within db which will contain all
		// of the instances of a model
		if (!db[modelName]) db[modelName] = {}
		if (!db[modelName]['records']) db[modelName]['records'] = {}
		db[modelName]['records'][obj.id] = obj;
		
		// construct getters
		const configuration = {};
		Object.keys(obj).forEach((prop) => {
			configuration[prop] = {
				get() {
					return db[modelName]['records'][obj.id][prop]
				}
			}
		})

		if (this.constructor.hasManyRelationships) {
			this.constructor.hasManyRelationships.forEach((r) => {
				if (r.through) {
					configuration[r.aliasPlural] = {
						get() {
							return this[r.through][r.aliasPlural]
						}
					}
				} else {
					configuration[r.aliasPlural] = {
						get() {
							let array = r.relatedModel.all().filter((record) => 
								record[r.foreignKey].id == obj.id
							)
							return new RecordCollection(array)
						}
					}
				}
			})
		}

		if (this.constructor.belongsToRelationships) {
			this.constructor.belongsToRelationships.forEach((r) => {
				configuration[r.aliasSingular] = {
					get() {
						return this[r.foreignKey]
					}
				}
			})
		}
		
		// define getters
		Object.defineProperties(this,configuration)

	}

	static all() {
		return Object.values(db[this.name]['records'])
	}
	
	static hasMany(options) {
		// expected keys in options
		// relatedModel, foreignKey, aliasSingular, aliasPlural
		
		// for example, an ItemType hasMany({
		//	relatedModel: Item,
		//	foreignKey: 'itemType',
		//  aliasSingular: 'item',
		//	aliasPlural: 'items',
		//	through: null
		// })

		// an ItemType hasMany({
		// 	relatedModel: Price,
		// 	foreignKey: 'itemType',
		// 	aliasSingular: 'price',
		// 	aliasPlural: 'items',
		// 	through: null
		// })

		// an item hasMany({
		//	relatedModel: Price,
		//	foreignKey: null,
		//  aliasSingular: 'price',
		//	aliasPlural: 'prices',
		//	through: itemType
		// })
		if (!this.hasManyRelationships) {this.hasManyRelationships = []}
		this.hasManyRelationships.push(options)
	}

	static belongsTo(options) {
		// an item belongsTo({
		// 	relatedModel: ItemType,
		// 	foreignKey: 'itemType',
		// 	aliasSingular: 'itemType',
		// 	aliasPlural: 'itemTypes',
		// 	through: null
		// })
		if (!this.belongsToRelationships) {this.belongsToRelationships = []}
		this.belongsToRelationships.push(options)

	}	
}

module.exports.RecordCollection = Arbor.RecordCollection
module.exports.Record = Record

// class ItemType extends Record {}
// class Item extends Record {}
// class Price extends Record {}
// ItemType.hasMany({
// 	relatedModel: Item,
// 	foreignKey: 'itemType',
// 	aliasSingular: 'item',
// 	aliasPlural: 'items',
// 	through: null
// })
// ItemType.hasMany({
// 	relatedModel: Price,
// 	foreignKey: 'itemType',
// 	aliasSingular: 'price',
// 	aliasPlural: 'prices',
// 	through: null
// })
// Item.belongsTo({
// 	relatedModel: ItemType,
// 	foreignKey: 'itemType',
// 	aliasSingular: 'category',
// 	aliasPlural: 'categories'
// })
// Item.hasMany({
// 	relatedModel: Price,
// 	foreignKey: null,
// 	aliasSingular: 'price',
// 	aliasPlural: 'prices',
// 	through: 'category' 
// })

// fullPass = new ItemType({
// 	id: 1,
// 	name: "Full Weekend Pass"
// })

// weekdayWorkshop = new ItemType({
// 	id: 2,
// 	name: "weekday Workshop"
// })

// dpType = new ItemType({
// 	id: 3,
// 	name: "dance pass"
// })

// fpif = new Item({
// 	id: 1,
// 	name: "Full Pass Intermediate Follow",
// 	itemType: fullPass
// })

// fpil = new Item({
// 	id: 2,
// 	name: "Full Pass Intermediate Lead",
// 	itemType: fullPass
// })

// tier1 = new Price({
// 	id: 1,
// 	name: "Tier 1",
// 	itemType: fullPass
// })

// tier2 = new Price({
// 	id: 2,
// 	name: "Tier 2",
// 	itemType: fullPass
// })

// workshopPrice = new Price({
// 	id: 3,
// 	name: "Default Workshop Price",
// 	itemType: weekdayWorkshop
// })

// tueWorkshopFollow = new Item({
// 	id: 3,
// 	name: "Tuesday Workshop Follow",
// 	itemType: weekdayWorkshop
// })

// console.log(fpil.name)
// console.log(fpif.name)

// console.log(ItemType.all())
// console.log(fullPass.items)
// console.log(weekdayWorkshop.items)
// console.log(fpif.category.name)
// console.log(fpif.prices.map(p => p.name))

// items = new RecordCollection([fpif,tueWorkshopFollow])
// console.log(items.all('prices'))