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
    width: 218,
    height: 218
  }
});

let user = {};

import GrabMusic from '../music/dissoMusic'

export default class Begin extends Component {
  componentDidMount() {
  }

  beginDisso() {
    this.props.navigator.push({
      title: 'Disso Music',
      component: GrabMusic
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <Image source={require('../../images/11-18-15.gif')} style={styles.dissoLogo}/>
      <TouchableHighlight
        onPress={this.beginDisso.bind(this)}
        underlayColor='transparent'>
        <Image source={require('../../images/nuDissoButton.png')} style={styles.dissoLogo}/>
      </TouchableHighlight>
      </View>
    );
  }
}
