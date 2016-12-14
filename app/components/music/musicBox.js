'use strict';

import React, {Component} from 'react';
import { Image, View, Text, TouchableHighlight, StyleSheet} from 'react-native';

var Separator = require('./../misc/separator');

const styles = StyleSheet.create({
  container: {
  		flex: 1,
  		flexDirection: 'row',
  		justifyContent: 'center',
  		alignItems: 'flex-start',
  		padding: 0,
      marginTop: 10
  	},
  	artistImage: {
  		height: 168,
  		width: 252,
      marginTop: 50,
      flexGrow: 1,
      justifyContent: 'center',
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
						<View>
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
							<View>
              <Text style={styles.name}>{this.props.artist.name}</Text>
                <Text style={styles.textLine}>Listeners on last.fm: {this.props.artist.listeners}</Text>
                <Text style={styles.textLine}>Click disso for new artist, or click artist for more info</Text>
							</View>
              <TouchableHighlight
                onPress={this.props.onClickDisso}
                underlayColor='transparent'>
                <Image source={require('../../images/nuDissoButton.png')} style={styles.dissoLogo}/>
              </TouchableHighlight>
						</View>

    </View>
		);
	}
}

module.exports = MusicBox;
