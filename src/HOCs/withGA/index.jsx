import React from 'react';
import GoogleAnalytics from 'react-ga';
import config from 'config';

GoogleAnalytics.initialize(config.googleAnalytics.id);

const withGA = (WrappedComponent, componentProps) => {
  const trackPage = page => {
    GoogleAnalytics.set({ page });
    GoogleAnalytics.pageview(page);
  };

  const HOC = props => {
    trackPage(props.location.pathname);

    return (
      <WrappedComponent {...props} {...componentProps} />
    );
  };

  return HOC;
};

export default withGA;
