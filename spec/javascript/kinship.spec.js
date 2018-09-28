import expect from './customMatchers.js'
let Kinship = require('../../app/javascript/kinship/Kinship.js')
let RecordCollection = Kinship.RecordCollection
let Record = Kinship.Record

describe('getDb', ()=>{
	it('returns an empty object when nothing has been added', ()=>{
		expect(Kinship.getDb()).toEqual({})
	})
})

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
				name: 'patient'
			})
			Patient.hasMany({
				relatedModel: Appointment,
				foreignKey: 'patient',
				name: 'appointments'
			})

			rc1 = new RecordCollection([])
			rc2 = new RecordCollection([])
		})
		describe('size',()=>{
			it('returns 0',() =>{
				expect(rc1.size).toEqual(0)	
			})	
		})
		describe('allRelated',()=>{
			it('returns an empty collection',()=>{
				let all = rc1.allRelated('appointments')
				expect(all instanceof RecordCollection).toBe(true)
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
		describe('findBy',()=>{
			describe('passed an empty params object',()=>{
				it('returns null',()=>{
					expect(rc1.findBy()).toBeNull()
				})	
			})
			describe('passed a nonempty params object',()=>{
				it('returns null',()=>{
					expect(rc1.findBy({id: 1})).toBeNull()
				})
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
				expect(rc1.size).toBe(1)
				expect(rc2.size).toBe(2)
			})
		})
		describe('ids',()=>{
			it('returns the set of ids',()=>{
				expect([...rc2.ids()]).includesExactly([1,2])
			})
		})
		describe('equals',()=>{
			it('returns true if other has the same elements as this',()=>{
				expect(rc1.equals(rc1)).toBe(true)
				expect(rc2.equals(rc1)).toBe(false)
				expect(rc1.equals(rc2)).toBe(false)
			})
		})
		describe('findBy',()=>{
			describe('passed an empty params object',()=>{
				it('returns a record from the collection',()=>{
					expect(rc2.findBy()).toBe(p1)
				})	
			})
			describe('passed a matchable params object',()=>{
				it('returns a matching record',()=>{
					expect(rc2.findBy({id: 2})).toBe(p2)
				})
			})
			describe('passed an unmatchable params object',()=>{
				it('returns null',()=>{
					expect(rc1.findBy({id: 2})).toBeNull()
				})
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
				name: 'patient'
			})
			Appointment.belongsTo({
				relatedModel: Doctor,
				foreignKey: 'doctor',
				name: 'doctor'
			})
			Patient.hasMany({
				relatedModel: Appointment,
				foreignKey: 'patient',
				name: 'appointments'
			})
			Doctor.hasMany({
				relatedModel: Appointment,
				foreignKey: 'doctor',
				name: 'appointments'
			})
			Patient.hasMany({
				relatedModel: Doctor,
				name: 'doctors',
				through: 'appointments',
				source: 'doctor'
			})
			Doctor.hasMany({
				relatedModel: Patient,
				name: 'patients',
				through: 'appointments',
				source: 'patient'
			})

			p1 = new Patient({id: 1})
			p2 = new Patient({id: 2})
			p3 = new Patient({id: 3})

			d1 = new Doctor({id: 1})
			d2 = new Doctor({id: 2})
			d3 = new Doctor({id: 3})

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
				doctor: d3
			})
		})

		describe('allRelated',()=>{
			it('returns all the patients for a collection of appointments', ()=>{
				let ac1 = new RecordCollection([a1,a2])
				let ac2 = new RecordCollection([a2,a3])
				expect(ac1.allRelated('patient')
					.equals(new RecordCollection([p1]))).toBe(true)
				expect(ac2.allRelated('patient')
					.equals(new RecordCollection([p1,p2]))).toBe(true)
			})

			it('returns all the appointments for a collection of patients', ()=>{
				let pc1 = new RecordCollection([p1])
				let pc2 = new RecordCollection([p1,p2])

				expect(pc1.allRelated('appointments'))
					.includesExactly([a1,a2])
				expect(pc2.allRelated('appointments'))
					.includesExactly([a1,a2,a3])
			})

			it('returns all the doctors for a set of patients', ()=>{
				let pc1 = new RecordCollection([p1])
				let pc2 = new RecordCollection([p1,p2])

				expect(pc1.allRelated('doctors'))
					.includesExactly([d1,d2])
				expect(pc2.allRelated('doctors'))
					.includesExactly([d1,d2,d3])
			})
		})

		describe('groupBy',()=>{
			it('returns an empty Map for an empty RecordCollection',()=>{
				expect(new RecordCollection().groupBy('')).toEqual(new Map())
			})
			it('returns a Map, where each patient with appointments in this collection maps to her appointments in this collection',()=>{
				let appointmentsByPatient = new RecordCollection([a1,a2,a3]).groupBy('patient')
				expect(appointmentsByPatient.get(p1)).includesExactly([a1,a2])
				expect(appointmentsByPatient.get(p2)).includesExactly([a3])
			})
		})
	})
	
	describe('toJSON',()=>{
		beforeAll(()=>{
			Kinship.resetDb()
			r1 = new Record({id: 1})
			r2 = new Record({id: 2, name: 'second record'})
			rc1 = new RecordCollection([r1])
			rc2 = new RecordCollection([r1,r2])
		})
		describe('collection is empty',()=>{
			it('returns an empty array',()=>{
				expect(new RecordCollection().toJSON()).toEqual([])
			})
		})
		describe('collection is nonempty',()=>{
			it('returns an array of all the instances in the collection',()=>{
				// careful to uses toEqual here, not includesExactly
				// toEqual compares values recursively, which is what we want.
				// includesExactly uses whatever comparison algorithm the `includes` method
				// of each type uses.  In the case of arrays, this is identity of reference (Object.is)
				expect(rc1.toJSON()).toEqual(expect.arrayContaining([{id: 1}]))
				expect(rc1.toJSON().length).toEqual(1)
				expect(rc2.toJSON()).toEqual(expect.arrayContaining([{id: 1},{id: 2, name: 'second record'}]))
				expect(rc2.toJSON().length).toEqual(2)
			})	
		})
		
	})

	describe('iterability',() => {
		beforeAll(()=>{
			Kinship.resetDb()
			p1 = new Patient({id: 1})
			p2 = new Patient({id: 2})
			p3 = new Patient({id: 3})

			rc1 = new RecordCollection([p1,p2,p3])
		})
		it('spread operator works correctly',()=>{
			expect([...rc1]).toEqual(expect.arrayContaining([p1,p2,p3]))
			expect([...rc1].length).toEqual(3)
		})
		it('for...of works correctly',() => {
			let arr = []
			for (let r of rc1) {
				arr.push(r)
			}
			expect(arr).toEqual(expect.arrayContaining([p1,p2,p3]))
			expect(arr.length).toEqual(3)
		}) 
	})

	describe('constructor',()=>{
		beforeAll(()=>{
			Kinship.resetDb()
			r1 = new Record({id: 1})
			r2 = new Record({id: 2})
			rc1 = new RecordCollection([r1,r2])
		})
		it('constructs a RecordCollection from another RecordCollection',()=>{
			rc2 = new RecordCollection(rc1)
			expect(rc2.equals(rc1)).toBe(true)
		})
	})
})

describe('Record',()=>{
	let Patient
	let Doctor
	let Appointment
	let Nurse
	let Script

	let r1,r2
	let p1,p2,p3
	let d1,d2,d3,d4
	let a1,a2,a3,a4,a5,a6
	let n1,n2,n3
	let s1,s2,s3

	let rc1,rc2

	describe('methods',()=>{
		beforeAll(()=>{
			Kinship.resetDb();
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
			Kinship.resetDb();
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
				expect(Patient.all.equals(allPatients)).toBe(true)
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
			Nurse = class Nurse extends Record {}
			Script = class Script extends Record {}

			Appointment.belongsTo({
				relatedModel: Patient,
				foreignKey: 'patient',
				name: 'patient'
			})
			Appointment.belongsTo({
				relatedModel: Doctor,
				foreignKey: 'doctor',
				name: 'doctor'
			})
			Appointment.hasMany({
				relatedModel: Nurse,
				name: 'nurses',
				through: 'doctor',
				source: 'nurses'
			})
			Appointment.hasMany({
				relatedModel: Script,
				name: 'scripts',
				foreignKey: 'appointment'
			})

			Patient.hasMany({
				relatedModel: Appointment,
				foreignKey: 'patient',
				name: 'appointments'
			})
			Patient.hasMany({
				relatedModel: Doctor,
				name: 'doctors',
				through: 'appointments',
				source: 'doctor'
			})
			Patient.hasMany({
				relatedModel: Script,
				name: 'prescriptions',
				through: 'appointments',
				source: 'scripts'
			})

			Doctor.hasMany({
				relatedModel: Appointment,
				foreignKey: 'doctor',
				name: 'appointments'
			})
			Doctor.hasMany({
				relatedModel: Patient,
				name: 'patients',
				through: 'appointments',
				source: 'patient'
			})
			Doctor.hasMany({
				relatedModel: Nurse,
				foreignKey: 'employer',
				name: 'nurses'
			})

			Nurse.belongsTo({
				relatedModel: Doctor,
				foreignKey: 'employer',
				name: 'doctor'
			})
			Nurse.hasMany({
				relatedModel: Appointment,
				name: 'appointments',
				through: 'employer',	
				source: 'appointments'
			})
			Nurse.hasMany({
				relatedModel: Patient,
				name: 'patients',
				through: 'employer',
				source: 'patients'
			})

			Script.belongsTo({
				relatedModel: Appointment,
				name: 'appointment',
				foreignKey: 'appointment'
			})
			Script.belongsTo({
				relatedModel: Patient,
				name: 'patient',
				through: 'appointment',
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

			n1 = new Nurse({
				id: 1,
				employer: d1
			})

			n2 = new Nurse({
				id: 2,
				employer: d1
			})

			n3 = new Nurse({
				id: 3,
				employer: d2
			})

			s1 = new Script({
				id: 1,
				appointment: a1
			})

			s2 = new Script({
				id: 2,
				appointment: a2
			})

			s3 = new Script({
				id: 3,
				appointment: a2
			})
		})

		describe('belongsTo',()=>{
			describe('getters',()=>{
				it('appointment.patient returns the patient the appointment belongs to',()=>{
					expect(a1.patient).toBe(p1)
					expect(a3.patient).toBe(p2)
				})
				it('appointment.doctor returns the doctor the appointment belongs to',()=>{
					expect(a1.doctor).toBe(d1)
					expect(a2.doctor).toBe(d2)
				})
				it('script.patient returns the patient the script was written for',()=>{
					expect(s1.patient).toBe(p1)
				})
			})
		})
		describe('hasMany',()=>{
			describe('getters',()=>{
				it('patient.appointments returns the collection of the patient\'s appointments',() =>{
					expect(p1.appointments).includesExactly([a1,a2])
					expect(p2.appointments).includesExactly([a3,a4,a5])
				})
				it('doctor.nurses returns the nurses employed by the doctor',()=>{
					expect(d1.nurses).includesExactly([n1,n2])
				})
			})
		})
		describe('hasManyThrough',()=>{
			describe('getters',()=>{
				// patient hasMany appointments belongsTo doctors
				it('patient.doctors returns the collection of the patient\'s doctors',()=>{
					expect(p1.doctors).includesExactly([d1,d2])
					expect(p2.doctors).includesExactly([d2,d3])
				})
				// doctor hasMany appointments belongsTo patient
				it('doctor.patients returns the collection of the doctor\'s patients',()=>{
					expect(d1.patients).includesExactly([p1])
					expect(d4.patients).includesExactly([])
				})
				// appointment belongsTo doctor hasMany nurses
				it('appointment.nurses returns the collection of nurses who might assist at the appointment', ()=>{
					expect(a1.nurses).includesExactly([n1,n2])
					expect(a2.nurses).includesExactly([n3])
				})
				// nurse belongsTo employer hasMany appointments (doctor is an alias)
				it('nurse.appointments returns the collection of appointments a nurse might assist at', ()=>{
					expect(n1.appointments).includesExactly([a1])
					expect(n3.appointments).includesExactly([a2,a3,a4])
				})
				// patient hasMany appointments hasMany scripts (prescriptions is an alias)
				it('patient.prescriptions returns all of the scripts a doctor has written for the patient',()=>{
					expect(p1.prescriptions).includesExactly([s1,s2,s3])
				})
			})
		})

		describe('Record.foreignKeys',()=>{
			it('returns an empty set for a model with no foreignKeys',() => {
				expect([...Patient.foreignKeys]).includesExactly([])
			})
			it('stores all the foreign keys on the model',()=>{
				expect([...Appointment.foreignKeys])
					.includesExactly(['patient','doctor'])
			})
			it('returns the foreign keys even if the class has not been instantiated', ()=>{
				class Office extends Record {}
				Office.belongsTo({
					name: 'doctor',
					relatedModel: Doctor,
					foreignKey: 'doctor'
				})
				expect([...Office.foreignKeys]).includesExactly(['doctor'])
			})
		})

		describe('Record.foreignKeyIds',()=>{
			it('returns the concatenation of each foreign key with the string \'Id\'',()=>{
				expect([...Appointment.foreignKeyIds])
					.includesExactly(['patientId','doctorId'])
			})
		})

		describe('Record.relatedModel',()=>{
			it('returns the relatedModel that this belongsTo via foreignKey',()=>{
				expect(Appointment.relatedModel('patient')).toBe(Patient)
				expect(Nurse.relatedModel('employer')).toBe(Doctor)
			})
		})

		describe('toJSON',()=>{
			it('returns only own properties and belongsTo relationships, not hasMany relationships',()=>{
				expect(a1.toJSON()).toEqual({
					id: 1, 
					patient: {id: 1},
					doctor: {id: 1}
				})
				expect(a1.toJSON()).not.toEqual({id: 1})
				expect(a1.toJSON()).not.toEqual({id: 1, patient: {}, doctor: {}})
			})
		})
	})

	describe('toJSON',()=>{
		beforeAll(()=>{
			Kinship.resetDb()
			r1 = new Record({id: 1})
			r2 = new Record({id: 2, name: 'second record', color: 'blue'})
		})
		it('returns an object with all the record\'s properties, including those accessed by getters',()=>{
			expect(r1.toJSON()).toEqual({id: 1})
			expect(r2.toJSON()).toEqual({id: 2, name: 'second record', color: 'blue'})
		})
	})
})