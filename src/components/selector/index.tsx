import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { BLACK, WHITE } from '../../data/color';

import { Categories } from '../../types/data';
import { ReduxPropType } from '../../types/redux';

interface DataProps {
    onToggle: (category: Categories) => void,
    selected: Categories,
}

class Selector extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <View style={{ backgroundColor: this.props.theme.static.secondaryC }}>
                <TouchableOpacity 
                    onPress={() => this.props.onToggle(Categories.EXPENSE)} 
                    style={{ 
                        backgroundColor: this.props.selected === Categories.EXPENSE ? 
                            this.props.theme.static.accentC : 
                            'transparent',
                        }}>
                    <Text style={{ color: this.props.selected === Categories.EXPENSE ? BLACK : WHITE }}>
                        EXPENSE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => this.props.onToggle(Categories.INCOME)} 
                    style={{ 
                        backgroundColor: this.props.selected === Categories.INCOME ? 
                            this.props.theme.static.accentC : 
                            'transparent',
                        }}>
                    <Text style={{ color: this.props.selected === Categories.INCOME ? BLACK : WHITE }}>
                        EXPENSE
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
