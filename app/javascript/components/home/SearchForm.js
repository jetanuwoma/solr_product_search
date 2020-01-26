import React from 'react';

export default ({ onSearchChanged, handleProductSearch }) => {
    return (
        <form className="form-inline my-4 my-lg-0">
            <input
                aria-label="Search"
                className="form-control mr-sm-2"
                onChange={onSearchChanged}
                placeholder="Search"
                type="search"
            />
            <button
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={handleProductSearch}
                type="submit"
            >Search</button>
        </form>
    )
}