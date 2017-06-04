// TODO: Here we have to simulate that someone is writting, adding one char at the
// time that someone press the key.
// I should create a prackage for this...

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import * as firebase from 'firebase';
import './styles.css';

import notification from 'antd/lib/notification';
import * as actions from 'actions';
import config from 'config';

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
      result.user.getIdToken().then(token => {
        this.setState({buttonLabel: 'Redirecting...'});

        setTimeout(() => {
          let user = {
            data: result.user,
            credentials: result.credential,
            firebaseToken: token
          };

          this.props.dispatch(
            actions.logInUser(user)
          );

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
            Hey! Give us access to your Twitter account!<br/>
            Our account is too busy.<br/>
            Don't worry, we are just gonna steal all your tweets while you sleep.<br/>

            <div className="joke">Nah... Just kidding</div>

            <div className="button" onClick={this.requestTwitterAccess}>
              {this.state.buttonLabel}
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
};

RequestAccessPage = connect()(RequestAccessPage);

export default RequestAccessPage;
