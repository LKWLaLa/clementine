let Kinship = require('../../app/javascript/kinship/Kinship.js')
let RecordCollection = Kinship.RecordCollection
let Record = Kinship.Record

describe('RecordCollection', () => {
	let r1
	let r2
	let rc1
	beforeEach(() => {
		Kinship.db = {}
		r1 = new Record({id: 1})
		r2 = new Record({id: 2})
	})
	describe('the collection is empty',()=>{
		beforeEach(()=>{
			Kinship.db = {}
			rc1 = new RecordCollection([])
		})
		describe('size',()=>{
			it('returns 0',() =>{
				expect(rc1.size()).toEqual(0)	
			})	
		})
		describe('all',()=>{
			it('returns an empty set',()=>{
				let all = rc1.all()
				expect(all instanceof Set).toBe(true)
				expect(all.size).toEqual(0)
			})
		})
		describe('ids',() =>{
			it('returns an empty set',()=>{
				let ids = rc1.ids()
				expect(ids.size).toEqual(0)
				expect(ids instanceof Set).toBe(true)
			})
		})
	})

})