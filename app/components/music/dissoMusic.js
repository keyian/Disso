'use strict';

import React, { Component } from 'react';
import { View, Image, ListView, StyleSheet, Text, TouchableHighlight } from 'react-native';
import realm from '../realm/realm'
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
    alignItems: 'center',
		backgroundColor: 'white',
    backgroundColor: '#FFFFAA',
	}
});

class GrabMusic extends Component {
	constructor(props) {
		super(props);
		let user = realm.objects("User").filtered('fbID = "'+this.props.user.fbID+'"')[0];
		console.log(user);
		this.state = {
			isLoading: false,
			artist: {},
      isDoneLoading: false,
			user: user
		}
		console.log("this is now s in user", this.state.user);
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
			title: (this.state.artist.name+" on last.fm"),
			component: Web,
			passProps: {
				url: url
			}
		});
	}

	showFavorites() {
		this.props.navigator.push({
			title: 'My Favorites',
			component: FavoritesList,
			passProps: {
				user: this.state.user
			}
		});
	}

	addFavorite(artist) {
		let user = this.state.user;
		console.log("this is user in dissso music", user);
		let favorites= user.favorites;
		let favoriteAdded = false;
		for(let i=0; i<favorites.length; i++) {
			if(favorites[i].name == artist.name) {
				console.log("checking add favorite existence. exists...");
				favoriteAdded = true;
			}
		}
		console.log("this is favorite added boolean", favoriteAdded);
		if(!favoriteAdded) {
				console.log("this is artist in favorite added", artist);
				let fav={};
	      realm.write(() => {
	        fav = realm.create('Favorite', {
	          name: artist.name,
	          image: artist.image[2]["#text"],
	          listeners: +artist.listeners,
						url: artist.url
	        });
	      });
				realm.write(() => {
					favorites.push(fav);
				});
	    }
			console.log("user after adding favorite");
		}

	render() {
    console.log("in render mate");
		return (
			<View style={styles.container}>
        {(this.state.isDoneLoading)?(<MusicBox onSeeFavsClick={this.showFavorites.bind(this)} onAddFavClick={this.addFavorite.bind(this, this.state.artist)} artist={this.state.artist} onClickDisso={this.loadArtists.bind(this)} onOpenPage={this.openPage.bind(this, this.state.artist.url)} />):<View></View>}
			</View>
		);
	}
};

module.exports = GrabMusic;
