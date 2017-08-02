// @flow
import React from 'react';
import GoogleAnalytics from 'react-ga';
import config from 'config';

GoogleAnalytics.initialize(config.googleAnalytics.id);

// TODO: Replace `any` for some kind of `Component`
const withGA = (WrappedComponent: any) => {
  const trackPage = page => {
    GoogleAnalytics.set({ page });
    GoogleAnalytics.pageview(page);
  };

  const HOC = (props: any) => {
    trackPage(props.location.pathname);

    return (
      <WrappedComponent {...props} />
    );
  };

  return HOC;
};

export default withGA;
