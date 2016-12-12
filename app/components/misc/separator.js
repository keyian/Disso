'use strict';

import React, { Component } from 'react';

import { StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: '#E3E3E3',
		flex: 1
	}
});

class Separator extends Component {
	render() {
		return (
			<View style={styles.separator}/>
		);
	}
}

module.exports = Separator;
