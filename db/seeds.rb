events = Event.create([
  {name: 'Bal Week 2019', active: false},
  {name: 'Bal Week 2020', active: true}
])

bw19 = events[0]
bw20 = events[1]

item_types = ItemType.create([
  {
    name: 'Weekend Pass',
    description: 'Includes admission to one weekend workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.',
    event: bw19
  },
  {
    name: 'Weekday Workshop',
    description: "Admission to one weekday workshop.",
    event: bw19
  },
  {
    name: 'Weekend Dance Pass',
    description: 'Admission to the Friday, Saturday, and Sunday evening dances.',
    event: bw19
  },
  {
    name: 'Contest Entry',
    description: 'Entry into the weekend contest. Only one registration per couple required.',
    event: bw19
  },
  {
    name: 'Weekend Pass',
    description: 'Includes admission to one weekend workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.',
    event: bw20
  },
  {
    name: 'Weekday Workshop',
    description: "Admission to one weekday workshop.",
    event: bw20
  },
  {
    name: 'Weekend Dance Pass',
    description: 'Admission to the Friday, Saturday, and Sunday evening dances.',
    event: bw20
  },
  {
    name: 'Rendezvous Contest Entry',
    description: 'Entry into the Rendezvous Contest. Only one registration per couple required.',
    event: bw20
  },
  {
    name: 'Draw Contest Entry',
    description: 'Entry into the Draw Contest.',
    event: bw20
  }
])

weekend_pass_19 = item_types[0]
weekday_workshop_19 = item_types[1]
dance_pass_19 = item_types[2]
contest_entry_19 = item_types[3]
weekend_pass_20 = item_types[4]
weekday_workshop_20 = item_types[5]
dance_pass_20 = item_types[6]
rendezvous_type_20 = item_types[7]
draw_type_20 = item_types[8]


items = Item.create(
[
 {
   name: "Weekend Pass Intermediate Follow",
   item_type: weekend_pass_19,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20,
 },
 {
   name: "Weekend Pass Intermediate Lead",
   item_type: weekend_pass_19,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20,
 },
 {
   name: "Weekend Pass Advanced Follow",
   item_type: weekend_pass_19,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Advanced Lead",
   item_type: weekend_pass_19,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Masters Follow",
   item_type: weekend_pass_19,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Pass Masters Lead",
   item_type: weekend_pass_19,
   description: "Includes admission to one workshop track (8 hours of instruction) on Saturday and Sunday.  Also includes admission to Friday, Saturday, and Sunday evening dances.",
   supply: 20
 },
 {
   name: "Weekend Dance Pass",
   item_type: weekend_pass_19,
   description: "Admission to the Friday, Saturday, and Sunday evening dances",
   supply: 60
 },
 {
   name: "Tuesday Workshop Lead",
   item_type: weekday_workshop_19,
   description: "Admission to the Tuesday workshop",
   supply: 20
 },
 {
   name: "Tuesday Workshop Follow",
   item_type: weekday_workshop_19,
   description: "Admission to the Tuesday workshop",
   supply: 20
 },
 {
   name: "Wednesday Workshop Lead",
   item_type: weekday_workshop_19,
   description: "Admission to the Wednesday workshop",
   supply: 20
 },
 {
   name: "Wednesday Workshop Follow",
   item_type: weekday_workshop_19,
   description: "Admission to the Wednesday workshop",
   supply: 20
 },
 {
   name: "Thursday Workshop Lead",
   item_type: weekday_workshop_19,
   description: "Admission to the Thursday workshop",
   supply: 20
 },
 {
   name: "Thursday Workshop Follow",
   item_type: weekday_workshop_19,
   description: "Admission to the Thursday workshop",
   supply: 20
 },
 {
   name: "Rendezvous Contest",
   item_type: contest_entry_19,
   description: "Entry into the weekend contest. Only one registration per couple required.",
   supply: 60,
   partnered: true
 },
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

weekend_pass_intermediate_follow_19 = items[0]
weekend_pass_intermediate_lead_19 = items[1]
weekend_pass_advanced_follow_19 = items[2]
weekend_pass_advanced_lead_19 = items[3]
weekend_pass_masters_follow_19 = items[4]
weekend_pass_masters_lead_19 = items[5]
dance_pass_item_19 = items[6]
tuesday_workshop_lead_19 = items[7]
tuesday_workshop_follow_19 = items[8]
wednesday_workshop_lead_19 = items[9]
wednesday_workshop_follow_19 = items[10]
thursday_workshop_lead_19 = items[11]
thursday_workshop_follow_19 = items[12]
contest_entry_item_19 = items[13]
weekend_pass_intermediate_follow_20 = items[14]
weekend_pass_intermediate_lead_20 = items[15]
weekend_pass_advanced_follow_20 = items[16]
weekend_pass_advanced_lead_20 = items[17]
weekend_pass_masters_follow_20 = items[18]
weekend_pass_masters_lead_20 = items[19]
dance_pass_item_20 = items[20]
tuesday_workshop_lead_20 = items[21]
tuesday_workshop_follow_20 = items[22]
wednesday_workshop_lead_20 = items[23]
wednesday_workshop_follow_20 = items[24]
thursday_workshop_lead_20 = items[25]
thursday_workshop_follow_20 = items[26]
rendezvous_item_20 = items[27]
draw_follow_20 = items[28]
draw_lead_20 = items[29]

prices = Price.create([
 {
   item_type: weekend_pass_19,
   price_type: "Tier 1",
   priority: 1,
   amount: 180,
   supply: 10,
   private: false
 },
 {
   item_type: weekend_pass_19,
   price_type: "Tier 2",
   priority: 2,
   amount: 190,
   supply: 10,
   private: false
 },
 {
   item_type: weekend_pass_19,
   price_type: "Tier 3",
   priority: 3,
   amount: 200,
   supply: 20,
   private: false
 },
 {
   item_type: weekend_pass_19,
   price_type: "Tier 4",
   priority: 4,
   amount: 210,
   supply: 20,
   private: false
 },
 {
   item_type: weekend_pass_19,
   price_type: "Tier 5",
   priority: 5,
   amount: 220,
   supply: 60,
   private: false
 },
 {
   item_type: dance_pass_19,
   price_type: "standard",
   priority: 1,
   amount: 75,
   supply: 50,
   private: false
 },
 {
   item_type: weekday_workshop_19,
   price_type: "standard",
   priority: 1,
   amount: 30,
   supply: 120,
   private: false
 },
 {
   item_type: contest_entry_19,
   price_type: "standard",
   priority: 1,
   amount: 25,
   supply: 60,
   private: false
 },
 {
  item_type: weekend_pass_19,
  price_type: "OldSchool",
  priority: 0,
  amount: 140,
  supply: 0,
  private: true
 },
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

tier_1_19 = prices[0]
tier_2_19 = prices[1]
tier_3_19 = prices[2]
tier_4_19 = prices[3]
tier_5_19 = prices[4]
dance_pass_standard_price_19 = prices[5]
weekday_workshop_standard_price_19 = prices[6]
contest_entry_standard_price_19 = prices[7]
old_school_19 = prices[8]
tier_1_20 = prices[9]
tier_2_20 = prices[10]
tier_3_20 = prices[11]
tier_4_20 = prices[12]
tier_5_20 = prices[13]
dance_pass_standard_price_20 = prices[14]
weekday_workshop_standard_price_20 = prices[15]
rendezvous_standard_price_20 = prices[16]
draw_standard_price_20 = prices[17]


exclusions = Exclusion.create(
[
   # every full pass excludes a dance pass_19
   {
      excluder_item: weekend_pass_intermediate_follow_19,
      excluded_item: dance_pass_item_19
   },
   {
      excluder_item: weekend_pass_intermediate_lead_19,
      excluded_item: dance_pass_item_19
   },
   {
      excluder_item: weekend_pass_advanced_follow_19,
      excluded_item: dance_pass_item_19
   },
   {
      excluder_item: weekend_pass_advanced_lead_19,
      excluded_item: dance_pass_item_19
   },
   {
      excluder_item: weekend_pass_masters_follow_19,
      excluded_item: dance_pass_item_19
   },
   {
      excluder_item: weekend_pass_masters_lead_19,
      excluded_item: dance_pass_item_19
   },
   # every item excludes itself_19
   {
      excluder_item: weekend_pass_intermediate_follow_19,
      excluded_item: weekend_pass_intermediate_follow_19
   },
   {
      excluder_item: weekend_pass_intermediate_lead_19,
      excluded_item: weekend_pass_intermediate_lead_19
   },
   {
      excluder_item: weekend_pass_advanced_follow_19,
      excluded_item: weekend_pass_advanced_follow_19
   },
   {
      excluder_item: weekend_pass_advanced_lead_19,
      excluded_item: weekend_pass_advanced_lead_19
   },
   {
      excluder_item: weekend_pass_masters_follow_19,
      excluded_item: weekend_pass_masters_follow_19
   },
   {
      excluder_item: weekend_pass_masters_lead_19,
      excluded_item: weekend_pass_masters_lead_19
   },
   {
      excluder_item: dance_pass_item_19,
      excluded_item: dance_pass_item_19
   },
   {
      excluder_item: tuesday_workshop_lead_19,
      excluded_item: tuesday_workshop_lead_19
   },
   {
      excluder_item: tuesday_workshop_follow_19,
      excluded_item: tuesday_workshop_follow_19
   },
   {
      excluder_item: wednesday_workshop_lead_19,
      excluded_item: wednesday_workshop_lead_19
   },
   {
      excluder_item: wednesday_workshop_follow_19,
      excluded_item: wednesday_workshop_follow_19
   },
   {
      excluder_item: thursday_workshop_lead_19,
      excluded_item: thursday_workshop_lead_19
   },
   {
      excluder_item: thursday_workshop_follow_19,
      excluded_item: thursday_workshop_follow_19
   },
   {
      excluder_item: contest_entry_item_19,
      excluded_item: contest_entry_item_19
   },
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
      qualifier_item: weekend_pass_intermediate_follow_19,
      qualified_item: contest_entry_item_19
   },
   {
      qualifier_item: weekend_pass_intermediate_lead_19,
      qualified_item: contest_entry_item_19
   },
   {
      qualifier_item: weekend_pass_advanced_follow_19,
      qualified_item: contest_entry_item_19
   },
   {
      qualifier_item: weekend_pass_advanced_lead_19,
      qualified_item: contest_entry_item_19
   },
   {
      qualifier_item: weekend_pass_masters_follow_19,
      qualified_item: contest_entry_item_19
   },
   {
      qualifier_item: weekend_pass_masters_lead_19,
      qualified_item: contest_entry_item_19
   },
   {
      qualifier_item: dance_pass_item_19,
      qualified_item: contest_entry_item_19
   },
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
   # every full pass can be upgraded to (exchanged for) a different full pass_19
  {
    upgrade_from_item: dance_pass_item_19,
    upgrade_to_item: weekend_pass_intermediate_follow_19
  },
  {
    upgrade_from_item: dance_pass_item_19,
    upgrade_to_item: weekend_pass_intermediate_lead_19
  },
  {
    upgrade_from_item: dance_pass_item_19,
    upgrade_to_item: weekend_pass_advanced_follow_19
  },
  {
    upgrade_from_item: dance_pass_item_19,
    upgrade_to_item: weekend_pass_advanced_lead_19
  },
  {
    upgrade_from_item: dance_pass_item_19,
    upgrade_to_item: weekend_pass_masters_follow_19
  },
  {
    upgrade_from_item: dance_pass_item_19,
    upgrade_to_item: weekend_pass_masters_lead_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_19,
    upgrade_to_item: weekend_pass_intermediate_lead_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_19,
    upgrade_to_item: weekend_pass_advanced_follow_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_19,
    upgrade_to_item: weekend_pass_advanced_lead_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_19,
    upgrade_to_item: weekend_pass_masters_follow_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_follow_19,
    upgrade_to_item: weekend_pass_masters_lead_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_19,
    upgrade_to_item: weekend_pass_intermediate_follow_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_19,
    upgrade_to_item: weekend_pass_advanced_follow_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_19,
    upgrade_to_item: weekend_pass_advanced_lead_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_19,
    upgrade_to_item: weekend_pass_masters_follow_19
  },
  {
    upgrade_from_item: weekend_pass_intermediate_lead_19,
    upgrade_to_item: weekend_pass_masters_lead_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_19,
    upgrade_to_item: weekend_pass_intermediate_follow_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_19,
    upgrade_to_item: weekend_pass_intermediate_lead_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_19,
    upgrade_to_item: weekend_pass_advanced_lead_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_19,
    upgrade_to_item: weekend_pass_masters_follow_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_follow_19,
    upgrade_to_item: weekend_pass_masters_lead_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_19,
    upgrade_to_item: weekend_pass_intermediate_follow_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_19,
    upgrade_to_item: weekend_pass_intermediate_lead_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_19,
    upgrade_to_item: weekend_pass_advanced_follow_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_19,
    upgrade_to_item: weekend_pass_masters_follow_19
  },
  {
    upgrade_from_item: weekend_pass_advanced_lead_19,
    upgrade_to_item: weekend_pass_masters_lead_19
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_19,
    upgrade_to_item: weekend_pass_intermediate_follow_19
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_19,
    upgrade_to_item: weekend_pass_intermediate_lead_19
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_19,
    upgrade_to_item: weekend_pass_advanced_follow_19
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_19,
    upgrade_to_item: weekend_pass_advanced_lead_19
  },
  {
    upgrade_from_item: weekend_pass_masters_follow_19,
    upgrade_to_item: weekend_pass_masters_lead_19
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_19,
    upgrade_to_item: weekend_pass_intermediate_follow_19
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_19,
    upgrade_to_item: weekend_pass_intermediate_lead_19
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_19,
    upgrade_to_item: weekend_pass_advanced_follow_19
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_19,
    upgrade_to_item: weekend_pass_advanced_lead_19
  },
  {
    upgrade_from_item: weekend_pass_masters_lead_19,
    upgrade_to_item: weekend_pass_masters_follow_19
  },
  # every weekday workshop of one role can be upgraded to_19
  # the same-day workshop as the other role_19
  {
    upgrade_from_item: tuesday_workshop_lead_19,
    upgrade_to_item: tuesday_workshop_follow_19
  },
  {
    upgrade_from_item: tuesday_workshop_follow_19,
    upgrade_to_item: tuesday_workshop_lead_19
  },
  {
    upgrade_from_item: wednesday_workshop_lead_19,
    upgrade_to_item: wednesday_workshop_follow_19
  },
  {
    upgrade_from_item: wednesday_workshop_follow_19,
    upgrade_to_item: wednesday_workshop_lead_19
  },
  {
    upgrade_from_item: thursday_workshop_lead_19,
    upgrade_to_item: thursday_workshop_follow_19
  },
  {
    upgrade_from_item: thursday_workshop_follow_19,
    upgrade_to_item: thursday_workshop_lead_19
  },
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

AdminUser.create(email: ENV['ADMIN_EMAIL'], password: ENV['ADMIN_PASSWORD'], password_confirmation: ENV['ADMIN_PASSWORD'])

user_hashes = [
  {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@example.com',
    password: 'password',
    password_confirmation: 'password',
    city: 'New York City',
    country: 'USA'
  },
  {
    first_name: 'Jack',
    last_name: 'Black',
    email: 'jack.black@example.com',
    password: 'password',
    password_confirmation: 'password',
    city: 'London',
    country: 'UK'
  },
  {
    first_name: 'Ned',
    last_name: 'Stark',
    email: 'ned.stark@example.com',
    password: 'password',
    password_confirmation: 'password',
    city: 'Winterfell'
  },
  {
    first_name: 'Petyr',
    last_name: 'Baelish',
    email: 'petyr.baelish@example.com',
    password: 'password',
    password_confirmation: 'password',
    city: 'King\'s Landing'
  },
  {
    first_name: 'Tim',
    last_name: 'Allen',
    email: 'tim.allen@example.com',
    password: 'password',
    password_confirmation: 'password',
    city: 'Los Angeles',
    state: 'California'
  }
]

users = []
i = 0

user_hashes.each do |hash|
  user = User.new(hash)
  user.skip_confirmation!
  user.save!
  users[i] = user
  i += 1
end

jane = users[0]
jack = users[1]
ned = users[2]
peter = users[3]
tim = users[4]


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
 },
 {
  user: tim,
  amount: 180,
  method: 'Stripe'
 }
])

janePaidForFullPassAndWorkshop_19 = payments[0]
jackPaidForDancePass_19 = payments[1]
jackPaidForContestEntry_19 = payments[2]
timPaidForFullPass_19 = payments[3]
timPaidForFullPass_20 = payments[4]

sales = Sale.create([
 {
  # sold Jane Doe a Full Pass Masters Follow at Tier 1
   user: jane,
   item: weekend_pass_masters_follow_19,
   price: tier_1_19,
   payment: janePaidForFullPassAndWorkshop_19
 },
 {
  # sold Jane Doe a Thursday Workshop Follow
   user: jane,
   item: thursday_workshop_follow_19,
   price: weekday_workshop_standard_price_19,
   payment: janePaidForFullPassAndWorkshop_19
 },
 {
  # sold Jack Black a Dance Pass
  user: jack,
  item: dance_pass_item_19,
  price: dance_pass_standard_price_19,
  payment: jackPaidForDancePass_19
 },
 {
  # sold Jack Black a Contest Entry
  user: jack,
  item: contest_entry_item_19,
  price: contest_entry_standard_price_19,
  payment: jackPaidForContestEntry_19
 },
 {
  user: tim,
  item: weekend_pass_intermediate_follow_19,
  price: tier_1_19,
  payment: timPaidForFullPass_19,
  void: true
 },
 {
  # tim exchanged his weekend_pass_intermediate_follow_19 for a weekend_pass_intermediate_lead_19
  user: tim,
  item: weekend_pass_intermediate_lead_19,
  price: tier_1_19,
  payment: timPaidForFullPass_19
 },
 {
  user: tim,
  item: weekend_pass_intermediate_lead_20,
  price: tier_1_20,
  payment: timPaidForFullPass_20  
 }
])

jack_invited_jane = Partnership.create(
  invitee: jane,
  sale: sales[3]
)

offer_jack_old_school = Offer.create(
  user: ned,
  price: old_school_19,
  overrides_item_inventory: true,
  overrides_price_inventory: true
)

jack_volunteers_20 = EventVolunteer.create(
  volunteer: jack,
  event: bw20
)

