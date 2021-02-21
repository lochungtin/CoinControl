import React from 'react';
import { Text, View, } from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';

import { maxWidth, pieCardStyles, styles, } from '../../styles';
import { black, white, } from '../../data/color';

class PieCard extends React.Component {

    color = () => this.props.settings.darkMode ? white : black;

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={pieCardStyles.progressBox}>
                <Progress.Bar
                    color={this.props.color}
                    progress={this.props.percentage}
                    width={maxWidth / 1.5}
                />
                <View style={{ ...styles.columns, justifyContent: 'space-between', padding: 5, width: '80%', }}>
                    <Text style={this.style(styles, 'text')}>
                        {this.props.lValue}
                    </Text>
                    <Text style={this.style(styles, 'text')}>
                        {Math.round(this.props.percentage * 100) + '% OF TOTAL'}
                    </Text>
                    <Text style={this.style(styles, 'text')}>
                        {this.props.rValue}
                    </Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(PieCard);