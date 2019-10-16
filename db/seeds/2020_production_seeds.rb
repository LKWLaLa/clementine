bw19 = Event.create({name: 'Bal Week 2019', active: false})
bw20 = Event.create({name: 'Bal Week 2020', active: true})

ItemType.update_all(event_id: bw19.id)

weekend_pass_20 = ItemType.create({
    name: 'Weekend Pass',
    description: 'Includes admission to one weekend workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.',
    event: bw20
})
weekday_workshop_20 = ItemType.create({
    name: 'Weekday Workshop',
    description: "Admission to one weekday workshop.",
    event: bw20
})
dance_pass_20 = ItemType.create({
    name: 'Weekend Dance Pass',
    description: 'Admission to the Friday, Saturday, and Sunday evening dances.',
    event: bw20
})
rendezvous_type_20 = ItemType.create({
    name: 'Rendezvous Contest Entry',
    description: 'Entry into the Rendezvous Contest. Only one registration per couple required.',
    event: bw20
})
draw_type_20 = ItemType.create({
    name: 'Draw Contest Entry',
    description: 'Entry into the Draw Contest.',
    event: bw20
})

items = Item.create([
 {
   name: "Weekend Pass Intermediate Follow",
   item_type: weekend_pass_20,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Intermediate Lead",
   item_type: weekend_pass_20,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Advanced Follow",
   item_type: weekend_pass_20,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Advanced Lead",
   item_type: weekend_pass_20,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Masters Follow",
   item_type: weekend_pass_20,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Masters Lead",
   item_type: weekend_pass_20,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Dance Pass",
   item_type: dance_pass_20,
   description: "Admission to the Friday, Saturday, and Sunday evening dances",
   supply: 60
 },
 {
   name: "Tuesday Workshop Lead",
   item_type: weekday_workshop_20,
   description: "Admission to the Tuesday workshop",
   supply: 20
 },
 {
   name: "Tuesday Workshop Follow",
   item_type: weekday_workshop_20,
   description: "Admission to the Tuesday workshop",
   supply: 20
 },
 {
   name: "Wednesday Workshop Lead",
   item_type: weekday_workshop_20,
   description: "Admission to the Wednesday workshop",
   supply: 20
 },
 {
   name: "Wednesday Workshop Follow",
   item_type: weekday_workshop_20,
   description: "Admission to the Wednesday workshop",
   supply: 20
 },
 {
   name: "Thursday Workshop Lead",
   item_type: weekday_workshop_20,
   description: "Admission to the Thursday workshop",
   supply: 20
 },
 {
   name: "Thursday Workshop Follow",
   item_type: weekday_workshop_20,
   description: "Admission to the Thursday workshop",
   supply: 20
 },
 {
   name: "Rendezvous Contest",
   item_type: rendezvous_type_20,
   description: "Entry into the rendezvous contest. Only one registration per couple required.",
   supply: 60,
   partnered: true
 },
 {
   name: "Draw Contest Follow",
   item_type: draw_type_20,
   description: "Entry into the draw contest as a follow",
   supply: 40,
   partnered: false
 },
 {
   name: "Draw Contest Lead",
   item_type: draw_type_20,
   description: "Entry into the draw contest as a lead",
   supply: 40,
   partnered: false
 }
])

weekend_pass_intermediate_follow_20 = items[0]
weekend_pass_intermediate_lead_20 = items[1]
weekend_pass_advanced_follow_20 = items[2]
weekend_pass_advanced_lead_20 = items[3]
weekend_pass_masters_follow_20 = items[4]
weekend_pass_masters_lead_20 = items[5]
dance_pass_item_20 = items[6]
tuesday_workshop_lead_20 = items[7]
tuesday_workshop_follow_20 = items[8]
wednesday_workshop_lead_20 = items[9]
wednesday_workshop_follow_20 = items[10]
thursday_workshop_lead_20 = items[11]
thursday_workshop_follow_20 = items[12]
rendezvous_item_20 = items[13]
draw_follow_20 = items[14]
draw_lead_20 = items[15]

prices = Price.create([
 {
   item_type: weekend_pass_20,
   price_type: "Tier 1",
   priority: 1,
   amount: 180,
   supply: 10,
   private: false
 },
 {
   item_type: weekend_pass_20,
   price_type: "Tier 2",
   priority: 2,
   amount: 190,
   supply: 10,
   private: false
 },
 {
   item_type: weekend_pass_20,
   price_type: "Tier 3",
   priority: 3,
   amount: 200,
   supply: 20,
   private: false
 },
 {
   item_type: weekend_pass_20,
   price_type: "Tier 4",
   priority: 4,
   amount: 210,
   supply: 20,
   private: false
 },
 {
   item_type: weekend_pass_20,
   price_type: "Tier 5",
   priority: 5,
   amount: 220,
   supply: 60,
   private: false
 },
 {
   item_type: dance_pass_20,
   price_type: "standard",
   priority: 1,
   amount: 75,
   supply: 50,
   private: false
 },
 {
   item_type: weekday_workshop_20,
   price_type: "standard",
   priority: 1,
   amount: 30,
   supply: 120,
   private: false
 },
 {
   item_type: rendezvous_type_20,
   price_type: "standard",
   priority: 1,
   amount: 25,
   supply: 60,
   private: false
 },
 {
  item_type: draw_type_20,
  price_type: "standard",
  priority: 1,
  amount: 60,
  supply: 60,
  private: false
 }
])

tier_1_20 = prices[0]
tier_2_20 = prices[1]
tier_3_20 = prices[2]
tier_4_20 = prices[3]
tier_5_20 = prices[4]
dance_pass_standard_price_20 = prices[5]
weekday_workshop_standard_price_20 = prices[6]
rendezvous_standard_price_20 = prices[7]
draw_standard_price_20 = prices[8]


exclusions = Exclusion.create(
[
   {
      excluder_item: weekend_pass_intermediate_follow_20,
      excluded_item: dance_pass_item_20
   },
   {
      excluder_item: weekend_pass_intermediate_lead_20,
      excluded_item: dance_pass_item_20
   },
   {
      excluder_item: weekend_pass_advanced_follow_20,
      excluded_item: dance_pass_item_20
   },
   {
      excluder_item: weekend_pass_advanced_lead_20,
      excluded_item: dance_pass_item_20
   },
   {
      excluder_item: weekend_pass_masters_follow_20,
      excluded_item: dance_pass_item_20
   },
   {
      excluder_item: weekend_pass_masters_lead_20,
      excluded_item: dance_pass_item_20
   },
   # every item excludes itself_20
   {
      excluder_item: weekend_pass_intermediate_follow_20,
      excluded_item: weekend_pass_intermediate_follow_20
   },
   {
      excluder_item: weekend_pass_intermediate_lead_20,
      excluded_item: weekend_pass_intermediate_lead_20
   },
   {
      excluder_item: weekend_pass_advanced_follow_20,
      excluded_item: weekend_pass_advanced_follow_20
   },
   {
      excluder_item: weekend_pass_advanced_lead_20,
      excluded_item: weekend_pass_advanced_lead_20
   },
   {
      excluder_item: weekend_pass_masters_follow_20,
      excluded_item: weekend_pass_masters_follow_20
   },
   {
      excluder_item: weekend_pass_masters_lead_20,
      excluded_item: weekend_pass_masters_lead_20
   },
   {
      excluder_item: dance_pass_item_20,
      excluded_item: dance_pass_item_20
   },
   {
      excluder_item: tuesday_workshop_lead_20,
      excluded_item: tuesday_workshop_lead_20
   },
   {
      excluder_item: tuesday_workshop_follow_20,
      excluded_item: tuesday_workshop_follow_20
   },
   {
      excluder_item: wednesday_workshop_lead_20,
      excluded_item: wednesday_workshop_lead_20
   },
   {
      excluder_item: wednesday_workshop_follow_20,
      excluded_item: wednesday_workshop_follow_20
   },
   {
      excluder_item: thursday_workshop_lead_20,
      excluded_item: thursday_workshop_lead_20
   },
   {
      excluder_item: thursday_workshop_follow_20,
      excluded_item: thursday_workshop_follow_20
   },
   {
      excluder_item: rendezvous_item_20,
      excluded_item: rendezvous_item_20
   },
   {
      excluder_item: draw_lead_20,
      excluded_item: draw_follow_20
   },
   {
      excluder_item: draw_lead_20,
      excluded_item: draw_lead_20
   },
   {
      excluder_item: draw_follow_20,
      excluded_item: draw_follow_20
   },
   {
      excluder_item: draw_follow_20,
      excluded_item: draw_lead_20
   }
])

qualifications = Qualification.create([
   {
      qualifier_item: weekend_pass_intermediate_follow_20,
      qualified_item: rendezvous_item_20
   },
   {
      qualifier_item: weekend_pass_intermediate_lead_20,
      qualified_item: rendezvous_item_20
   },
   {
      qualifier_item: weekend_pass_advanced_follow_20,
      qualified_item: rendezvous_item_20
   },
   {
      qualifier_item: weekend_pass_advanced_lead_20,
      qualified_item: rendezvous_item_20
   },
   {
      qualifier_item: weekend_pass_masters_follow_20,
      qualified_item: rendezvous_item_20
   },
   {
      qualifier_item: weekend_pass_masters_lead_20,
      qualified_item: rendezvous_item_20
   },
   {
      qualifier_item: dance_pass_item_20,
      qualified_item: rendezvous_item_20
   },
   {
      qualifier_item: weekend_pass_intermediate_follow_20,
      qualified_item: draw_lead_20
   },
   {
      qualifier_item: weekend_pass_intermediate_lead_20,
      qualified_item: draw_lead_20
   },
   {
      qualifier_item: weekend_pass_advanced_follow_20,
      qualified_item: draw_lead_20
   },
   {
      qualifier_item: weekend_pass_advanced_lead_20,
      qualified_item: draw_lead_20
   },
   {
      qualifier_item: weekend_pass_masters_follow_20,
      qualified_item: draw_lead_20
   },
   {
      qualifier_item: weekend_pass_masters_lead_20,
      qualified_item: draw_lead_20
   },
   {
      qualifier_item: dance_pass_item_20,
      qualified_item: draw_lead_20
   },
   {
      qualifier_item: weekend_pass_intermediate_follow_20,
      qualified_item: draw_follow_20
   },
   {
      qualifier_item: weekend_pass_intermediate_lead_20,
      qualified_item: draw_follow_20
   },
   {
      qualifier_item: weekend_pass_advanced_follow_20,
      qualified_item: draw_follow_20
   },
   {
      qualifier_item: weekend_pass_advanced_lead_20,
      qualified_item: draw_follow_20
   },
   {
      qualifier_item: weekend_pass_masters_follow_20,
      qualified_item: draw_follow_20
   },
   {
      qualifier_item: weekend_pass_masters_lead_20,
      qualified_item: draw_follow_20
   },
   {
      qualifier_item: dance_pass_item_20,
      qualified_item: draw_follow_20
   }
])

upgrades = Upgrade.create(
[
  {
    upgrade_from_item: dance_pass_item_20,
    upgrade_to_item: weekend_pass_intermediate_follow_20
  },
  {
    upgrade_from_item: dance_pass_item_20,
    upgrade_to_item: weekend_pass_intermediate_lead_20
  },
  {
    upgrade_from_item: dance_pass_item_20,
    upgrade_to_item: weekend_pass_advanced_follow_20
  },
  {
    upgrade_from_item: dance_pass_item_20,
    upgrade_to_item: weekend_pass_advanced_lead_20
  },
  {
    upgrade_from_item: dance_pass_item_20,
    upgrade_to_item: weekend_pass_masters_follow_20
  },
  {
    upgrade_from_item: dance_pass_item_20,
    upgrade_to_item: weekend_pass_masters_lead_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_20,
    upgrade_to_item: weekend_pass_intermediate_lead_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_20,
    upgrade_to_item: weekend_pass_advanced_follow_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_20,
    upgrade_to_item: weekend_pass_advanced_lead_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_20,
    upgrade_to_item: weekend_pass_masters_follow_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_20,
    upgrade_to_item: weekend_pass_masters_lead_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_20,
    upgrade_to_item: weekend_pass_intermediate_follow_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_20,
    upgrade_to_item: weekend_pass_advanced_follow_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_20,
    upgrade_to_item: weekend_pass_advanced_lead_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_20,
    upgrade_to_item: weekend_pass_masters_follow_20
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_20,
    upgrade_to_item: weekend_pass_masters_lead_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_20,
    upgrade_to_item: weekend_pass_intermediate_follow_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_20,
    upgrade_to_item: weekend_pass_intermediate_lead_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_20,
    upgrade_to_item: weekend_pass_advanced_lead_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_20,
    upgrade_to_item: weekend_pass_masters_follow_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_20,
    upgrade_to_item: weekend_pass_masters_lead_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_20,
    upgrade_to_item: weekend_pass_intermediate_follow_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_20,
    upgrade_to_item: weekend_pass_intermediate_lead_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_20,
    upgrade_to_item: weekend_pass_advanced_follow_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_20,
    upgrade_to_item: weekend_pass_masters_follow_20
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_20,
    upgrade_to_item: weekend_pass_masters_lead_20
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_20,
    upgrade_to_item: weekend_pass_intermediate_follow_20
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_20,
    upgrade_to_item: weekend_pass_intermediate_lead_20
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_20,
    upgrade_to_item: weekend_pass_advanced_follow_20
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_20,
    upgrade_to_item: weekend_pass_advanced_lead_20
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_20,
    upgrade_to_item: weekend_pass_masters_lead_20
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_20,
    upgrade_to_item: weekend_pass_intermediate_follow_20
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_20,
    upgrade_to_item: weekend_pass_intermediate_lead_20
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_20,
    upgrade_to_item: weekend_pass_advanced_follow_20
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_20,
    upgrade_to_item: weekend_pass_advanced_lead_20
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_20,
    upgrade_to_item: weekend_pass_masters_follow_20
  },
  # every weekday workshop of one role can be upgraded to_20
  # the same-day workshop as the other role_20
  {
    upgrade_from_item: tuesday_workshop_lead_20,
    upgrade_to_item: tuesday_workshop_follow_20
  },
  {
    upgrade_from_item: tuesday_workshop_follow_20,
    upgrade_to_item: tuesday_workshop_lead_20
  },
  {
    upgrade_from_item: wednesday_workshop_lead_20,
    upgrade_to_item: wednesday_workshop_follow_20
  },
  {
    upgrade_from_item: wednesday_workshop_follow_20,
    upgrade_to_item: wednesday_workshop_lead_20
  },
  {
    upgrade_from_item: thursday_workshop_lead_20,
    upgrade_to_item: thursday_workshop_follow_20
  },
  {
    upgrade_from_item: thursday_workshop_follow_20,
    upgrade_to_item: thursday_workshop_lead_20
  }
]
)





