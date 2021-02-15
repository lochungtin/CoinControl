import React from 'react';
import { View } from 'react-native'
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Bubble from '../Bubble';
import ExpandButton from '../ExpandButton';

import { blue, colorLabels, green, purple, red, teal, yellow, } from '../../data/color';
import { RNKey } from '../../functions/GenKey';
import { pickerModalStyles, styles, } from '../../styles';

class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        const colors = [yellow, green, teal, blue, purple, red];

        this.state = {
            category: this.find(colors, props.color),
            colors,
            selection: props.color,
        };
    }

    catSelect = category => this.setState({ category });

    close = () => {
        this.props.close();
        this.setState({ category: this.find(this.state.colors, this.props.color) });
    }

    find = (colors, color) => {
        for (let i = 0; i < 6; ++i)
            if (colors[i].includes(color))
                return i;
        return 0;
    }

    formation = arr => ([arr.slice(0, 4), arr.slice(4, 7), arr.slice(7, 11), arr.slice(11, 14)]);

    onPress = hex => this.props.onPress(hex);

    style = styleName => pickerModalStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onSwipeComplete={this.close}
                swipeDirection='down'
                style={{ alignItems: 'center', padding: 0, margin: 0, }}
            >
                <View style={{ ...this.style('root'), height: 350, }}>
                    <ExpandButton onPress={this.close} />
                    <View style={{ alignItems: 'center' }}>
                        {this.formation(this.state.colors[this.state.category]).map(row => {
                            return (
                                <View style={{ ...styles.columns, maxHeight: 45, }} key={RNKey()}>
                                    {row.map(hex => {
                                        return (
                                            <Bubble
                                                color={hex}
                                                key={RNKey()}
                                                onPress={() => this.onPress(hex)}
                                                selected={this.props.color === hex}
                                            />
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                    <View style={{ ...styles.columns, maxHeight: 45, }}>
                        {colorLabels.map(hex => {
                            return (
                                <Bubble
                                    color={hex}
                                    key={RNKey()}
                                    onPress={() => this.catSelect(colorLabels.indexOf(hex))}
                                    selected={this.state.category === colorLabels.indexOf(hex)}
                                />
                            );
                        })}
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(ColorPicker);