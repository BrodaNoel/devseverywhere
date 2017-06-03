import React from 'react';
import GoogleAnalytics from 'react-ga';
import config from 'config';

GoogleAnalytics.initialize(config.googleAnalytics.id);

const withGA = (WrappedComponent) => {
  const trackPage = page => {
    GoogleAnalytics.set({ page });
    GoogleAnalytics.pageview(page);
  };

  const HOC = props => {
    trackPage(props.location.pathname);

    return (
      <WrappedComponent {...props} />
    );
  };

  return HOC;
};

export default withGA;
