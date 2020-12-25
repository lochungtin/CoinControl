import React from 'react';
import { View } from 'react-native'
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Bubble from './Bubble';

import ExpandButton from './ExpandButton';
import { customModalStyles, styles } from '../styles';

class TimePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    close = () => {
        this.props.close();
    }

    style = styleName => {
        return customModalStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];
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
                <View style={{ ...this.style('root'), height: 350 }}>
                    <ExpandButton onPress={this.close} />
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TimePicker);