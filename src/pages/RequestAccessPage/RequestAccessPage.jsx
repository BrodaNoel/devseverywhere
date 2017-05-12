import React, { Component } from 'react';
import './styles.css';

import * as firebase from 'firebase';

export class RequestAccessPage extends Component {
  tech = this.props.match.params.tech;

  constructor(props) {
    super(props);
    this.state = {
      buttonLabel: 'Ok!'
    };
  }

  requestTwitterAccess = () => {
    this.setState({buttonLabel: 'Requesting Access...'});

    firebase.initializeApp({
      apiKey: "AIzaSyAeHEdRmODY2oS6LwwpCizy7ChL8RYKsaw",
      authDomain: "devseverywhere-1494347271845.firebaseapp.com",
      databaseURL: "https://devseverywhere-1494347271845.firebaseio.com",
      projectId: "devseverywhere-1494347271845",
      storageBucket: "devseverywhere-1494347271845.appspot.com",
      messagingSenderId: "381039458264"
    });

    var provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      //var token = result.credential.accessToken;
      //var secret = result.credential.secret;
      // The signed-in user info.
      //var user = result.user;
      // ...

      this.setState({buttonLabel: 'Looking for Tweets...'});

      fetch('https://us-central1-devseverywhere-1494347271845.cloudfunctions.net/getTweets', {
        method: 'GET'
      }).then(r => r.json())
        .then(r => {
          // TODO: Remove it after Redux implementation
          window.tweets = r.tweets.statuses;
          this.setState({buttonLabel: 'Redirecting...'});

          setTimeout(() => {this.props.history.push(`/${this.tech}`);}, 1000);
        });

    }).catch(error => {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
      // ...
    });
  }

  render() {
    return (
      <div className="RequestAccessPage">
        <div className="disclaimer">
          Hey! Give us access to your Twitter account!<br/>
          Our account is too busy.<br/>
          Don't worry, we are just gonna steal all your tweets while you sleep.<br/>

          <div className="joke">Nah... Just kidding</div>

          <div className="button" onClick={this.requestTwitterAccess}>
            {this.state.buttonLabel}
          </div>
        </div>
      </div>
    );
  }
};
