import React from 'react';
import { View } from 'react-native'
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Bubble from './Bubble';
import ExpandButton from './ExpandButton';
import { blue, colorLabels, green, purple, red, teal, yellow, } from '../data/color';
import { colorPickerStyles, styles } from '../styles';

class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        const colorArr = [yellow, green, teal, blue, purple, red];
        this.state = {
            category: this.find(colorArr, this.props.color),
            colors: colorArr,
            selection: this.props.color,
        }
    }

    close = () => this.props.close();

    formation = arr => {
        return [
            [0, ...arr.slice(0, 4)],
            [1, ...arr.slice(4, 7)],
            [2, ...arr.slice(7, 11)],
            [3, ...arr.slice(11, 14)],
        ]
    }

    find = (arr, hex) => {
        for (let i = 0; i < 6; i++) {
            if (arr[i].includes(hex))
                return i;
        }
        return 0;
    }

    style = styleName => {
        return colorPickerStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];
    }

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                backdropOpacity={0}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onSwipeComplete={this.close}
                swipeDirection='down'
                style={{ alignItems: 'center', padding: 0, margin: 0 }}
            >
                <View style={this.style('colorPickerRoot')}>
                    <ExpandButton onPress={this.close} />
                    <View style={{ alignItems: 'center' }}>
                        {this.formation(this.state.colors[this.state.category]).map(row => {
                            return (
                                <View style={{ ...styles.columns, maxHeight: 45 }} key={row[0]}>
                                    {row.slice(1).map(hex => {
                                        return (
                                            <Bubble
                                                color={hex}
                                                key={hex}
                                                selected={this.props.color === hex}
                                                onPress={() => this.props.onPress(hex)}
                                            />
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                    <View style={{ ...styles.columns, maxHeight: 45 }}>
                        {colorLabels.map(hex => {
                            return (
                                <Bubble
                                    color={hex}
                                    key={hex}
                                    onPress={() => this.setState({ category: colorLabels.indexOf(hex) })}
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