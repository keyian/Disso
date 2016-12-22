"use strict";

import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Image } from 'react-native';
import {ListView} from 'realm/react-native';

import realm from './../realm/realm';
var Web = require('./../misc/web')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    backgroundColor: '#FFFFAA',
  },
  favoriteCellHighlight: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#AAFFD4',
    paddingLeft: 10,
    margin: 5
  },
  favoriteCell: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  artistImage: {
    height: 42,
    width: 63,
  },
  text: {
    fontFamily: 'Courier',
    marginLeft: 30
  }
});



class FavoritesList extends Component {


  constructor(props) {
    super(props);
    console.log("this is user in favoriteslist", this.props.user);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = ({
      favoritesDS: ds.cloneWithRows(this.props.user.favorites)
    });
  }

  openPage(favorite) {
    this.props.navigator.push({
      title: (favorite.name+" on last.fm"),
      component: Web,
      passProps: {
        url: favorite.url
      }
    });
  }

  _renderRow(favorite) {
    return(
      <TouchableHighlight style={styles.favoriteCellHighlight}
        onPress={this.openPage.bind(this, favorite)}
        underlayColor='transparent'>
        <View style={styles.favoriteCell}>
          {favorite.image.length>0?
            <Image
              source={{uri: favorite.image}}
              style={styles.artistImage}
            />:
            <Text>No Img</Text>}
          <Text style={styles.text}>{favorite.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.favoritesDS}
        renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }
}

module.exports = FavoritesList;
