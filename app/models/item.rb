class Item < ApplicationRecord
  belongs_to :item_type
  has_many :sales
  has_many :users, through: :sales

  # We may think of an item as an "excluder."  When a user purchases an excluder item,
  # some other items are excluded from the list of items the user can purchase
  # in the future.  For instance, if a user purchases vodka, we may wish to exclude
  # Advil from the list of products available to that user in the future, as vodka and
  # Advil taken together can have nasty side-effects.

  # In this case, we think of vodka as the excluder_item and Advil as the excluded_item.
  # Viewed as an excluder_item, an item can have many excluded_items
  has_many :excluder_excludeds, foreign_key: :excluder_item_id, class_name: "Exclusion"
  has_many :excluded_items, through: :excluder_excludeds

  # Viewed as an excluded_item, an item can have many excluder_items
  has_many :timmy, foreign_key: :excluded_item_id, class_name: "Exclusion"
  has_many :excluder_items, through: :timmy
end
