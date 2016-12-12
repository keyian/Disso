'use strict';

import React, {Component} from 'react';
import { Image, View, Text, TouchableHighlight, StyleSheet} from 'react-native';

var Separator = require('./../misc/separator');

const styles = StyleSheet.create({
  // container: {
  // 		flex: 1,
  // 		flexDirection: 'row',
  // 		justifyContent: 'center',
  // 		alignItems: 'center',
  // 		padding: 5
  // 	},
  	artistImage: {
  		height: 168,
  		width: 252,
  		marginRight: 10
  	},
  // 	rightContainer: {
  // 		flex: 1
  // 	},
  // 	name: {
  // 		textAlign: 'center',
  // 		fontSize: 14,
  // 		color: '#999999'
  // 	},
  // 	rank: {
  // 		textAlign: 'center',
  // 		marginBottom: 2,
  // 		fontWeight: '500',
  // 		fontSize: 16
  // 	}
});

class MusicBox extends Component {
  constructor(props) {
    super(props);
    console.log("in musicbox", this.props.artist);
  }

	render() {
		return (
						<View style={styles.container}>
							<Image
								source={{uri: this.props.artist.image[2]["#text"]}}
								style={styles.artistImage}
							/>
							<View style={styles.rightContainer}>
								<Text style={styles.name}>{this.props.artist.name}</Text>
							</View>
						</View>
		);
	}
}

module.exports = MusicBox;
