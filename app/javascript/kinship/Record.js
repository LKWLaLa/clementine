let RecordCollection = require('./RecordCollection.js')

// https://medium.com/front-end-hacking/creating-an-orm-with-javascript-b28f37ed528

module.exports.db = {}
let db = module.exports.db

class Record {
	constructor(obj) {
		if (!obj.id) {throw "Missing id in record constructor"}
		let modelName = this.constructor.name
		
		// create database "table"
		// i.e. nested object within db which will contain all
		// of the instances of a model
		if (!db[modelName]) db[modelName] = {}

		// The db is read-only; once an instance of a model is created,
		// it cannot be modified or overwritten.
		// Since ids are unique
		// on each model, an attempt to create a new instance with
		// the same id returns the existing instance
		// Only one instance of a model with a given id should ever exist.
		if (db[modelName]['instances']) {				
			let existingInstance = db[modelName]['instances'][obj.id]
			if (existingInstance) {return existingInstance}
		} else {
			db[modelName]['instances'] = {}
		}
		db[modelName]['instances'][obj.id] = this

		// Create the record corresponding to the instance
		// The record is where the data is actually stored.
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
					configuration[r.name] = {
						get() {
							debugger;
							let proximalRecords = this[r.through]
							if (proximalRecords instanceof RecordCollection) {
								return proximalRecords.allRelated(r.source)
							}
							// proximalRecords is a single record
							return proximalRecords[r.source]
						}
					}
				} else {
					configuration[r.name] = {
						get() {
							let out =  r.relatedModel.all().filter((record) => {
								// console.log(record[r.foreignKey]) 
								return record[r.foreignKey].id == obj.id
							})
							// console.log(out)
							return out
						}
					}
				}
			})
		}

		if (this.constructor.belongsToRelationships) {
			this.constructor.belongsToRelationships.forEach((r) => {
				configuration[r.name] = {
					get() {
						let storedValue = db[modelName]['records'][obj.id][r.name]
						if (storedValue) {return storedValue}
						else return this[r.foreignKey]
					}
				}
			})
		}
		
		// define getters
		Object.defineProperties(this,configuration)

	}

	static all() {
		return new RecordCollection(Object.values(db[this.name]['instances']))
	}
	
	static hasMany(options) {
		// expected keys in options
		// relatedModel, foreignKey, name, name
		
		// for example, an ItemType hasMany({
		//	relatedModel: Item,
		//	foreignKey: 'itemType',
		//	name: 'items',
		//	through: null
		// })

		// an ItemType hasMany({
		// 	relatedModel: Price,
		// 	foreignKey: 'itemType',
		// 	name: 'items',
		// 	through: null
		// })

		// an item hasMany({
		//	relatedModel: Price,
		//	foreignKey: null,
		//	name: 'prices',
		//	through: itemType
		// })
		if (!this.hasManyRelationships) {this.hasManyRelationships = []}
		this.hasManyRelationships.push(options)
	}

	static belongsTo(options) {
		// an item belongsTo({
		// 	relatedModel: ItemType,
		// 	foreignKey: 'itemType',
		// 	name: 'itemType',
		// 	through: null
		// })
		if (!this.belongsToRelationships) {this.belongsToRelationships = []}
		this.belongsToRelationships.push(options)

	}

	static byId(id) {
		return db[this.name]['instances'][id]
	}

	static db() {
		return db
	}
}

function resetDb() {
	db = {}
}

module.exports.Record = Record
module.exports.resetDb = resetDb
