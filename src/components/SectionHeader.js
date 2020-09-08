import React from 'react';
import { Text, View } from 'react-native';
import { homeScreenStyles, styles } from '../styles';

export default class SectionHeader extends React.Component {

    container = () => {
        return this.props.dark ? homeScreenStyles.sectionHeadD : homeScreenStyles.sectionHeadL;
    }

    text = () => {
        return this.props.dark ? styles.textD : styles.textL;
    }

    render() {
        return (
            <View style={this.container()}>
                <Text style={this.text()}>{this.props.title}</Text>
            </View>
        );
    }
}