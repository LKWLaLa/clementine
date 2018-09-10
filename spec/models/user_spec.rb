require 'rails_helper'

RSpec.describe 'User', '#price_paid' do
	let!(:user) {create(:user)}
	let!(:amount) {35.16}
	let!(:item) {create(:item)}
	let!(:price) {create(:price,amount: amount,item_type: item.item_type)}
	
	context 'user has not purchased the item' do
		it 'returns nil' do
			expect(user.price_paid(item)).to eq nil
		end
	end

	context 'user has purchased the item' do
		let!(:sale) {create(:sale,item: item,price: price,user: user)}

		it 'returns the price user paid' do
			expect(user.price_paid(item)).to eq amount
		end
	end
end

RSpec.describe 'User', '#purchaseable_items' do
	let!(:item1) {create(:item)}
	let!(:item2) {create(:item)}
	let!(:item3) {create(:item)}
	let!(:item4) {create(:item)}
	let!(:item5) {create(:item)}
	let!(:user) {create(:user)}
	context 'there are no upgrades, exclusions, or qualifications' do
		it 'returns all items' do
			items = [item1,item2,item3,item4,item5]
			expect(user.purchaseable_items).to match_array(items)
		end
	end
	context 'there are upgrades, but no exclusions or qualifications' do
		# do instances saved to the database get deleted when the current context ends? yes!
		let!(:upgrade1) {create(:upgrade, upgrade_from_item: item1, upgrade_to_item: item2)}
		let!(:upgrade2) {create(:upgrade, upgrade_from_item: item1, upgrade_to_item: item3)}
		let!(:sale) {create(:sale, user: user, item: item1)}

		it 'returns all items except upgrade_to items' do
			items = [item1,item4,item5]
			expect(user.purchaseable_items).to match_array(items)
		end
	end
	context 'there are exclusions, but no upgrades or qualifications' do
		let!(:exclusion1) {create(:exclusion, excluder_item: item1, excluded_item: item2)}
		let!(:exclusion2) {create(:exclusion, excluder_item: item1, excluded_item: item3)}
		let!(:sale) {create(:sale, user: user, item: item1)}		

		it 'returns all items not excluded by the excluder_item' do
			items = [item1,item4,item5]
			expect(user.purchaseable_items).to match_array(items)
		end
	end
	context 'there are qualifications, but no upgrades or exclusions' do
		let!(:qualification1) {create(:qualification, qualifier_item: item1, qualified_item: item3)}
		let!(:qualification2) {create(:qualification, qualifier_item: item1, qualified_item: item4)}

		context 'user has not purchased a qualifier_item' do
			it 'returns all items that do not require a qualifier_item' do
				items = [item1,item2,item5]
				expect(user.purchaseable_items).to match_array(items)
			end
		end

		context 'user has purchased a qualifier_item' do
			let!(:sale) {create(:sale, user: user, item: item1)}

			it 'returns all qualified items and all items that do not require a qualifier_item' do
				items = [item1,item2,item3,item4,item5]
				expect(user.purchaseable_items).to match_array(items)
			end
		end
	end
	context 'there are upgrades and exclusions, but no qualifications' do
		let!(:exclusion1) {create(:exclusion, excluder_item: item1, excluded_item: item1)}
		let!(:exclusion2) {create(:exclusion, excluder_item: item1, excluded_item: item2)}
		let!(:upgrade) {create(:upgrade,upgrade_from_item: item1, upgrade_to_item: item4)}
		let!(:sale) {create(:sale,user: user, item: item1)}

		it 'returns all items except excluded_items and upgrade_to_items' do
			items = [item3,item5]
			expect(user.purchaseable_items).to match_array(items)
		end
	end
	context 'there are upgrades and qualifications, but no exclusions' do
		let!(:upgrade) {create(:upgrade,upgrade_from_item: item1, upgrade_to_item: item4)}
		let!(:qualification1) {create(:qualification,qualifier_item: item2, qualified_item: item3)}
		let!(:qualification2) {create(:qualification,qualifier_item: item1, qualified_item: item3)}
		let!(:sale) {create(:sale,item: item1,user: user)}
		it 'returns all qualified items and items that do not require a qualifier purchase, except the upgrade_to_items' do
			items = [item1,item2,item3,item5]
			expect(user.purchaseable_items).to match_array(items)
		end
	end
	context 'there are exclusions and qualifications, but no upgrades' do
		let!(:qualification) {create(:qualification,qualifier_item: item2, qualified_item: item3)}
		let!(:exclusion1) {create(:exclusion, excluder_item: item1, excluded_item: item1)}
		let!(:exclusion2) {create(:exclusion, excluder_item: item1, excluded_item: item5)}
		let!(:sale) {create(:sale,item: item1,user: user)}
		it 'returns all qualified items and items that do not require a qualifier purchase, except the excluded_items' do
			items = [item2,item4]
			expect(user.purchaseable_items).to match_array(items)
		end
	end
	context 'there are upgrades, exclusions, and qualifications' do
		let!(:qualification) {create(:qualification,qualifier_item: item2, qualified_item: item3)}
		let!(:exclusion) {create(:exclusion, excluder_item: item1, excluded_item: item1)}
		let!(:upgrade) {create(:exclusion, excluder_item: item1, excluded_item: item5)}
		let!(:sale) {create(:sale,item: item1,user: user)}
		it 'returns all qualified items and items that do not require a qualifier purchase, except the excluded_items and the upgrade_to_items' do
			items = [item2,item4]
			expect(user.purchaseable_items).to match_array(items)
		end
	end

end
