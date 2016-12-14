'use strict';

import React, { Component } from 'react';
import { View, Image, ListView, StyleSheet, Text, TouchableHighlight } from 'react-native';

// var React = require('react-native')
var fetch = require('fetch').fetch
var Web = require('./../misc/web')
var MusicBox = require('./musicBox')
var FavoritesList = require('./../favorites/favoriteList');
// please get api token here http://www.last.fm/api/account/create
const API_KEY='b766a12285245c2f7d85fbf077b56429';
const API_URL = 'https://ws.audioscrobbler.com/2.0/?method=artist.search&format=json&limit=5';

const styles = StyleSheet.create({
	container: {
		flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
		backgroundColor: 'white',
		marginTop: 64,
    backgroundColor: '#FFFFAA'
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
    //&page=1&artist=c
    if(this.state.isDoneLoading) {
      this.setState({
        isDoneLoading: false
      });
    }
    let request_url = API_URL + '&api_key=' + API_KEY;
    let pgArtistURL = "&page=" + Math.ceil(Math.random()*2000) + "&artist=" + String.fromCharCode(97 + Math.floor(Math.random() * 26));
    request_url += pgArtistURL;
    console.log("EY PG ARTIST URL", pgArtistURL);
		this.setState({
			isLoading: true
		});

		fetch(request_url)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
			})
			.then((responseData) => {
        console.log("response data of fetch request", responseData);
				this.setState({
					isLoading: false,
          isDoneLoading: true,
          artist: responseData.results.artistmatches.artist[Math.floor(Math.random()*5)]
				});
			}).catch((error) => {
        console.error(error);
      })
			.done();
	}

  openPage(url) {
		this.props.navigator.push({
			title: 'Web View',
			component: Web,
			passProps: {
				url: url
			}
		});
	}

	showFavorites() {
		console.log("something show favorites");
		// this.props.navigator.push({
		// 	title: 'My Favorites',
		// 	component: FavoritesList,
		// 	passProps: {
		// 		user: this.props.user
		// 	}
		// });
	}

	render() {
    console.log("in render mate");
		return (
			<View style={styles.container}>
        {(this.state.isDoneLoading)?(<MusicBox showFavorites={this.showFavorites.bind(this)} artist={this.state.artist} onClickDisso={this.loadArtists.bind(this)} onOpenPage={this.openPage.bind(this, this.state.artist.url)} />):<View></View>}
			</View>
		);
	}
};

module.exports = GrabMusic;
