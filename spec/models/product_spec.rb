require 'rails_helper'

RSpec.describe Product, type: :model do
  describe 'products' do
    it 'should save product when supplied the right data' do
      product = Product.new(
        title: 'Amazon book',
        description: 'buy the best book ever',
        tags: 'Love, Food',
        country: 'Nigeria',
        price: 10.2
      )

      expect(product.save).to be(true)
    end
  end
end
