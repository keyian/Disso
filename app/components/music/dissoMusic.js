'use strict';

import React, { Component } from 'react';
import { View, Image, ListView, StyleSheet, Text, TouchableHighlight } from 'react-native';

// var React = require('react-native')
var fetch = require('fetch').fetch
var Web = require('./../misc/web')
var MusicBox = require('./musicBox')

// var {
// 	Image,
// 	ListView,
// 	StyleSheet,
// 	Text,
// 	TouchableHighlight,
// } = React;

// please get api token here http://www.last.fm/api/account/create
const API_KEY='b766a12285245c2f7d85fbf077b56429';
const API_URL = 'https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=c&format=json&limit=20&page=1';
const REQUEST_URL = API_URL + '&api_key=' + API_KEY;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: 'white',
		marginTop: 64
	}
});

class GrabMusic extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			artist: {},
      isDoneLoading: false
		}
	}

	componentDidMount() {
		this.loadArtists();
	}

	loadArtists() {

		this.setState({
			isLoading: true
		});

		fetch(REQUEST_URL)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
			})
			.then((responseData) => {
        console.log("in request response", responseData.results.artistmatches.artist[0]);
				this.setState({
					isLoading: false,
          isDoneLoading: true,
          artist: responseData.results.artistmatches.artist[0]
				});
			}).catch((error) => {
        console.error(error);
      })
			.done();
	}

	render() {
    console.log("in render mate");
		return (
			<View style={styles.container}>
        {(this.state.isDoneLoading)?(<MusicBox artist={this.state.artist} />):<View></View>}
			</View>
		);
	}
};

module.exports = GrabMusic;
