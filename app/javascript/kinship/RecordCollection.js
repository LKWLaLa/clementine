class RecordCollection {
	constructor(modelInstances) {
		// works if modelInstances is passed as a set or an array
		// assumes all modelInstances have the same class
		this.modelInstances = new Set(modelInstances)
	}

	size() {
		return this.modelInstances.size
	}

	allRelated(relationshipAlias) {
		let array = [...this.modelInstances].reduce((a,mi) => {
			let records = mi[relationshipAlias]
			if (records instanceof RecordCollection) {
				return [...a,records.modelInstances]
			} else {
				return [...a,records]
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

	isSubsetOf(other) {
		this.modelInstances.forEach(i => {
			if (!other.modelInstances.has(i)) {return false}
		})
		return true
	}

	equals(other) {
		return this.isSubsetOf(other) && other.isSubsetOf(this)
	}
}

module.exports = RecordCollection