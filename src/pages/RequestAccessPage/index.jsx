// TODO: Add Flow after Firebase fix issue with Typed
// TODO: Here we have to simulate that someone is writting, adding one char at the
// time that someone press the key.
// I should create a prackage for this...

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import * as firebase from 'firebase';
import './styles.css';

import notification from 'antd/lib/notification';
import Button from 'antd/lib/button';
import { logInUser } from 'actions';
import config from 'config';

class RequestAccessPage extends Component {
  tech = this.props.match.params.tech;
  state = {
    buttonLabel: 'OK'
  };

  requestTwitterAccess = () => {
    this.setState({buttonLabel: 'Requesting Access...'});

    let provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      result.user.getIdToken().then(token => {
        this.setState({buttonLabel: 'Redirecting...'});

        setTimeout(() => {
          let user = {
            data: result.user,
            credentials: result.credential,
            firebaseToken: token
          };

          this.props.logInUser(user);

          this.props.history.push(`/${this.tech}`);
        }, 1000);
      });

    }).catch(error => {
      notification.error({
        message: 'Login Error',
        description: `${error.code}: ${error.message}`
      });

      this.props.history.push(`/`);
    });
  }

  render() {
    return (
      <DocumentTitle title={`Request Twitter access | ${config.pageTitle}`}>
        <div className="RequestAccessPage">
          <div className="disclaimer">
            Hey! Our account is too busy <span role="img" aria-label="Nails polish">💅</span><br/>
          Can we use your Twitter account to look for Tweets? <span role="img" aria-label="Praying hands">🙏</span> <span role="img" aria-label="Smiley face">😇</span><br/><br/>

            <Button
              onClick={this.requestTwitterAccess}
              size="large">
              {this.state.buttonLabel}
            </Button>
          </div>
        </div>
      </DocumentTitle>
    );
  }
};

RequestAccessPage = connect(null, {logInUser})(RequestAccessPage);

export default RequestAccessPage;
