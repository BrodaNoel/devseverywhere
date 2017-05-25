// TODO: Here we have to simulate that someone is writting, adding one char at the
// time that someone press the key.
// I should create a prackage for this...

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import cookies from 'js-cookie';
import './styles.css';

import * as actions from 'actions';
import { config } from 'config';

class RequestAccessPage extends Component {
  tech = this.props.match.params.tech;
  state = {
    buttonLabel: 'Ok!'
  };

  requestTwitterAccess = () => {
    this.setState({buttonLabel: 'Requesting Access...'});

    firebase.initializeApp(config.firebase);

    let provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      // TODO: Move if after implementing Redux
      window.credentials = result.credential;
      cookies.set('credentials', result.credential);
      result.user.getIdToken().then(token => {
        cookies.set('firebaseToken', token);
      });

      this.setState({buttonLabel: 'Redirecting...'});

      setTimeout(() => {
        let user = {
          data: result.user
        };

        this.props.dispatch(
          actions.logInUser(user)
        );

        this.props.history.push(`/${this.tech}`);
      }, 1000);

    }).catch(error => {
      this.props.dispatch(
        actions.addError(`Looks like we had an issue while loging. Error ${error.code}: ${error.message}`)
      );

      this.props.history.push(`/`);
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

RequestAccessPage = connect()(RequestAccessPage);

export { RequestAccessPage };
