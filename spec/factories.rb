FactoryBot.define do
	sequence :item_type_name do |n|
		"type#{n}"
	end

	factory :item_type do
		name {generate(:item_type_name)}
	end

	sequence :item_name do |n|
		"item#{n}"
	end

	factory :item,
			aliases: [:upgrade_from_item,:upgrade_to_item,
						:excluder_item,:excluded_item,
						:qualifier_item,:qualified_item] do
		name {generate(:item_name)}
		item_type
	end

	factory :price do
		price_type {"regular"}
		amount {1.00}
		supply {100}
		inventory {100}
		priority {1}
		
		item_type #makes a default item_type and associates it with the price under construction
	end
	
	sequence :email do |n|
    	"person#{n}@example.com"
	end

	sequence :last_name do |n|
		"Doe#{n}"
	end

	factory :user do
		first_name {"Jane"}
		last_name {generate(:last_name)}
		email {generate(:email)}
		password {"password"}
	end

	factory :payment do
		amount {1.00}
		user
	end

	factory :sale do
		# Inherently, building a sale is problematic.
		# We should ensure that the item_type of the associated price and the item_type
		# of the associated item are the same.  But the user could supply
		# override values. What if the override values for price and item conflict in
		# their item_type?  Similar issue for sale.user and sale.payment.user.
		# Working solution: if conflicting values are provided,
		# - For item conflict, overwrite sale.item with a new item
		#   whose item_type is sale.price.item_type. Otherwise use default
		#   for newly constructed payment
		# - For user conflict, overwrite sale.payment with a new payment
		#   whose user is sale.user.  Otherwise use default values for a 
		#   newly constructed payment.

		# user
		# price
		# item
		# payment
		
		# ensure that the item_type of the associated price and the item_type
		# of the associated item are the same
		# also ensure that sale.payment.user == sale.user
		# but does an item_type have an id if it hasn't been saved to the database?
		after(:build) do |sale, evaluator|
			if (sale.item)
				if (sale.price)
					if (sale.price.item_type != sale.item.item_type)
						raise "conflicting item types"
					end
				else
					sale.price = build(:price, item_type: sale.item.item_type)
				end
			else
				if (!sale.price)
					sale.price = build(:price)
				end
				sale.item = build(:item, item_type: sale.price.item_type)
			end

			if (sale.user)
				if (sale.payment)
					if (sale.user != sale.payment.user)
						raise "conflicting users"
					end
				else
					sale.payment = build(:payment, user: sale.user)
				end
			else
				if (!sale.payment)
					sale.payment = build(:payment)
				end
				sale.user = sale.payment.user
			end


			# non-functioning code
			# if (# item was specified in the evaluator but price was not
			# 	evaluator.item && !evaluator.price)
			# 	sale.price = build(:price, item_type: evaluator.item.item_type)
			# elsif (sale.price.item_type.id != sale.item.item_type.id)
			# 	if (evaluator.item && evaluator.price)
			# 		puts "evaluator.item.item_type.id == #{evaluator.item.item_type.id}"
			# 		puts "evaluator.price.item_type.id == #{evaluator.price.item_type.id}"
			# 		throw :conflicting_item_types
			# 	else
			# 		sale.item = build(:item, item_type: sale.price.item_type)
			# 	end
			# end
			# if (# payment was specified in the evaluator but user was not
			# 	evaluator.payment && !evaluator.user)
			# 	sale.user = evaluator.payment.user
			# elsif (sale.payment.user.id != sale.user.id)
			# 	if (evaluator.payment && evaluator.user)
			# 		puts "evaluator.payment.user.id == #{evaluator.payment.user.id}"
			# 		puts "evaluator.user.id == #{evaluator.user.id}"
			# 		throw :conflicting_users
			# 	else
			# 		sale.payment = build(:payment, user: evaluator.payment.user)
			# 	end
			# end
		end
	end

	factory :upgrade do
		upgrade_from_item
		upgrade_to_item
		# association upgrade_from_item, factory: item
		# association upgrade_to_item, factory: item
	end

	factory :qualification do
		qualifier_item
		qualified_item
		# association qualifier_item factory: item
		# association qualified_item factory: item
	end

	factory :exclusion do
		excluder_item
		excluded_item
		# association excluder_item factory: item
		# association excluded_item factory: item
	end
end