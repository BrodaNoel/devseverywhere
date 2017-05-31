import React from 'react';
import { connect } from 'react-redux';

import Error from 'components/Error';

let ErrorList = props => (
  <div className="ErrorList">
    {
      props.errors.map((error, index) => {
        return (
          <Error
            key={index}
            error={error} />
        );
      })
    }
  </div>
);

ErrorList = connect(
  (state) => ({errors: state.errors})
)(ErrorList);

export default ErrorList;
