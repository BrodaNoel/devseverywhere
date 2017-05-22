// TODO: Here we have to simulate that someone is writting, adding one char at the
// time that someone press the key.
// I should create a prackage for this...

import React, { Component } from 'react';
import * as firebase from 'firebase';
import cookies from 'js-cookie';
import './styles.css';

import { config } from 'config';

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

    firebase.initializeApp(config.firebase);

    var provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      // TODO: Move if after implementing Redux
      window.credentials = result.credential;
      cookies.set('credentials', result.credential);
      window.isLoggedInTwitter = true;
      window.user = result.user;
      result.user.getToken().then(token => {
        cookies.set('firebaseToken', token);
      });

      this.setState({buttonLabel: 'Redirecting...'});
      setTimeout(() => {this.props.history.push(`/${this.tech}`);}, 1000);

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
