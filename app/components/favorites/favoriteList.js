import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';


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
  }
});


export default class FavoritesList extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      favoritesList: []
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>idk</Text>
      </View>
    );
  }
}
