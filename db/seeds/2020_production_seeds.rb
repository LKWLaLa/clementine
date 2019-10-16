bw19 = Event.create({name: 'Bal Week 2019', active: false})
bw20 = Event.create({name: 'Bal Week 2020', active: true})

ItemType.update_all(event_id: bw19.id)





