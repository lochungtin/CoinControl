import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import { generalCardStyles, styles } from '../../styles';

class Card extends React.Component {

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={this.style(generalCardStyles, 'card')}>
                <Text style={this.style(styles, 'centerText')}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Card);