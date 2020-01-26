Rails.application.routes.draw do
  root 'homepage#index'

  match '/search_product', to: 'homepage#index', via: 'post', as: :search_product

end
