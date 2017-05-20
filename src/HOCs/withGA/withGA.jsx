import React from 'react';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-99585548-1');

export const withGA = (WrappedComponent) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({ page });
    GoogleAnalytics.pageview(page);
  };

  const HOC = (props) => {
    trackPage(props.location.pathname);

    return (
      <WrappedComponent {...props} />
    );
  };

  return HOC;
};
