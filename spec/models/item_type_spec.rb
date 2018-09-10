require 'rails_helper'

RSpec.describe 'ItemType', '#current_price' do
	let!(:type) {create(:item_type)}
	let!(:tier1) {create(:price, item_type: type, priority: 1, amount: 180, supply: 1)}
	let!(:tier2) {create(:price, item_type: type, priority: 2, amount: 200, supply: 2)}
	let!(:tier3) {create(:price, item_type: type, priority: 3, amount: 220, supply: 2)}

	context 'none of type has been sold yet' do
		it 'returns the type\'s highest priority price amount' do
			expect(type.current_price).to eq(tier1)
		end
	end

	context 'the highest-priority price is sold out' do
		let!(:sale1) {create(:sale,price: tier1)}

		it 'returns the second-highest priority price amount' do
			expect(type.current_price).to eq(tier2)
		end
	end

	context 'the two highest-priority prices are sold out, third partially sold' do
		let!(:sale1) {create(:sale,price: tier1)}
		let!(:sale2) {create(:sale,price: tier2)}
		let!(:sale3) {create(:sale,price: tier2)}
		let!(:sale4) {create(:sale,price: tier3)}

		it 'returns the third-highest priority price amount' do 
			expect(type.current_price).to eq(tier3)
		end
	end

	context 'all price tiers are sold out' do
		let!(:sale1) {create(:sale,price: tier1)}
		let!(:sale2) {create(:sale,price: tier2)}
		let!(:sale3) {create(:sale,price: tier2)}
		let!(:sale4) {create(:sale,price: tier3)}
		let!(:sale5) {create(:sale,price: tier3)}

		it 'returns nil' do 
			expect(type.current_price).to be_nil
		end
	end
end