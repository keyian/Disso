'use strict';

const Realm = require('realm');

import React, {Component} from 'react';

import {StyleSheet, NavigatorIOS} from 'react-native';

import Login from './components/login/login';
import GrabMusic from './components/music/dissoMusic';
import Begin from './components/welcome/begin';

export default class Disso extends Component {

	render(){
		const UserSchema = {
			name: 'User',
			properties: {name: 'string', fbID: 'string', favorites: {type: 'list', objectType: 'Favorite'}}
	 };

	 const FavoriteSchema = {
		 name: 'Favorite',
		 properties: {name: 'string', image: 'string', listeners: 'int', url: 'string'}
	};

    let realm = new Realm({
       schema: [UserSchema, FavoriteSchema]
     });

    //  realm.write(() => {
    //    realm.create('User', {name: 'Rex'});
    //  });

		// initialRoute={{
		// 	title: "Login",
		// 	component: Login,
		// 	passProps: {realm: realm}
		// }}
		return (
		 <NavigatorIOS
			style={styles.container}
			initialRoute={{
				title: "Welcome",
				component: Begin
			}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFAA'
	},
});
