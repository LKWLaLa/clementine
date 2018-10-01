let Kinship = {}
Kinship.RecordCollection = require('./RecordCollection')
let _ = require('./Record')
Kinship.Record = _.Record
Kinship.resetDb = _.resetDb
Kinship.getDb = _.getDb

Kinship.initializeDb = (models) => {
	db = Kinship.getDb()
	for (let model of models) {
		db[model.name] = {records: {}, instances: {}}
	}
}

module.exports = Kinship