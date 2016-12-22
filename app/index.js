'use strict';

import React, {Component} from 'react';

import {StyleSheet, NavigatorIOS} from 'react-native';

import Login from './components/login/login';
import GrabMusic from './components/music/dissoMusic';
import Begin from './components/welcome/begin';

export default class Disso extends Component {

	render(){

		return (
		 <NavigatorIOS
			style={styles.container}
			initialRoute={{
				title: "Login",
				component: Login
			}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFAA',
	},
});
