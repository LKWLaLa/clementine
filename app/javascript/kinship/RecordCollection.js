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

	map(f) {
		return [...this.modelInstances].map(f)
	}

	filter(f) {
		return new RecordCollection([...this.modelInstances].filter(f))
	}

	reduce(f) {
		return [...this.modelInstances].reduce(f)
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