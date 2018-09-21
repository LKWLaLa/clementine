class Item < ApplicationRecord
  belongs_to :item_type
  has_many :prices, through: :item_type
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
  has_many :excluded_excluders, foreign_key: :excluded_item_id, class_name: "Exclusion"
  has_many :excluder_items, through: :excluded_excluders

  # qualifications are analogous to exclusions
  # Viewed as a qualifier_item, an item can have many qualified_items
  has_many :qualifier_qualifieds, foreign_key: :qualifier_item_id, class_name: "Qualification"
  has_many :qualified_items, through: :qualifier_qualifieds

  # Viewed as a qualified_item, an item can have many qualifier_items
  has_many :qualified_qualifiers, foreign_key: :qualified_item_id, class_name: "Qualification"
  has_many :qualifier_items, through: :qualified_qualifiers

  # upgrades are analogous to exclusions
  # Viewed as an upgrade_from_item, an item can have many upgrade_to_items
  has_many :upgrade_from_to, foreign_key: :upgrade_from_item_id, class_name: "Upgrade"
  has_many :upgrade_to_items, through: :upgrade_from_to

  # Viewed as an upgrade_to_item, an item can have many upgrade_from_items
  has_many :upgrade_to_from, foreign_key: :upgrade_to_item_id, class_name: "Upgrade"
  has_many :upgrade_from_items, through: :upgrade_to_from

  # items that do not require a qualifying purchase
  def self.no_qualifier_item_required
  	Item.where.not(:id => Qualification.all.pluck(:qualified_item_id).uniq)
  end

  def current_price
  	price = self.item_type.current_price
    if (price && self.quantity_sold < self.supply)
      return price.amount
    end 
    return nil
  end

  def quantity_sold
    self.sales.count
  end

  def quantity_remaining
    self.supply - self.quantity_sold
  end

  def sold_out
    self.quantity_remaining == 0
  end
end
