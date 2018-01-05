import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	Text,
} from "react-native";

import SquareGrid from "react-native-square-grid";

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: "stretch"
	},
	item: {
		flex: 1,
		alignSelf: "stretch",
		padding: 16
	},
	content: {
		flex: 1,
		backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center"
	},
	text: {
		color: "white",
		fontSize: 32
	}
});


var NUMBERS = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"eleven",
	"twelve"
];

// Set to zero in portrait mode to enable scrolling
var LONGER_LENGTH = 3;

// Set to zero in landscape mode to enable scrolling
var SHORTER_LENGTH = 2;

export default class SquareGridExample extends Component {
	constructor(props){
		super(props);

		this.state = {
			orientation: getOrientation()
		};

		this._handleLayout = handleLayout.bind(this);
	}

	render(){
		var orientation = this.state.orientation;
		var isLandscape = (orientation === "landscape");

		var columns = isLandscape ? LONGER_LENGTH : SHORTER_LENGTH;
		var rows = isLandscape ? SHORTER_LENGTH : LONGER_LENGTH;

		return (
			<View style={styles.container} onLayout={this._handleLayout}>
				<SquareGrid spaghetti="meatballs" rows={rows} columns={columns} items={NUMBERS} renderItem={renderItem} />
			</View>
		);
	}
}

function renderItem(item) {
	return (
		<View style={styles.item}>
			<View style={styles.content}>
				<Text style={styles.text}>{item}</Text>
			</View>
		</View>
	);
}

function handleLayout() {
	this.setState({
		orientation: getOrientation()
	});
}

function getOrientation() {
	var dimensions = Dimensions.get("window");
	return (dimensions.width > dimensions.height) ? "landscape" : "portrait";
}
