import expect from './customMatchers.js'
import {Record, RecordCollection} from '../../app/javascript/kinship/Kinship.js'
let RC = RecordCollection

describe('hasExactly',()=>{
	it('matches two empty sets',()=>{
		expect(new Set()).hasExactly(new Set())
	})
	it('matches two nonempty sets with the same items',()=>{
		expect(new Set([7,3])).hasExactly(new Set([3,7]))
	})
	it('does not match an empty set with a nonempty set',()=>{
		expect(new Set([])).not.hasExactly(new Set([1]))
		expect(new Set([1])).not.hasExactly(new Set([]))
	})
	it('works for any collection with a has method',()=>{
		let r1 = new Record({id: 1})
		let r2 = new Record({id: 2})
		let rc1 = new RecordCollection([r1,r2])
		let rc2 = new RecordCollection([r1])
		expect(rc1).hasExactly(rc1)	
		expect(rc1).hasExactly(new Set([r2,r1]))
		expect(rc1).not.hasExactly(rc2)
	})
})

describe('includesExactly',()=>{
	it('matches two empty arrays',()=>{
		expect([]).includesExactly([])
	})
	it('matches two nonempty arrays with the same items',()=>{
		expect([7,3]).includesExactly([3,7])
	})
	it('does not match an empty array with a nonempty array',()=>{
		expect([]).not.includesExactly([1])
		expect([1]).not.includesExactly([])
	})
	it('works for any collection with an includes method',()=>{
		let r1 = new Record({id: 1})
		let r2 = new Record({id: 2})
		let rc1 = new RecordCollection([r1,r2])
		let rc2 = new RecordCollection([r1])
		expect(rc1).includesExactly(rc1)
		expect(rc1).includesExactly([r2,r1])
		expect(rc1).includesExactly([r2,r1])
		expect(rc1).not.includesExactly(rc2)
		expect(rc2).not.includesExactly(rc1)
		expect(rc2).not.includesExactly([r1,r2])
	})
})

describe('rcEquals',()=>{
	let r1,r2
	beforeAll(()=>{
		r1 = new Record({id: 1})
		r2 = new Record({id: 2})
	})
	it('matches two empty RecordCollections',()=>{
		expect(new RC()).rcEquals(new RC())
	})
	it('matches two nonempty RecordCollections with the same records',()=>{
		expect(new RC([r1,r2])).rcEquals(new RC([r2,r1]))
	})
	it('does not match two nonempty RecordCollections with different records',()=>{
		expect(new RC([r1,r2])).not.rcEquals(new RC([r1]))
	})
})

