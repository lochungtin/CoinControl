import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

import { scrollerStyles } from '../styles';

export default class Scroller extends React.Component {

    addZero = num => {
        return num < 10 ? '0' + num : num;
    }

    container = () => {
        return this.props.dark ? scrollerStyles.containerD : scrollerStyles.containerL;
    }

    text = () => {
        return this.props.dark ? scrollerStyles.titleD : scrollerStyles.textL;
    }

    render() {
        return (
            <SafeAreaView style={this.container()}>
                <FlatList
                    decelerationRate={'fast'}
                    data={this.props.data}
                    getItemLayout={(data, index) => (
                        { length: 50, offset: 50 * index, index }
                    )}
                    initialScrollIndex={this.props.initial}
                    keyExtractor={item => (item.key).toString()}
                    onScroll={(event) => {
                        const offset = Math.ceil(event.nativeEvent.contentOffset.y / 10) * 10;
                        const index = Math.floor(offset * 2 / 100);
                        console.log(index > this.props.data.length - 1 ? this.props.data.length - 1 : index);
                        this.props.onScroll(index > this.props.data.length - 1 ? this.props.data.length - 1 : index);
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ ...scrollerStyles.item }}>
                                <Text style={this.text()}>{this.addZero(item.label)}</Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    snapToAlignment={'center'}
                    snapToInterval={50}
                    style={scrollerStyles.list}
                />
            </SafeAreaView>
        );
    }
}