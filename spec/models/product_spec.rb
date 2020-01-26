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

  describe 'search_product' do
    def create_product(price: 10, desc: 'some desc', title: 'prod', country: 'USA', tags: 'ph, gh')
      create(
        :product,
        price: price,
        description: desc,
        title: title,
        country: country,
        tags: tags
      )
    end
    context 'when filtering by price' do
      before :each do
        create_product
        create_product(price: 20)
        create_product(price: 30)
        create_product(price: 50)
        create_product(price: 60)
        create_product(price: 20)
        Sunspot.commit
      end

      it 'returns products within price range when price_higher and lower_price is supplied' do
        products = Product.search_product(priceRange: { min: 10, max: 30 })
        expect(products.size).to be(4)
      end

      it 'returns products with price greater than price_higher when its only supplied' do
        products = Product.search_product(price_higher: 30)
        expect(products.size).to be(2)
      end

      it 'returns products with price lower than price_lower when its only supplied' do
        products = Product.search_product(price_lower: 20)
        expect(products.size).to be(1)
      end

      it 'does not return any product that does not match filter term' do
        products = Product.search_product(price_higher: 1000)
        expect(products).to be_empty
      end
    end

    context 'when searching by query' do
      before :each do
        create_product(
          title: 'Android rocks',
          desc: 'This is some android gadget and apple',
          price: 20
        )
        create_product(
          title: 'someone ate my apple',
          desc: 'also ate my other apple',
          price: 30
        )
        create_product(
          title: 'Android is the best',
          desc: 'is a lie, I prefer apple',
          price: 40
        )
        create_product(title: 'The best is yet to come', tags: 'apple', price: 50)
        create_product(title: 'Mac laptop is from apple', price: 60)
        create_product(title: 'All android gadgets is by google', tags: 'apple', price: 70)
        Sunspot.commit
      end

      it 'returns all products that match search query term' do
        products = Product.search_product(query: 'android')
        expect(products.size).to be(3)
      end

      it 'searches across all text fields' do
        products = Product.search_product(query: 'apple')
        expect(products.size).to be(6)
      end

      it 'returns products that also matches with other conditions' do
        products = Product.search_product(query: 'android', price_higher: 65)
        expect(products.size).to be(1)
        expect(products.first.title).to eq('All android gadgets is by google')
      end
    end
  end
end
