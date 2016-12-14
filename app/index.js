'use strict';

const Realm = require('realm');

import React, {Component} from 'react';

import {StyleSheet, NavigatorIOS} from 'react-native';

import GrabMusic from './components/music/dissoMusic'

export default class Disso extends Component {
	render(){
    let realm = new Realm({
       schema: [{name: 'Dog', properties: {name: 'string'}}]
     });

     realm.write(() => {
       realm.create('Dog', {name: 'Rex'});
     });

		return (
		 <NavigatorIOS
			style={styles.container}
			initialRoute={{
				title: "Get Random Musical Artist",
				component: GrabMusic
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
