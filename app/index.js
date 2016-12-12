'use strict';

import React, {Component} from 'react';

import {StyleSheet, NavigatorIOS} from 'react-native';

import GrabMusic from './components/music/dissoMusic'

export default class Disso extends Component {
	render() {
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
		flexGrow: 1,
		backgroundColor: '#F5FCFF'
	},
});
