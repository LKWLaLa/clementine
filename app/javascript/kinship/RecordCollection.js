class RecordCollection {
	constructor(params) {
		// works if params is passed as a set or an array of records
		// assumes all params have the same class
		if (params instanceof RecordCollection) {
			return new RecordCollection(params.modelInstances)
		}
		this.modelInstances = new Set(params)
	}

	get size() {
		return this.modelInstances.size
	}

	add(record) {
		this.modelInstances.add(record)
		return this
	}

	delete(record) {
		return this.modelInstances.delete(record)
	}

	findBy(params) {
		if (!params) {
			params = {}
		}
		for (let mi of this.modelInstances) {
			let found = true
			for (let p of Object.getOwnPropertyNames(params)) {
				if (params[p] != mi[p]) {
					found = false
					break
				}
			}
			if (found) {return mi}
		}
		return null
	}

	groupBy(relationshipName) {
		let out = new Map()
		for (let mi of this.modelInstances) {
			if (!mi.constructor.belongsToRelationships.find(r => r.name == relationshipName)) {
				err = `relationship ${relationshipName} not found in belongsToRelationships`
				throw err
			}
			let relatedRecord = mi[relationshipName]
			if (!out.get(relatedRecord)) {out.set(relatedRecord,new RecordCollection())}
			out.get(relatedRecord).add(mi)
		}
		return out
	}

	allRelated(relationshipName) {
		let array = [...this.modelInstances].reduce((a,mi) => {
			let records = mi[relationshipName]
			if (records instanceof RecordCollection) {
				return [...a,...records.modelInstances]
			} else {
				return [...a,records] // for a belongsTo, records is actually a single instance, not a collection
			}
		},[])
		return new RecordCollection(array)
	}

	map(f,thisArg) {
		return [...this.modelInstances].map(f,thisArg)
	}

	filter(f,thisArg) {
		return new RecordCollection([...this.modelInstances].filter(f,thisArg))
	}

	reduce(f,init) {
		return [...this.modelInstances].reduce(f,init)
	}

	ids() {
		return new Set([...this.modelInstances]
			.map(mi => mi.id))
	}

	has(instance) {
		return this.modelInstances.has(instance)
	}

	includes(instance) {
		return this.modelInstances.has(instance)
	}

	isSubsetOf(other) {
		for (let i of this.modelInstances) {
			if (!other.modelInstances.has(i)) {return false}
		}
		return true
	}

	equals(other) {
		return this.isSubsetOf(other) && other.isSubsetOf(this)
	}

	// An iterator over a RecordCollection is just an iterator 
	// over its modelInstances
	[Symbol.iterator]() {
		return this.modelInstances[Symbol.iterator]()
	}

	toJSON() {
		let out = []
		for (let mi of this.modelInstances) {
			out.push(mi.toJSON())
		}
		return out
	}
}

module.exports = RecordCollection