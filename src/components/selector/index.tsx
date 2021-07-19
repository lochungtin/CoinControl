import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { BLACK, WHITE } from '../../data/color';

import { Categories } from '../../types/data';
import { ReduxPropType } from '../../types/redux';
import { screenWidth } from '../bullet/styles';
import { SelectorStyles } from './styles';

interface DataProps {
    onToggle: (category: Categories) => void,
    selected: Categories,
    width: number,
}

class Selector extends React.Component<ReduxPropType & DataProps> {
    render() {
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
                        backgroundColor: this.props.selected === Categories.EXPENSE ?
                            this.props.theme.static.accentC :
                            'transparent',
                        width: screenWidth * this.props.width * 0.5,
                    }}>
                    <Text style={{ ...SelectorStyles.label, color: this.props.selected === Categories.EXPENSE ? BLACK : WHITE }}>
                        EXPENSE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.onToggle(Categories.INCOME)}
                    style={{
                        ...SelectorStyles.highlight,
                        backgroundColor: this.props.selected === Categories.INCOME ?
                            this.props.theme.static.accentC :
                            'transparent',
                        width: screenWidth * this.props.width * 0.5,
                    }}>
                    <Text style={{ ...SelectorStyles.label, color: this.props.selected === Categories.INCOME ? BLACK : WHITE }}>
                        INCOME
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Selector);
