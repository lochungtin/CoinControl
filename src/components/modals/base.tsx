import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import { GeneralModalStyles } from './styles';

import { ReduxPropType } from '../../types/redux';

interface DataProps {
    children: any,
    open: boolean,
    onClose: () => void,
}

class ModalBase extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <Modal
                animationIn='slideInUp'
                animationInTiming={500}
                backdropOpacity={this.props.settings.theme.dynamic.modal.shadow.alpha}
                backdropColor={this.props.settings.theme.dynamic.modal.shadow.color}
                isVisible={this.props.open}
                onBackdropPress={this.props.onClose}
                onBackButtonPress={this.props.onClose}
                propagateSwipe={true}
                swipeDirection='down'
            >
                <View style={GeneralModalStyles.basePositioning}>
                    <View style={{ ...GeneralModalStyles.topbar, backgroundColor: this.props.settings.theme.dynamic.screen.bgC }}>
                        <TouchableOpacity onPress={this.props.onClose} style={{ ...GeneralModalStyles.closeBtn, backgroundColor: this.props.settings.theme.dynamic.modal.closeBarC }} />
                    </View>
                    <View style={{ ...GeneralModalStyles.root, backgroundColor: this.props.settings.theme.dynamic.screen.bgC }}>
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(ModalBase);
