# solr_product_search
An ecommerce search engine implemented with Solr 

# Setting up locally
- $ bundle
- $ rails db:setup
- $ rails generate sunspot_rails:install
- $ bundle exec rake sunspot:solr:start
- $ rails db:seed && bundle exec rake sunspot:reindex
- $ rails s
