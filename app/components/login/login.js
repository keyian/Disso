import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';

import realm from '../realm/realm';

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
    this.state= ({
      user: {},
      login: false
    });
    AccessToken.getCurrentAccessToken().then((data) => {
      if(data!=null) {
        const { accessToken } = data
        this.getUserInfo(accessToken)
        this.setState({
          login: true
        });
      }
    });
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data: ' + result.id);
    }
  }

  getUserInfo(token) {
    console.log(token);
    fetch('https://graph.facebook.com/v2.5/me?fields=name,id&access_token=' + token)
    .then((response) => response.json())
    .then((user) => {
      console.log("we do get to next then");
      // Some user object has been set up somewhere, build that user here
      this.addUserToDB(user);
      this.setState({login: true});
    })
    .catch(() => {
      console.log('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  addUserToDB(userData) {
    let users = realm.objects("User");
    console.log("we do have realm.objects of user ", users);
    let query = 'fbID = "'+userData.id+'"';
    console.log("this is query", query);
    let userExists = users.filtered(query);
    console.log("this is user exists", userExists);
    let user={};
    if(userExists.length < 1) {
      console.log('in userexissts.length < 1');
      realm.write(() => {
        user = realm.create('User', {
          name: userData.name,
          fbID: userData.id,
          favorites: []
        });
      });
    } else {
      user = userExists[0];
    }
    console.log(user);
    this.setState({
      user: user
    });
    console.log("navigator", this.props.navigator);
    this.props.navigator.push({
      title: 'Disso Music',
      component: GrabMusic,
      passProps: {
        user: user
      }
    });
  }

  onClickDisso() {
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
                AccessToken.getCurrentAccessToken().then((data) => {
                  const { accessToken } = data
                  this.getUserInfo(accessToken)
                });

              }
            }
          }
          onLogoutFinished={
            () => {
              this.setState({login: false});
            }
          }
        />
        {(this.state.login)?(<TouchableHighlight
        onPress={this.onClickDisso.bind(this)}
        underlayColor='transparent'>
        <Image source={require('../../images/nuDissoButton.png')} style={styles.dissoLogo}/>
      </TouchableHighlight>):(<Text>You should login to begin!</Text>)}
      </View>
    );
  }
}
