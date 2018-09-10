require 'rails_helper'

RSpec.describe "FactoryBot", :type => :factory do
	describe "price_factory" do
		it 'makes a new item_type by default' do
			type1 = build(:item_type)
			price_default = build(:price)
			expect(price_default.item_type).to_not eq type1
		end
		it 'overrides default new item with provided item' do
			type1 = build(:item_type)
			price_with_type1 = build(:price,item_type: type1)
			expect(price_with_type1.item_type).to eq type1
		end
	end

	describe "payment_factory" do
		it 'makes a new user by default' do
			user1 = build(:user)
			payment_default = build(:payment)
			expect(payment_default.user).to_not eq user1
		end
		it 'overrides default new user with provided user' do
			user1 = build(:user)
			payment_with_user1 = build(:payment,user: user1)
			expect(payment_with_user1.user).to eq user1
		end
	end

	describe "sale_factory" do
		it 'makes an item whose item_type is sale.price.item_type' do
			sale1 = build(:sale)
			expect(sale1.item.item_type).to eq sale1.price.item_type
			price2 = build(:price)
			sale2 = build(:sale, price: price2)
			expect(sale2.item.item_type).to eq price2.item_type
			expect(sale2.price.id).to eq price2.id
		end

		it 'makes a payment whose user is sale.user' do
			sale1 = build(:sale)
			expect(sale1.user).to eq sale1.payment.user
			user2 = build(:user)
			sale2 = build(:sale,user: user2)
			expect(sale2.payment.user).to eq user2
			expect(sale2.user).to eq user2
		end

		it 'throws an exception if supplied item and price have conflicting item_types' do
			item_type1 = build(:item_type)
			item_type2 = build(:item_type)
			item1 = build(:item, item_type: item_type1)
			price1 = build(:price, item_type: item_type2)
			expect{build(:sale, item: item1, price: price1)}.to raise_error "conflicting item types"
		end

		it 'makes a payment whose user is sale.user' do
			user = create(:user)
			sale = create(:sale,user: user)
			expect(sale.payment.user).to eq sale.user
		end

		it 'assigns sale.user = sale.payment.user if user is not supplied' do
			user = create(:user)
			payment = create(:payment, user: user)
			sale = create(:sale,payment: payment)
			expect(sale.user).to eq user
		end

		it 'throws an exception if user and payment.user are not equal' do
			user = create(:user)
			payment = create(:payment)
			expect{create(:sale, payment: payment, user: user)}.to raise_error "conflicting users"
		end
	end
end