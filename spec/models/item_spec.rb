require 'rails_helper'

RSpec.describe 'Item', '#no_qualifier_item_required' do
	let!(:item1) {create(:item)}
	let!(:item2) {create(:item)}
	let!(:item3) {create(:item)}
	let!(:item4) {create(:item)}
	let!(:item5) {create(:item)}

	context 'there are no qualifications' do
		it 'returns all items' do
			items = [item1,item2,item3,item4,item5]
			expect(Item.no_qualifier_item_required).to match_array(items)
		end
	end
	context 'some qualifications' do
		let!(:qualification1) {create(:qualification,qualifier_item: item1, qualified_item: item2)}
		let!(:qualification2) {create(:qualification,qualifier_item: item1, qualified_item: item3)}
		let!(:qualification3) {create(:qualification,qualifier_item: item4, qualified_item: item5)}

		it 'returns only items that require no qualifier_item' do
			items = [item1,item4]
			expect(Item.no_qualifier_item_required).to match_array(items)
		end
	end
end

RSpec.describe 'Item', '#current_price' do
	let!(:type) {create(:item_type)}
	let!(:item1) {create(:item,item_type: type)}
	let!(:item2) {create(:item,item_type: type)}

	let!(:tier1) {create(:price,priority: 1, item_type: type,amount: 180,supply: 3)}
	let!(:tier2) {create(:price,priority: 1, item_type: type,amount: 200,supply: 1)}

	context 'tier1 is not sold out' do
		it 'returns the tier1 amount' do
			expect(item1.current_price).to eq(180)
			expect(item2.current_price).to eq(180)
		end
	end

	context 'tier1 is sold out but tier2 is not' do
		let!(:sale1) {create(:sale,item: item2, price: tier1)}
		let!(:sale2) {create(:sale,item: item1, price: tier1)}
		let!(:sale3) {create(:sale,item: item1, price: tier1)}

		it 'returns the tier2 amount' do
			expect(item1.current_price).to eq(200)
			expect(item2.current_price).to eq(200)
		end
	end

	context 'all tiers are sold out' do
		let!(:sale1) {create(:sale,item: item2, price: tier1)}
		let!(:sale2) {create(:sale,item: item1, price: tier1)}
		let!(:sale3) {create(:sale,item: item1, price: tier1)}
		let!(:sale4) {create(:sale,item: item2, price: tier2)}

		it 'returns nil' do
			expect(item1.current_price).to be_nil
			expect(item2.current_price).to be_nil
		end
	end
end