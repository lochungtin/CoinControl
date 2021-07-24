import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import { GeneralPickerStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';

interface DataProps {
    children: any,
    open: boolean,
    onClose: () => void,
}

class PickerBase extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <Modal
                animationIn='slideInUp'
                animationInTiming={500}
                backdropOpacity={this.props.theme.dynamic.modal.shadow.alpha}
                backdropColor={this.props.theme.dynamic.modal.shadow.color}
                isVisible={this.props.open}
                onBackdropPress={this.props.onClose}
                onBackButtonPress={this.props.onClose}
                onSwipeComplete={this.props.onClose}
                propagateSwipe={true}
                swipeDirection='down'
            >
                <View style={GeneralPickerStyles.basePositioning}>
                    {this.props.children}
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(PickerBase);
