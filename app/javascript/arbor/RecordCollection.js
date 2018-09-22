RecordCollection = class RecordCollection {
	constructor(modelInstances) {
		// works if modelInstances is passed as a set or an array
		// assumes all modelInstances have the same class
		this.modelInstances = new Set(modelInstances)
	}

	all(relationshipAlias) {
		return [...this.modelInstances].reduce((a,mi) => {
			return new Set([...a,...mi[relationshipAlias].modelInstances])
		},new Set())
	}

	map(f) {
		return [...this.modelInstances].map(f)
	}

	filter(f) {
		return [...this.modelInstances].filter(f)
	}

	reduce(f) {
		return [...this.modelInstances].reduce(f)
	}

	ids() {
		return new Set([...this.modelInstances]
			.map(mi => mi.id))
	}
}

module.exports.RecordCollection = RecordCollection