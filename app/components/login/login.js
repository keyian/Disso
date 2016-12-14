import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';


const FBSDK = require('react-native-fbsdk');
const { LoginButton, GraphRequest, GraphRequestManager, AccessToken } = FBSDK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 64,
    backgroundColor: '#FFFFAA'
  },
  dissoLogo: {
    width: 109,
    height: 109
  }
});

let user = {};

import GrabMusic from '../music/dissoMusic'

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      user: {},
      login: false
    })
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data: ' + result.id);
    }
  }

  getUserInfo(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=name,id&access_token=' + token)
    .then((response) => response.json())
    .then((user) => {
      // Some user object has been set up somewhere, build that user here
      this.setState({user: user});
      this.addUserToDB(user);
      this.setState({login: true});
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  addUserToDB(user) {
    console.log("navigator", this.props.navigator);
    this.props.navigator.push({
      title: 'Disso Music',
      component: GrabMusic,
      passProps: {
        user: user
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                console.log("result", result);
                console.log("hello login", this.props);
                // this.props.realm.write(() => {
                // let user = realm.create('User', {
                //   name: result.name,
                //   fbID: result.id,
                //   favorites: []
                // });
              // });
                AccessToken.getCurrentAccessToken().then((data) => {
                  const { accessToken } = data
                  this.getUserInfo(accessToken)
                });

              }
            }
          }
          onLogoutFinished={
            () => {
              alert("User logged out");
              this.setState({login: false});
            }
          }
        />
        {(this.state.login)?(<TouchableHighlight
        onPress={this.props.onClickDisso}
        underlayColor='transparent'>
        <Image source={require('../../images/nuDissoButton.png')} style={styles.dissoLogo}/>
      </TouchableHighlight>):(<Text>You should login to begin!</Text>)}
      </View>
    );
  }
}
