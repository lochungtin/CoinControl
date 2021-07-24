import Color from '@enigmaoffline/node-color';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { WHITE } from '../../data/color';
import { screenWidth, SelectorStyles } from './styles';

import { Categories } from '../../types/data';
import { ReduxThemeType } from '../../types/redux';

interface DataProps {
    onToggle: (category: Categories) => void,
    selected: Categories,
    width: number,
}

class Selector extends React.Component<ReduxThemeType & DataProps> {
    render() {
        let hightlight: string = Color.arrToHex(Color.mixByHex(this.props.theme.static.accentC, WHITE, 0.35));

        return (
            <View style={{
                ...SelectorStyles.root,
                backgroundColor: this.props.theme.static.secondaryC,
                width: screenWidth * this.props.width,
            }}>
                <TouchableOpacity
                    onPress={() => this.props.onToggle(Categories.EXPENSE)}
                    style={{
                        ...SelectorStyles.highlight,
                        backgroundColor: this.props.selected === Categories.EXPENSE ? hightlight : 'transparent',
                        width: screenWidth * this.props.width * 0.5,
                    }}>
                    <Text style={{
                        ...SelectorStyles.label,
                        color: this.props.selected === Categories.EXPENSE ?
                            this.props.theme.static.bulletTextC.active :
                            this.props.theme.static.bulletTextC.inactive
                    }}>
                        EXPENSE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.onToggle(Categories.INCOME)}
                    style={{
                        ...SelectorStyles.highlight,
                        backgroundColor: this.props.selected === Categories.INCOME ? hightlight : 'transparent',
                        width: screenWidth * this.props.width * 0.5,
                    }}>
                    <Text style={{
                        ...SelectorStyles.label,
                        color: this.props.selected === Categories.INCOME ?
                            this.props.theme.static.bulletTextC.active :
                            this.props.theme.static.bulletTextC.inactive
                    }}>
                        INCOME
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Selector);
