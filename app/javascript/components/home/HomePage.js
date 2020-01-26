import React from "react"
import ReactDOM from 'react-dom';
import PropTypes from "prop-types"

import InputRange from 'react-input-range';
import ReactPaginate from 'react-paginate';

import ProductCard from './product'
import SearchForm from './SearchForm'
import "react-input-range/lib/css/index.css";


class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {
        query: '',
        priceRange: {
          min: 0,
          max: 0,
        },
        country: '',
        tags: '',
        sortby: '',
        page: 1
      },
      products: this.props.products,
      pageCount: this.props.pageCount,
      perPage: 20,
    }
  }


  handleViewProduct(item) {
    event.preventDefault();
    console.log(item)
  }

  handlePageClick = data => {
    const { search } = this.state;
    this.setState({ search: { ...search, page: data.selected + 1 } }, () => {
      this.handleProductSearch({ preventDefault: () =>1});
    })
  };

  handleProductSearch = (event) => {
    const data = this.state.search;
    console.log(data)
    event.preventDefault();
    fetch('/search_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        this.setState({ products: data.products, pageCount: data.pageCount })
      }).catch(error => {
        console.log(error)
      })
  }

  onCountryChanged = (event) => {
    const { search } = this.state;
    this.setState({ search: { ...search, country: event.target.value } })
  }

  onSearchChanged = (event) => {
    const { search } = this.state;
    this.setState({ search: { ...search, query: event.target.value } })
  }

  onSortChanged = (event) => {
    const { search } = this.state;
    this.setState({ search: { ...search, sortby: event.target.value } }, () => {
      this.handleProductSearch(event);
    })
  }

  onTagsChanged = (event) => {
    const { search } = this.state;
    this.setState({ search: { ...search, tags: event.target.value } })
  }


  render() {
    const { products, search } = this.state;
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Product Search</a>
          <button className="navbar-toggler" type="button"
            data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <SearchForm onSearchChanged={this.onSearchChanged} handleProductSearch={this.handleProductSearch} />
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-4">
              Filter
              <div className="accordion" id="accordionExample">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Price
                      </button>
                    </h2>
                  </div>

                  <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body">
                      <h3>Price  Range</h3>
                      <InputRange
                        maxValue={1000}
                        minValue={0}
                        value={this.state.search.priceRange}
                        onChange={priceRange => this.setState({ search: { ...search, priceRange } })} />
                      )

                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingTwo">
                    <h2 className="mb-0">
                      <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Country
                       </button>
                    </h2>
                  </div>
                  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                    <div className="card-body">
                      <input
                        type="text"
                        className="form-input"
                        onChange={this.onCountryChanged}
                      />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                      <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Tags
                      </button>
                    </h2>
                  </div>
                  <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div className="card-body">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter tags with comma"
                        onChange={this.onTagsChanged}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={this.handleProductSearch}
                type="submit"
              >Filter</button>
            </div>
            <div className="col-8">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Sort By</label>
                </div>
                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  onChange={this.onSortChanged}
                >
                  <option>Choose...</option>
                  <option value="relevant">Relevant</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="lowest_price">Lowest Price</option>
                  <option value="highest_price">Highest Price</option>
                </select>
              </div>
              <div className="row row-cols-1 row-cols-md-2">
                {products.map(item => (
                  <ProductCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    viewProduct={() => this.handleViewProduct(item)}
                  />
                ))}
              </div>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  products: PropTypes.array,
  pageCount: PropTypes.number,
};

HomePage.defaultPropTypes = {
  products: [],
  pageCount: 1
}


export default HomePage
