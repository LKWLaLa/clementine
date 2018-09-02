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
		first_name: 'Peter',
		last_name: 'Baelish',
      email: 'peter.baelish@example.com',
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

item_types = ItemType.create([
	{name: 'Full Pass'},{name: 'Weekday Workshop'},{name: 'Dance Pass'},{name: 'Contest Entry'}
])

items = Item.create(
[
 {
   name: "Full Pass Intermediate Follow",
   item_type: item_types[0],
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   inventory: 20,
   supply: 20
 },
 {
   name: "Full Pass Intermediate Lead",
   item_type: item_types[0],
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   inventory: 20,
   supply: 20
 },
 {
   name: "Full Pass Advanced Follow",
   item_type: item_types[0],
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   inventory: 20,
   supply: 20
 },
 {
   name: "Full Pass Advanced Lead",
   item_type: item_types[0],
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   inventory: 20,
   supply: 20
 },
 {
   name: "Full Pass Masters Follow",
   item_type: item_types[0],
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   inventory: 19,
   supply: 20
 },
 {
   name: "Full Pass Masters Lead",
   item_type: item_types[0],
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   inventory: 20,
   supply: 20
 },
 {
   name: "Dance Pass",
   item_type: item_types[2],
   description: "Admission to the Friday, Saturday, and Sunday evening dances",
   inventory: 59,
   supply: 60
 },
 {
   name: "Tuesday Workshop Lead",
   item_type: item_types[1],
   description: "Admission to the Tuesday workshop",
   inventory: 20,
   supply: 20
 },
 {
   name: "Tuesday Workshop Follow",
   item_type: item_types[1],
   description: "Admission to the Tuesday workshop",
   inventory: 20,
   supply: 20
 },
 {
   name: "Wednesday Workshop Lead",
   item_type: item_types[1],
   description: "Admission to the Wednesday workshop",
   inventory: 20,
   supply: 20
 },
 {
   name: "Wednesday Workshop Follow",
   item_type: item_types[1],
   description: "Admission to the Wednesday workshop",
   inventory: 20,
   supply: 20
 },
 {
   name: "Thursday Workshop Lead",
   item_type: item_types[1],
   description: "Admission to the Thursday workshop",
   inventory: 20,
   supply: 20
 },
 {
   name: "Thursday Workshop Follow",
   item_type: item_types[1],
   description: "Admission to the Thursday workshop",
   inventory: 19,
   supply: 20
 },
 {
   name: "Contest Entry",
   item_type: item_types[3],
   description: "Entry into the weekend contest",
   inventory: 59,
   supply: 60
 }
])

prices = Price.create([
 {
   item_type: item_types[0],
   price_type: "Tier 1",
   priority: 1,
   amount: 180,
   inventory: 39,
   supply: 40
 },
 {
   item_type: item_types[0],
   price_type: "Tier 2",
   priority: 2,
   amount: 200,
   inventory: 40,
   supply: 40
 },
 {
   item_type: item_types[0],
   price_type: "Tier 3",
   priority: 3,
   amount: 220,
   inventory: 40,
   supply: 40
 },
 {
   item_type: item_types[0],
   price_type: "Comp",
   priority: 100,
   amount: 0,
   inventory: 0,
   supply: 0
 },
 {
   item_type: item_types[0],
   price_type: "Volunteer Level 1",
   priority: 101,
   amount: 50,
   inventory: 0,
   supply: 0
 },
 {
   item_type: item_types[2],
   price_type: "Default",
   priority: 1,
   amount: 75,
   inventory: 49,
   supply: 50
 },
 {
   item_type: item_types[1],
   price_type: "Default",
   priority: 1,
   amount: 40,
   inventory: 119,
   supply: 120
 },
 {
   item_type: item_types[3],
   price_type: "Default",
   priority: 1,
   amount: 15,
   inventory: 59,
   supply: 60
 }
])

payments = Payment.create([
 {
 	# Jane Doe paid for a Full Pass at Tier 1 and one Weekday Workshop
   user: users[0],
   amount: 220,
   method: 'PayPal'
 },
 {
 	# Jack Black paid for a Dance Pass via Paypal
 	user: users[1],
 	amount: 75,
 	method: 'PayPal'
 },
 {
 	# Jack Black paid for a contest entry in Cash
 	user: users[1],
 	amount: 15,
 	method: 'Cash'
 }
])

sales = Sale.create([
 {
 	# sold Jane Doe a Full Pass Masters Follow at Tier 1
   user: users[0],
   item: items[4],
   price: prices[0],
   payment: payments[0]
 },
 {
 	# sold Jane Doe a Thursday Workshop Follow
   user: users[0],
   item: items[12],
   price: prices[6],
   payment: payments[0]
 },
 {
 	# sold Jack Black a Dance Pass
 	user: users[1],
 	item: items[6],
 	price: prices[5],
 	payment: payments[1]
 },
 {
 	# sold Jack Black a Contest Entry
 	user: users[1],
 	item: items[13],
 	price: prices[5],
 	payment: payments[2]
 }
])




AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?