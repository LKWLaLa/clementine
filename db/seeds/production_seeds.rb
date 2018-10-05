item_types = ItemType.create([
	{name: 'Weekend Pass'},
	{name: 'Weekday Workshop'},
	{name: 'Dance Pass'},
	{name: 'Contest Entry'}
])

weekend_pass = item_types[0]
weekday_workshop = item_types[1]
dance_pass = item_types[2]
contest_entry = item_types[3]

items = Item.create(
[
 {
   name: "Weekend Pass Intermediate Follow",
   item_type: weekend_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Intermediate Lead",
   item_type: weekend_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Advanced Follow",
   item_type: weekend_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Advanced Lead",
   item_type: weekend_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Masters Follow",
   item_type: weekend_pass,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Masters Lead",
   item_type: weekend_pass,
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
 }
])

weekend_pass_intermediate_follow = items[0]
weekend_pass_intermediate_lead = items[1]
weekend_pass_advanced_follow = items[2]
weekend_pass_advanced_lead = items[3]
weekend_pass_masters_follow = items[4]
weekend_pass_masters_lead = items[5]
dance_pass_item = items[6]
tuesday_workshop_lead = items[7]
tuesday_workshop_follow = items[8]
wednesday_workshop_lead = items[9]
wednesday_workshop_follow = items[10]
thursday_workshop_lead = items[11]
thursday_workshop_follow = items[12]
contest_entry_item = items[13]

prices = Price.create([
 {
   item_type: weekend_pass,
   price_type: "Tier 1",
   priority: 1,
   amount: 180,
   supply: 10
 },
 {
   item_type: weekend_pass,
   price_type: "Tier 2",
   priority: 2,
   amount: 190,
   supply: 10
 },
 {
   item_type: weekend_pass,
   price_type: "Tier 3",
   priority: 3,
   amount: 200,
   supply: 20
 },
 {
   item_type: weekend_pass,
   price_type: "Tier 4",
   priority: 4,
   amount: 210,
   supply: 20
 },
 {
   item_type: weekend_pass,
   price_type: "Tier 5",
   priority: 5,
   amount: 220,
   supply: 60
 },
 {
   item_type: dance_pass,
   price_type: "standard",
   priority: 1,
   amount: 75,
   supply: 50
 },
 {
   item_type: weekday_workshop,
   price_type: "standard",
   priority: 1,
   amount: 30,
   supply: 120
 },
 {
   item_type: contest_entry,
   price_type: "standard",
   priority: 1,
   amount: 15,
   supply: 60
 }
])

tier_1 = prices[0]
tier_2 = prices[1]
tier_3 = prices[2]
tier_4 = prices[3]
tier_5 = prices[4]
dance_pass_standard_price = prices[5]
weekday_workshop_standard_price = prices[6]
contest_entry_standard_price = prices[7]

exclusions = Exclusion.create(
[
   # every full pass excludes a dance pass
   {
      excluder_item: weekend_pass_intermediate_follow,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: weekend_pass_intermediate_lead,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: weekend_pass_advanced_follow,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: weekend_pass_advanced_lead,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: weekend_pass_masters_follow,
      excluded_item: dance_pass_item
   },
   {
      excluder_item: weekend_pass_masters_lead,
      excluded_item: dance_pass_item
   },
   # every item excludes itself
   {
      excluder_item: weekend_pass_intermediate_follow,
      excluded_item: weekend_pass_intermediate_follow
   },
   {
      excluder_item: weekend_pass_intermediate_lead,
      excluded_item: weekend_pass_intermediate_lead
   },
   {
      excluder_item: weekend_pass_advanced_follow,
      excluded_item: weekend_pass_advanced_follow
   },
   {
      excluder_item: weekend_pass_advanced_lead,
      excluded_item: weekend_pass_advanced_lead
   },
   {
      excluder_item: weekend_pass_masters_follow,
      excluded_item: weekend_pass_masters_follow
   },
   {
      excluder_item: weekend_pass_masters_lead,
      excluded_item: weekend_pass_masters_lead
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
   }
])

qualifications = Qualification.create([
   {
      qualifier_item: weekend_pass_intermediate_follow,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: weekend_pass_intermediate_lead,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: weekend_pass_advanced_follow,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: weekend_pass_advanced_lead,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: weekend_pass_masters_follow,
      qualified_item: contest_entry_item
   },
   {
      qualifier_item: weekend_pass_masters_lead,
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
    upgrade_to_item: weekend_pass_intermediate_follow
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: weekend_pass_intermediate_lead
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: weekend_pass_advanced_follow
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: weekend_pass_advanced_lead
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: weekend_pass_masters_follow
  },
  {
    upgrade_from_item: dance_pass_item,
    upgrade_to_item: weekend_pass_masters_lead
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow,
    upgrade_to_item: weekend_pass_intermediate_lead
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow,
    upgrade_to_item: weekend_pass_advanced_follow
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow,
    upgrade_to_item: weekend_pass_advanced_lead
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow,
    upgrade_to_item: weekend_pass_masters_follow
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow,
    upgrade_to_item: weekend_pass_masters_lead
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead,
    upgrade_to_item: weekend_pass_intermediate_follow
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead,
    upgrade_to_item: weekend_pass_advanced_follow
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead,
    upgrade_to_item: weekend_pass_advanced_lead
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead,
    upgrade_to_item: weekend_pass_masters_follow
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead,
    upgrade_to_item: weekend_pass_masters_lead
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow,
    upgrade_to_item: weekend_pass_intermediate_follow
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow,
    upgrade_to_item: weekend_pass_intermediate_lead
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow,
    upgrade_to_item: weekend_pass_advanced_lead
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow,
    upgrade_to_item: weekend_pass_masters_follow
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow,
    upgrade_to_item: weekend_pass_masters_lead
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead,
    upgrade_to_item: weekend_pass_intermediate_follow
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead,
    upgrade_to_item: weekend_pass_intermediate_lead
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead,
    upgrade_to_item: weekend_pass_advanced_follow
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead,
    upgrade_to_item: weekend_pass_masters_follow
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead,
    upgrade_to_item: weekend_pass_masters_lead
  },
  {
    upgrade_from_item: weekend_pass_masters_follow,
    upgrade_to_item: weekend_pass_intermediate_follow
  },
  {
    upgrade_from_item: weekend_pass_masters_follow,
    upgrade_to_item: weekend_pass_intermediate_lead
  },
  {
    upgrade_from_item: weekend_pass_masters_follow,
    upgrade_to_item: weekend_pass_advanced_follow
  },
  {
    upgrade_from_item: weekend_pass_masters_follow,
    upgrade_to_item: weekend_pass_advanced_lead
  },
  {
    upgrade_from_item: weekend_pass_masters_follow,
    upgrade_to_item: weekend_pass_masters_lead
  },
  {
    upgrade_from_item: weekend_pass_masters_lead,
    upgrade_to_item: weekend_pass_intermediate_follow
  },
  {
    upgrade_from_item: weekend_pass_masters_lead,
    upgrade_to_item: weekend_pass_intermediate_lead
  },
  {
    upgrade_from_item: weekend_pass_masters_lead,
    upgrade_to_item: weekend_pass_advanced_follow
  },
  {
    upgrade_from_item: weekend_pass_masters_lead,
    upgrade_to_item: weekend_pass_advanced_lead
  },
  {
    upgrade_from_item: weekend_pass_masters_lead,
    upgrade_to_item: weekend_pass_masters_follow
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

AdminUser.create(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
