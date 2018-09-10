require 'rails_helper'

RSpec.describe Price, :type => :model do
	subject {described_class.new(
		item_type: ItemType.new,
		price_type: "Tier 1",
		amount: 180.00)}
	
	describe "Validations" do
		it "is valid with valid attributes" do
			expect(subject).to be_valid
		end
		it "is not valid without an item type" do
			subject.item_type = nil
			expect(subject).to_not be_valid
		end
		it "is not valid without a price type" do
			subject.price_type = nil
			expect(subject).to_not be_valid
		end
		it "is not valid without an amount" do
			subject.amount = nil
			expect(subject).to_not be_valid
		end
	end

	describe "Associations" do
		it "belongs to an item type" do
			assc = described_class.reflect_on_association(:item_type)
			expect(assc.macro).to eq :belongs_to
		end
		it "has many sales" do
			assc = described_class.reflect_on_association(:sales)
			expect(assc.macro).to eq :has_many
		end
	end

end