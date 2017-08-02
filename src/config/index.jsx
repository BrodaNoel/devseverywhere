// @flow
import reactjs from './icons/reactjs.png';
import angularjs from './icons/angularjs.png';
import vuejs from './icons/vuejs.png';
import emberjs from './icons/emberjs.png';

const config = {
  searchTweetsEvery: 1000 * 8, // 8 seconds

  pageTitle: 'Devs, Devs Everywhere!',

  cards: [
    {
      name: 'ReactJS',
      hashtags: ['#reactJS', '#react'],
      icon: reactjs,
      styles: { backgroundColor: '#222', color: '#FFF' }
    },
    {
      name: 'AngularJS',
      hashtags: ['#angularjs', '#angular'],
      icon: angularjs,
      styles: { backgroundColor: '#263238', color: '#FFF' }
    },
    {
      name: 'VueJS',
      hashtags: ['#vuejs', '#vue'],
      icon: vuejs,
      styles: { backgroundColor: '#FFF', color: '#000' }
    },
    {
      name: 'EmberJS',
      hashtags: ['#emberjs', '#ember'],
      icon: emberjs,
      styles: { backgroundColor: '#F8EFEC', color: '#000' }
    }
  ],

  firebase: {
    apiKey: 'AIzaSyA2Otz1y4RZn2IvfNgGJiO6qSHaXqlEReQ',
    authDomain: 'devseverywhere-1494347271845.firebaseapp.com',
    databaseURL: 'https://devseverywhere-1494347271845.firebaseio.com',
    projectId: 'devseverywhere-1494347271845',
    storageBucket: 'devseverywhere-1494347271845.appspot.com',
    messagingSenderId: '381039458264'
  },

  googleMaps: {
    apiKey: 'AIzaSyA2Otz1y4RZn2IvfNgGJiO6qSHaXqlEReQ'
  },

  googleAnalytics: {
    id: 'UA-99585548-1'
  },

  backend: {
    endpoints: {
      getTweets: {
        url: 'https://us-central1-devseverywhere-1494347271845.cloudfunctions.net/api/getTweets',
        method: 'POST'
      }
    }
  }
};

export default config;
