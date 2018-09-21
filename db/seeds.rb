# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
	{
		first_name: 'Jane',
		last_name: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password',
		city: 'New York City',
		country: 'USA',
	},
	{
		first_name: 'Jack',
		last_name: 'Black',
      email: 'jack.black@example.com',
      password: 'password',
		city: 'London',
		country: 'UK',
	},
	{
		first_name: 'Ned',
		last_name: 'Stark',
      email: 'ned.stark@example.com',
      password: 'password',
		city: 'Winterfell',
	},
	{
		first_name: 'Petyr',
		last_name: 'Baelish',
      email: 'petyr.baelish@example.com',
      password: 'password',
		city: 'King\'s Landing',
	},
	{
		first_name: 'Tim',
		last_name: 'Allen',
      email: 'tim.allen@example.com',
      password: 'password',
		city: 'Los Angeles',
		state: 'California',
	}
])

jane = users[0]
jack = users[1]
ned = users[2]
peter = users[3]
tim = users[4]

item_types = ItemType.create([
	{name: 'Full Pass'},
  {name: 'Weekday Workshop'},
  {name: 'Dance Pass'},
  {name: 'Contest Entry'},
  {name: 'Unique Item'}
])

full_pass = item_types[0]
weekday_workshop = item_types[1]
dance_pass = item_types[2]
contest_entry = item_types[3]
unique_item_type = item_types[4]

items = Item.create(
[
 {
   name: "Full Pass Intermediate Follow",
   item_type: full_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Full Pass Intermediate Lead",
   item_type: full_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Full Pass Advanced Follow",
   item_type: full_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Full Pass Advanced Lead",
   item_type: full_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Full Pass Masters Follow",
   item_type: full_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Full Pass Masters Lead",
   item_type: full_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Dance Pass",
   item_type: dance_pass,
   description: "Admission to the Friday, Saturday, and Sunday evening dances",
   supply: 60
 },
 {
   name: "Tuesday Workshop Lead",
   item_type: weekday_workshop,
   description: "Admission to the Tuesday workshop",
   supply: 20
 },
 {
   name: "Tuesday Workshop Follow",
   item_type: weekday_workshop,
   description: "Admission to the Tuesday workshop",
   supply: 20
 },
 {
   name: "Wednesday Workshop Lead",
   item_type: weekday_workshop,
   description: "Admission to the Wednesday workshop",
   supply: 20
 },
 {
   name: "Wednesday Workshop Follow",
   item_type: weekday_workshop,
   description: "Admission to the Wednesday workshop",
   supply: 20
 },
 {
   name: "Thursday Workshop Lead",
   item_type: weekday_workshop,
   description: "Admission to the Thursday workshop",
   supply: 20
 },
 {
   name: "Thursday Workshop Follow",
   item_type: weekday_workshop,
   description: "Admission to the Thursday workshop",
   supply: 20
 },
 {
   name: "Contest Entry",
   item_type: contest_entry,
   description: "Entry into the weekend contest",
   supply: 60
 },
 {
   name: "Special Snowflake",
   item_type: unique_item_type,
   description: "A special item that there is only one of!",
   supply: 1
 }
])

full_pass_intermediate_follow = items[0]
full_pass_intermediate_lead = items[1]
full_pass_advanced_follow = items[2]
full_pass_advanced_lead = items[3]
full_pass_masters_follow = items[4]
full_pass_masters_lead = items[5]
dance_pass_item = items[6]
tuesday_workshop_lead = items[7]
tuesday_workshop_follow = items[8]
wednesday_workshop_lead = items[9]
wednesday_workshop_follow = items[10]
thursday_workshop_lead = items[11]
thursday_workshop_follow = items[12]
contest_entry_item = items[13]
special_snowflake_item = items[14]

prices = Price.create([
 {
   item_type: full_pass,
   price_type: "Tier 1",
   priority: 1,
   amount: 180,
   supply: 40
 },
 {
   item_type: full_pass,
   price_type: "Tier 2",
   priority: 2,
   amount: 200,
   supply: 40
 },
 {
   item_type: full_pass,
   price_type: "Tier 3",
   priority: 3,
   amount: 220,
   supply: 40
 },
 {
   item_type: full_pass,
   price_type: "Comp",
   priority: 100,
   amount: 0,
   supply: 0
 },
 {
   item_type: full_pass,
   price_type: "Volunteer Level 1",
   priority: 101,
   amount: 50,
   supply: 0
 },
 {
   item_type: dance_pass,
   price_type: "Default",
   priority: 1,
   amount: 75,
   supply: 50
 },
 {
   item_type: weekday_workshop,
   price_type: "Default",
   priority: 1,
   amount: 40,
   supply: 120
 },
 {
   item_type: contest_entry,
   price_type: "Default",
   priority: 1,
   amount: 15,
   supply: 60
 },
 {
  item_type: unique_item_type,
  price_type: "Default",
  priority: 1,
  amount: 100,
  supply: 10
 }
])

tier_1 = prices[0]
tier_2 = prices[1]
tier_3 = prices[2]
full_pass_comp = prices[3]
full_pass_volunteer = prices[4]
dance_pass_default_price = prices[5]
weekday_workshop_default_price = prices[6]
contest_entry_default_price = prices[7]
unique_item_default_price = prices[8]

payments = Payment.create([
 {
 	# Jane Doe paid for a Full Pass at Tier 1 and one Weekday Workshop
   user: jane,
   amount: 220,
   method: 'PayPal'
 },
 {
 	# Jack Black paid for a Dance Pass via Paypal
 	user: jack,
 	amount: 75,
 	method: 'PayPal'
 },
 {
 	# Jack Black paid for a contest entry in Cash
 	user: jack,
 	amount: 15,
 	method: 'Cash'
 },
 {
  user: tim,
  amount: 180,
  method: 'Stripe'
 }
])

janePaidForFullPassAndWorkshop = payments[0]
jackPaidForDancePass = payments[1]
jackPaidForContestEntry = payments[2]
timPaidForFullPass = payments[3]

sales = Sale.create([
 {
 	# sold Jane Doe a Full Pass Masters Follow at Tier 1
   user: jane,
   item: full_pass_masters_follow,
   price: tier_1,
   payment: janePaidForFullPassAndWorkshop
 },
 {
 	# sold Jane Doe a Thursday Workshop Follow
   user: jane,
   item: thursday_workshop_follow,
   price: weekday_workshop_default_price,
   payment: janePaidForFullPassAndWorkshop
 },
 {
  # sold Jane Doe a Special Snowflake
   user: jane,
   item: special_snowflake_item,
   price: unique_item_default_price,
   payment: janePaidForFullPassAndWorkshop
 },
 {
 	# sold Jack Black a Dance Pass
 	user: jack,
 	item: dance_pass_item,
 	price: prices[5],
 	payment: jackPaidForDancePass
 },
 {
 	# sold Jack Black a Contest Entry
 	user: jack,
 	item: contest_entry_item,
 	price: prices[5],
 	payment: jackPaidForContestEntry
 },
 {
  user: tim,
  item: full_pass_intermediate_follow,
  price: prices[0],
  payment: timPaidForFullPass,
  void: true
 },
 {
  # tim exchanged his full_pass_intermediate_follow for a full_pass_intermediate_lead
  user: tim,
  item: full_pass_intermediate_lead,
  price: prices[0],
  payment: timPaidForFullPass
 }
])

exclusions = Exclusion.create(
[
   # every full pass excludes a dance pass
   {
      excluder_item: full_pass_intermediate_follow,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: full_pass_intermediate_lead,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: full_pass_advanced_follow,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: full_pass_advanced_lead,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: full_pass_masters_follow,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: full_pass_masters_lead,
      excluded_item: dance_pass_item
   },
   # every item excludes itself
   {
      excluder_item: full_pass_intermediate_follow,
      excluded_item: full_pass_intermediate_follow
   },
   {
      excluder_item: full_pass_intermediate_lead,
      excluded_item: full_pass_intermediate_lead
   },
   {
      excluder_item: full_pass_advanced_follow,
      excluded_item: full_pass_advanced_follow
   },
   {
      excluder_item: full_pass_advanced_lead,
      excluded_item: full_pass_advanced_lead
   },
   {
      excluder_item: full_pass_masters_follow,
      excluded_item: full_pass_masters_follow
   },
   {
      excluder_item: full_pass_masters_lead,
      excluded_item: full_pass_masters_lead
   },
   {
      excluder_item: dance_pass_item,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: tuesday_workshop_lead,
      excluded_item: tuesday_workshop_lead
   },
   {
      excluder_item: tuesday_workshop_follow,
      excluded_item: tuesday_workshop_follow
   },
   {
      excluder_item: wednesday_workshop_lead,
      excluded_item: wednesday_workshop_lead
   },
   {
      excluder_item: wednesday_workshop_follow,
      excluded_item: wednesday_workshop_follow
   },
   {
      excluder_item: thursday_workshop_lead,
      excluded_item: thursday_workshop_lead
   },
   {
      excluder_item: thursday_workshop_follow,
      excluded_item: thursday_workshop_follow
   },
   {
      excluder_item: contest_entry_item,
      excluded_item: contest_entry_item
   },
   {
      excluder_item: special_snowflake_item,
      excluded_item: special_snowflake_item
   }
]
)

qualifications = Qualification.create([
   {
      qualifier_item: full_pass_intermediate_follow,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: full_pass_intermediate_lead,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: full_pass_advanced_follow,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: full_pass_advanced_lead,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: full_pass_masters_follow,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: full_pass_masters_lead,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: dance_pass_item,
      qualified_item: contest_entry_item
   }
])

upgrades = Upgrade.create(
[
   # every full pass can be upgraded to (exchanged for) a different full pass
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: full_pass_intermediate_follow
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: full_pass_intermediate_lead
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: full_pass_advanced_follow
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: full_pass_advanced_lead
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: full_pass_masters_follow
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: full_pass_masters_lead
  },
  {
    upgrade_from_item: full_pass_intermediate_follow,
    upgrade_to_item: full_pass_intermediate_lead
  },
  {
    upgrade_from_item: full_pass_intermediate_follow,
    upgrade_to_item: full_pass_advanced_follow
  },
  {
    upgrade_from_item: full_pass_intermediate_follow,
    upgrade_to_item: full_pass_advanced_lead
  },
  {
    upgrade_from_item: full_pass_intermediate_follow,
    upgrade_to_item: full_pass_masters_follow
  },
  {
    upgrade_from_item: full_pass_intermediate_follow,
    upgrade_to_item: full_pass_masters_lead
  },
  {
    upgrade_from_item: full_pass_intermediate_lead,
    upgrade_to_item: full_pass_intermediate_follow
  },
  {
    upgrade_from_item: full_pass_intermediate_lead,
    upgrade_to_item: full_pass_advanced_follow
  },
  {
    upgrade_from_item: full_pass_intermediate_lead,
    upgrade_to_item: full_pass_advanced_lead
  },
  {
    upgrade_from_item: full_pass_intermediate_lead,
    upgrade_to_item: full_pass_masters_follow
  },
  {
    upgrade_from_item: full_pass_intermediate_lead,
    upgrade_to_item: full_pass_masters_lead
  },
  {
    upgrade_from_item: full_pass_advanced_follow,
    upgrade_to_item: full_pass_intermediate_follow
  },
  {
    upgrade_from_item: full_pass_advanced_follow,
    upgrade_to_item: full_pass_intermediate_lead
  },
  {
    upgrade_from_item: full_pass_advanced_follow,
    upgrade_to_item: full_pass_advanced_lead
  },
  {
    upgrade_from_item: full_pass_advanced_follow,
    upgrade_to_item: full_pass_masters_follow
  },
  {
    upgrade_from_item: full_pass_advanced_follow,
    upgrade_to_item: full_pass_masters_lead
  },
  {
    upgrade_from_item: full_pass_advanced_lead,
    upgrade_to_item: full_pass_intermediate_follow
  },
  {
    upgrade_from_item: full_pass_advanced_lead,
    upgrade_to_item: full_pass_intermediate_lead
  },
  {
    upgrade_from_item: full_pass_advanced_lead,
    upgrade_to_item: full_pass_advanced_follow
  },
  {
    upgrade_from_item: full_pass_advanced_lead,
    upgrade_to_item: full_pass_masters_follow
  },
  {
    upgrade_from_item: full_pass_advanced_lead,
    upgrade_to_item: full_pass_masters_lead
  },
  {
    upgrade_from_item: full_pass_masters_follow,
    upgrade_to_item: full_pass_intermediate_follow
  },
  {
    upgrade_from_item: full_pass_masters_follow,
    upgrade_to_item: full_pass_intermediate_lead
  },
  {
    upgrade_from_item: full_pass_masters_follow,
    upgrade_to_item: full_pass_advanced_follow
  },
  {
    upgrade_from_item: full_pass_masters_follow,
    upgrade_to_item: full_pass_advanced_lead
  },
  {
    upgrade_from_item: full_pass_masters_follow,
    upgrade_to_item: full_pass_masters_lead
  },
  {
    upgrade_from_item: full_pass_masters_lead,
    upgrade_to_item: full_pass_intermediate_follow
  },
  {
    upgrade_from_item: full_pass_masters_lead,
    upgrade_to_item: full_pass_intermediate_lead
  },
  {
    upgrade_from_item: full_pass_masters_lead,
    upgrade_to_item: full_pass_advanced_follow
  },
  {
    upgrade_from_item: full_pass_masters_lead,
    upgrade_to_item: full_pass_advanced_lead
  },
  {
    upgrade_from_item: full_pass_masters_lead,
    upgrade_to_item: full_pass_masters_follow
  },
  # every weekday workshop of one role can be upgraded to
  # the same-day workshop as the other role
  {
    upgrade_from_item: tuesday_workshop_lead,
    upgrade_to_item: tuesday_workshop_follow
  },
  {
    upgrade_from_item: tuesday_workshop_follow,
    upgrade_to_item: tuesday_workshop_lead
  },
  {
    upgrade_from_item: wednesday_workshop_lead,
    upgrade_to_item: wednesday_workshop_follow
  },
  {
    upgrade_from_item: wednesday_workshop_follow,
    upgrade_to_item: wednesday_workshop_lead
  },
  {
    upgrade_from_item: thursday_workshop_lead,
    upgrade_to_item: thursday_workshop_follow
  },
  {
    upgrade_from_item: thursday_workshop_follow,
    upgrade_to_item: thursday_workshop_lead
  }
]
)

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?