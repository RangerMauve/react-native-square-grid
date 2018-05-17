import React, {Component} from "react";
import PropTypes from "prop-types";
import {
	View,
	StyleSheet,
	ScrollView,
} from "react-native";

var styles = StyleSheet.create({
	gridContainer: {
		flex: 1,
		alignSelf: "stretch",
		flexWrap: "wrap",
		flexDirection: "row"
	},
	scrollContainer: {
		flex: 1
	}
});

export default class SquareGrid extends Component {
	constructor(props){
		super(props);

		this.state = {
			width: 0,
			height: 0
		};

		this._handleLayout = handleLayout.bind(this);
	}

	render() {
		var props = this.props;
		var state = this.state;

		var width = state.width - 2;
		var height = state.height - 2;

		var items = props.items;
		var renderItem = props.renderItem;

		var rows = props.rows || 0;
		var columns = props.columns || 0;

		if(!rows && !columns) {
			console.error("Must specify number of rows or columns");
			return (<View />);
		} else if(!columns) {
			console.error("Must specify number of columns");
			return (<View />);
		}

		var marginHorizontal = 0;
		var marginVertical = 0;
		var size;

		var isScrolling = !rows;

		if(isScrolling) {
			size = Math.floor(width / columns);
		} else {
			size = Math.min(width / columns, height / rows);

			marginHorizontal = Math.floor((width - (size * columns)) / (2 * columns));
			marginVertical = Math.floor((height - (size * rows)) / (2 * rows));

			size = Math.floor(size);
		}

		var itemStyle = {
			width: size,
			height: size,
			marginHorizontal: marginHorizontal,
			marginVertical: marginVertical
		};

		var maxItems = isScrolling ? Infinity : (rows * columns);

		var toRender = items.slice(0, maxItems);

		var renderedItems = toRender.map(function(item, index){
			return (
				<View key={index} style={itemStyle}>
					{renderItem(item, index)}
				</View>
			);
		});

		if(isScrolling) return (
			<ScrollView style={styles.scrollContainer}>
				<View style={styles.gridContainer} onLayout={this._handleLayout}>
					{renderedItems}
				</View>
			</ScrollView>
		);

		return (
			<View style={styles.gridContainer} onLayout={this._handleLayout}>
				{renderedItems}
			</View>
		);
	}
}

SquareGrid.propTypes = {
	rows: PropTypes.number,
	columns: PropTypes.number,

	items: PropTypes.arrayOf(PropTypes.any).isRequired,
	renderItem: PropTypes.func.isRequired
};

function handleLayout(event) {
	var nativeEvent = event.nativeEvent;
	var layout = nativeEvent.layout;
	var width = layout.width;
	var height = layout.height;

	this.setState({
		width: width,
		height: height
	});
}
