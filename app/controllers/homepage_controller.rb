class HomepageController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @products ||= Product.search_product(params)

    respond_to do |format|
      format.js do
        render json: { products: @products, pageCount: @products.total_pages }
      end
      format.html
    end
  end

end
