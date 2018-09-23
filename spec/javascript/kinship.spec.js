let Kinship = require('../../app/javascript/kinship/Kinship.js')
let RecordCollection = Kinship.RecordCollection
let Record = Kinship.Record

// helpers for equality of sets
// returns true if a is contained in b
function subset(a,b) {
	a.forEach(i => {
		if (!b.has(i)) return false
	})
	return true
}
function setEquals(a,b) {
	return subset(a,b) && subset(b,a)
}

describe('RecordCollection', () => {
	let Patient
	let Doctor
	let Appointment

	let r1,r2
	let p1,p2,p3
	let d1,d2,d3
	let a1,a2,a3

	let rc1,rc2

	describe('the collection is empty',()=>{
		beforeEach(()=>{
			Kinship.resetDb()
			Patient = class Patient extends Record {}
			Appointment = class Appointment extends Record {}
			Appointment.belongsTo({
				relatedModel: Patient,
				foreignKey: 'patient',
				aliasSingular: 'patient'
			})
			Patient.hasMany({
				relatedModel: Appointment,
				foreignKey: 'patient',
				aliasPlural: 'appointments'
			})

			rc1 = new RecordCollection([])
			rc2 = new RecordCollection([])
		})
		describe('size',()=>{
			it('returns 0',() =>{
				expect(rc1.size()).toEqual(0)	
			})	
		})
		describe('allRelated',()=>{
			it('returns an empty collection',()=>{
				let all = rc1.allRelated('appointments')
				expect(all instanceof RecordCollection).toBe(true)
				expect(all.size()).toEqual(0)
			})
		})
		describe('ids',() =>{
			it('returns an empty set',()=>{
				let ids = rc1.ids()
				expect(ids.size).toEqual(0)
				expect(ids instanceof Set).toBe(true)
			})
		})
		describe('isSubsetOf',()=>{
			it('returns true for two empty collections',()=>{
				expect(rc1.isSubsetOf(rc2)).toBe(true)
			})
		})
		describe('equals',()=>{
			it('returns true for two empty collections',()=>{
				expect(rc1.equals(rc2)).toBe(true)
			})
		})
	})
	describe('the collection is nonempty',()=>{
		beforeEach(()=>{
			Kinship.resetDb()
			p1 = new Record({id: 1})
			p2 = new Record({id: 2})
			rc1 = new RecordCollection([p1])
			rc2 = new RecordCollection([p1,p2])
		})
		describe('size',()=>{
			it('returns the number of records in the collection',()=>{
				expect(rc1.size()).toBe(1)
				expect(rc2.size()).toBe(2)
			})
		})
		describe('ids',()=>{
			it('returns the set of ids',()=>{
				let expectedIds = new Set([1,2])
				expect(setEquals(rc2.ids(),expectedIds)).toBe(true)
			})
		})
	})
	describe('all',()=>{
		beforeAll(()=>{
			Kinship.resetDb()
			Patient = class Patient extends Record {}
			Appointment = class Appointment extends Record {}
			Doctor = class Doctor extends Record {}
			Appointment.belongsTo({
				relatedModel: Patient,
				foreignKey: 'patient',
				aliasSingular: 'patient'
			})
			Appointment.belongsTo({
				relatedModel: Doctor,
				foreignKey: 'doctor',
				aliasSingular: 'doctor'
			})
			Patient.hasMany({
				relatedModel: Appointment,
				foreignKey: 'patient',
				aliasPlural: 'appointments'
			})
			Doctor.hasMany({
				relatedModel: Appointment,
				foreignKey: 'doctor',
				aliasPlural: 'appointments'
			})
			Patient.hasMany({
				relatedModel: Doctor,
				aliasPlural: 'doctors',
				through: 'appointments'
			})
			Doctor.hasMany({
				relatedModel: Patient,
				aliasPlural: 'patients',
				through: 'appointments'
			})
		})

		it('returns all the patients for a collection of appointments', ()=>{
			// TODO
			expect(true).toBe(true)
		})

		it('returns all the appointments for a collection of patients', ()=>{
			// TODO
			expect(true).toBe(true)
		})

		it('returns all the doctors for a set of patients', ()=>{
			// TODO
			expect(true).toBe(true)
		})
	})
})

describe('Record',()=>{
	let Patient
	let Doctor
	let Appointment

	let r1,r2
	let p1,p2,p3
	let d1,d2,d3,d4
	let a1,a2,a3,a4,a5,a6

	let rc1,rc2

	describe('methods',()=>{
		beforeAll(()=>{
			Kinship.db={}
			Patient = class Patient extends Record {}
			p1 = new Patient({
				id: 1,
				name: 'Tim'
			})
			p2 = new Patient({
				id: 2,
				name: 'Jane'
			})
		})

		afterAll(()=>{
			Kinship.db={}
			Patient = undefined
		})

		describe('constructor',() => {
			describe('an instance with the given id already exists',()=>{
				it('returns the existing instance',()=>{
					expect(new Patient({id: 1})).toBe(p1)
				}) 
			})
		})

		describe('byId',() =>{
			it('returns the single instance of the model with the given id',()=>{
				expect(Patient.byId(1)).toBe(p1)
			})
		})

		describe('all',() => {
			it('returns all instances of the model',() => {
				let allPatients = new RecordCollection([p1,p2])
				expect(Patient.all().equals(allPatients)).toBe(true)
			}) 
		})

		describe('getters',()=>{
			it('returns the value of the requested field',()=>{
				expect(p1.name).toEqual('Tim')
			})
		})
	})

	describe('relationships',()=>{
		beforeAll(()=>{
			Kinship.resetDb()
			Patient = class Patient extends Record {}
			Appointment = class Appointment extends Record {}
			Doctor = class Doctor extends Record {}

			Appointment.belongsTo({
				relatedModel: Patient,
				foreignKey: 'patient',
				aliasSingular: 'patient'
			})
			Appointment.belongsTo({
				relatedModel: Doctor,
				foreignKey: 'doctor',
				aliasSingular: 'doctor'
			})
			Patient.hasMany({
				relatedModel: Appointment,
				foreignKey: 'patient',
				aliasPlural: 'appointments'
			})
			Doctor.hasMany({
				relatedModel: Appointment,
				foreignKey: 'doctor',
				aliasPlural: 'appointments'
			})
			Patient.hasMany({
				relatedModel: Doctor,
				aliasPlural: 'doctors',
				through: 'appointments',
				source: 'doctor'
			})
			Doctor.hasMany({
				relatedModel: Patient,
				aliasPlural: 'patients',
				through: 'appointments',
				source: 'patient'
			})

			p1 = new Patient({id: 1})
			p2 = new Patient({id: 2})
			p3 = new Patient({id: 3})

			d1 = new Doctor({id: 1})
			d2 = new Doctor({id: 2})
			d3 = new Doctor({id: 3})
			d4 = new Doctor({id: 4})

			a1 = new Appointment({
				id: 1,
				patient: p1,
				doctor: d1
			})

			a2 = new Appointment({
				id: 2,
				patient: p1,
				doctor: d2
			})

			a3 = new Appointment({
				id: 3,
				patient: p2,
				doctor: d2
			})

			a4 = new Appointment({
				id: 4,
				patient: p2,
				doctor: d2
			})

			a5 = new Appointment({
				id: 5,
				patient: p2,
				doctor: d3
			})
		})

		describe('belongsTo',()=>{
			describe('getters',()=>{
				it('appointment.patient returns the patient the appointment belongs to',()=>{
					expect(a1.patient).toBe(p1)
					expect(a3.patient).toBe(p2)
				})
			})
		})
		describe('hasMany',()=>{
			describe('getters',()=>{
				it('patient.appointments returns the collection of the patient\'s appointments',() =>{
					let p1Appointments = new RecordCollection([a1,a2])
					let p2Appointments = new RecordCollection([a3,a4,a5])
					expect(p1.appointments.equals(p1Appointments)).toBe(true)
					expect(p2.appointments.equals(p2Appointments)).toBe(true)
				})
			})
		})
		describe('hasManyThrough',()=>{
			describe('getters',()=>{
				it('patient.doctors returns the collection of the patient\'s doctors',()=>{
					let p1Doctors = new RecordCollection([d1,d2])
					let p2Doctors = new RecordCollection([d2,d3])
					expect(p1.doctors.equals(p1Doctors)).toBe(true)
					expect(p2.doctors.equals(p2Doctors)).toBe(true)
				})
				it('doctor.patients returns the collection of the doctor\'s patients',()=>{
					let d1Patients = new RecordCollection([p1])
					let d4Patients = new RecordCollection([])
					expect(d1.patients.equals(d1Patients)).toBe(true)
					expect(d4.patients.equals(d4Patients)).toBe(true)
				})
			})
		})
	})
})