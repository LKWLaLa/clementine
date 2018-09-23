let Kinship = {}
Kinship.RecordCollection = require('./RecordCollection')
let _ = require('./Record')
Kinship.Record = _.Record
Kinship.resetDb = _.resetDb

module.exports = Kinship