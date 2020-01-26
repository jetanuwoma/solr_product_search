class Product < ApplicationRecord
  searchable do
    text :description, :tags, :country, :title
    integer :price
    time :created_at
  end

  def self.search_product(search_criteria)
    search = search do
      fulltext search_criteria[:query] do
        fields(:description, :tags)
        fields(:title) unless search_criteria[:sort_by_relevance]
        if search_criteria[:sortby].present?
          boost_fields title: 2.0 if search_criteria[:sortby] == 'relevant'
        end
      end

      if search_criteria[:price_lower].present? &&
         !search_criteria[:price_higher].present?
        with(:price).less_than(search_criteria[:price_lower])
      end

      if search_criteria[:price_higher].present? &&
         !search_criteria[:price_lower].present?
        with(:price).greater_than(search_criteria[:price_higher])
      end

      if search_criteria[:priceRange].present?
        unless search_criteria[:priceRange][:max].zero?
          with(:price, search_criteria[:priceRange][:min]..search_criteria[:priceRange][:max])
        end 
      end

      with(:country, search_criteria[:country]) if search_criteria[:country].present?

      with(:tags, search_criteria[:tags].split(',')) if search_criteria[:tags].present?

      if search_criteria[:sortby].present?
        if search_criteria[:sortby] == 'highest_price'
          order_by(:price, :desc)
        elsif search_criteria[:sortby] == 'lowest_price'
          order_by(:price, :asc)
        elsif search_criteria[:sortby] == 'newest'
          order_by(:created_at, :desc)
        elsif search_criteria[:sortby] == 'oldest'
          order_by(:created_at, :asc)
        end
      end

      limit search_criteria[:limit] if search_criteria[:limit].present?
    end

    search.results
  end
end
