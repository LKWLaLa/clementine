let Kinship = require('./Kinship.js')
let Record = Kinship.Record
let RecordCollection = Kinship.RecordCollection

Kinship.db = {}
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

let p1Appointments = new RecordCollection([a1,a2])
let p2Appointments = new RecordCollection([a3,a4,a5])
console.log((p1.appointments.equals(p1Appointments)))
console.log((p2.appointments.equals(p2Appointments)))

console.log(Record.db())
console.log('resetting db...')
Kinship.resetDb()
console.log(Record.db())