import React from "react"
import PropTypes from "prop-types"

class HomePage extends React.Component {
  render () {
    return (
      <React.Fragment>
        Products:
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  products: PropTypes.array
};

HomePage.defaultPropTypes = {
  products: []
}


export default HomePage
