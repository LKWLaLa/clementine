# To be run after 2019 staging seeds have simulated user activity from
# 2019 event that shouldn't be overwritten.
# Need to reset the state
# Checkout the last commit from March 2019
# Run
# rake db:drop
# rake db:create
# rake db:migrate
# rake db:seed:staging_seeds
# Checkout only the following files from last commmit in October 2019
#   2020_production_seeds.rb
#   20191009200821_create_events.rb
#	20191011045123_add_event_to_item_types.rb
#	20191012222209_create_event_volunteers.rb
# rake db:migrate
# rake db:seed:2020_production_seeds
# Checkout entire project from last commit in October 2019
# run app
bw19 = Event.create({name: 'Bal Week 2019', active: false})
bw20 = Event.create({name: 'Bal Week 2020', active: true})

ItemType.update_all(event: bw19)





