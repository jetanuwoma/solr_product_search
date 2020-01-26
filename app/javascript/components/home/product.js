import React from 'react';

export default ({ title, description, viewProduct }) => {
  return (
    <div className="col mb-4">
      <div className="card">
        <div className="card-body" style={{ width: '18rem' }}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a className="btn btn-primary" onClick={viewProduct}>View</a>
        </div>
      </div>
    </div>
  )
};
