class Product < ApplicationRecord
  searchable do
    text :description, :tags, :country, :title
    double :price
  end
end
