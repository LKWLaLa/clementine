let RecordCollection = require('./RecordCollection.js')

// https://medium.com/front-end-hacking/creating-an-orm-with-javascript-b28f37ed528


let db = {}

class Record {
	constructor(obj) {
		if (!obj.id) {throw "Missing id in record constructor"}
		let modelName = this.constructor.name
		
		// create database "table"
		// i.e. nested object within db which will contain all
		// of the instances of a model
		if (!db[modelName]) db[modelName] = {}

		// The db is read-only; once an instance of a model is created,
		// it cannot be ovewritten, nor can any database properties
		// be modified.
		// A `database property` on an instance is one that is created
		// at construction time and stored in the db object for later retrieval via
		// a gettter
		// Kinship allows a user to create and edit non-database
		// properties (i.e. properties added to an instance after construction time)

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
							let out = r.relatedModel.all.filter((record) => {
								if (!record[r.foreignKey]) {
									err = `property ${r.foreignKey} not found on record ${record.constructor.name} : ${record.id}`
									console.error(err)
								}
								return record[r.foreignKey].id == obj.id
							})
							return out
						}
					}
				}
			})
		}

		if (this.constructor.belongsToRelationships) {
			this.constructor.belongsToRelationships.forEach((r) => {
				if (r.through) {
					configuration[r.name] = {
						get() {
							let proximalRecord = this[r.through]
							return proximalRecord[r.source]
						}
					}
				} else {
					configuration[r.name] = {
						get() {
							return db[modelName]['records'][obj.id][r.foreignKey]
						}
					}
					// // track foreignKeys
					// this.constructor.foreignKeys.add(r.foreignKey)
				}
			})
		}
		
		// define getters
		Object.defineProperties(this,configuration)
	}

	static get all() {
		return new RecordCollection(Object.values(db[this.name]['instances']))
	}
	
	static hasMany(options) {
		if (!this.hasManyRelationships) {this.hasManyRelationships = []}
		this.hasManyRelationships.push(options)
	}

	static belongsTo(options) {
		if (!options.through) {this.foreignKeys.add(options.foreignKey)}
		if (!this.belongsToRelationships) {this.belongsToRelationships = []}
		this.belongsToRelationships.push(options)
	}

	static byId(id) {
		this._initializeDbEntries()
		return db[this.name]['instances'][id]
	}

	static get foreignKeys() {
		if (!this.hasOwnProperty('_foreignKeys')) {this._foreignKeys = new Set([])}
		return this._foreignKeys
	}

	static set foreignKeys(val) {
		this._foreignKeys = val
	}

	static get foreignKeyIds() {
		return new Set([...this.foreignKeys]
			.map(fk => fk + 'Id'))
	}

	static relatedModel(foreignKey) {
		// relatedModel is the class of instanceOfThis.foreignKey
		// returns relatedModel's constructor, assuming belongsTo has been called
		if (this.belongsToRelationships) {
			return this.belongsToRelationships
				.find(r => r.foreignKey == foreignKey)
				.relatedModel
		}
	}

	static _initializeDbEntries() {
		if (!db[this.name]) {
			db[this.name] = {
				instances: {},
				records: {}
			}
		}
	}

	// Ensure that properties defined via getters are included when the record
	// is serialized to JSON
	// Except hasMany relationships; do not serialize these.
	// Only serialize own properties and belongsTo relationships
	toJSON() {
		let entries = Object.entries(Object.getOwnPropertyDescriptors(this))
		let out = {}
		for (let [key,val] of entries) {
			if (this.constructor.hasManyRelationships && this.constructor.hasManyRelationships.find(e=>e.name==key)) {continue}
			if (this.constructor.foreignKeys.has(key)) {
				out[key] = this[key].toJSON()
			} else {
				out[key] = this[key]
			}
		}
		return out;
	}
}

function resetDb() {
	db = {}
}

function getDb() {
	return db
}

module.exports.Record = Record
module.exports.resetDb = resetDb
module.exports.getDb = getDb
