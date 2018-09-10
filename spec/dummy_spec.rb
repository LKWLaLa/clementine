require 'rails_helper'

$count = 0
describe "let!" do
  invocation_order = []

  let!(:count) do
    invocation_order << :let!
    $count += 1
  end

  context "inner context" do
    it "calls the helper method in a before hook" do
      invocation_order << :example
      invocation_order.should == [:let!,:let!, :example]
      count.should eq(2)
    end

    it "calls the helper method again" do
      count.should eq(3)
    end
  end

  it "calls the helper for the first time!" do
    count.should eq(1)
  end
end

describe "scoping" do
  # since we will never actually reference :item1
  # we must use let! if we want create(:item) to run for
  # each example
  let!(:item1) {create(:item)}

  it 'should persist item1 to the database' do
    expect(Item.all.count).to be(1)
  end

  context 'context 1' do
    let!(:item2) {create(:item)}
    it 'should persist item2 to the database while retaining item1' do
      expect(Item.all.count).to be(2)
    end
  end

  context 'context' do
    let!(:item3) {create(:item)}
    it 'should persist item3 to the database, keeping item1 but not item2' do
      expect(Item.all.count).to be(2)
    end
  end
end