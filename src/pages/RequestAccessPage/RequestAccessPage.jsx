import React, { Component } from 'react';
import './styles.css';

import * as firebase from 'firebase';

export class RequestAccessPage extends Component {
  requesting = false;

  requestTwitterAccess = () => {
    this.requesting = true;

    firebase.initializeApp({
      apiKey: "AIzaSyAeHEdRmODY2oS6LwwpCizy7ChL8RYKsaw",
      authDomain: "devseverywhere-1494347271845.firebaseapp.com",
      databaseURL: "https://devseverywhere-1494347271845.firebaseio.com",
      projectId: "devseverywhere-1494347271845",
      storageBucket: "devseverywhere-1494347271845.appspot.com",
      messagingSenderId: "381039458264"
    });

    var provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      //var token = result.credential.accessToken;
      //var secret = result.credential.secret;
      // The signed-in user info.
      //var user = result.user;
      // ...

      // {this.props.match.params.tech}
      fetch('https://us-central1-devseverywhere-1494347271845.cloudfunctions.net/getTweets', {
        method: 'GET'
      }).then(r => r.json())
        .then((r) => {
          // TODO: Here we have to set the `r.tweets.statuses` to our Redux
          console.log(r.tweets.statuses);
          this.requesting = false;
        });

    }).catch(function(error) {
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
            {this.requesting ? 'Loading...' : 'Ok!'}
          </div>
        </div>
      </div>
    );
  }
};
