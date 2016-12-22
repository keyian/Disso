'use strict';

import React, {Component} from 'react';
import { Image, View, Text, TouchableHighlight, StyleSheet} from 'react-native';

var Separator = require('./../misc/separator');

const styles = StyleSheet.create({
  container: {
  		flex: 1,
  		flexDirection: 'row',
  		justifyContent: 'center',
  		alignItems: 'center',
  		padding: 10,
      marginTop: 64
  	},
  	artistImage: {
  		height: 168,
  		width: 252,
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center'
  	},
  	name: {
  		textAlign: 'left',
  		fontSize: 14,
  		color: '#999999'
  	},
    textLine: {
      marginTop: 40
    },
    dissoLogo: {
      width: 109,
      height: 109
    },
    favNSeeArtistText: {
      backgroundColor: '#AAAAFF',
      height: 40,
      width: 120,
      margin: 5,
      fontFamily: 'Courier',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      textAlign: 'center'
    },
    userBox: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      height: 200,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10
    },
    infoBox: {
      margin: 10,
      height: 150,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
});

class MusicBox extends Component {
  constructor(props) {
    super(props);
    console.log("in musicbox", this.props.artist);
  }

	render() {
		return (
    <View style={styles.container}>
		  <View style={styles.box}>
            <TouchableHighlight
      					onPress={this.props.onOpenPage}
      					underlayColor='transparent'>
            {this.props.artist.image[2]["#text"]?
							<Image
								source={{uri: this.props.artist.image[2]["#text"]}}
								style={styles.artistImage}
							/>:
              <Text>No Image For This Artist</Text>}
            </TouchableHighlight>
							<View style={styles.infoBox}>
              <Text style={styles.name}>{this.props.artist.name}</Text>
                <Text style={styles.textLine}>Listeners on last.fm: {this.props.artist.listeners}</Text>
                <Text style={styles.textLine}>Click disso for new artist, or click artist for more info</Text>
							</View>
              <View style={styles.userBox}>
                <TouchableHighlight
        					onPress={this.props.onAddFavClick}
        					underlayColor='transparent'>
        					<Text style={styles.favNSeeArtistText}>FAVORITE!</Text>
        				</TouchableHighlight>
                <TouchableHighlight
                  onPress={this.props.onClickDisso}
                  underlayColor='transparent'>
                  <Image source={require('../../images/nuDissoButton.png')} style={styles.dissoLogo}/>
                </TouchableHighlight>
                <TouchableHighlight
        					onPress={this.props.onSeeFavsClick}
        					underlayColor='transparent'>
        					<Text style={styles.favNSeeArtistText}>MY FAVS!</Text>
        				</TouchableHighlight>
              </View>
				</View>
    </View>
		);
	}
}

module.exports = MusicBox;
