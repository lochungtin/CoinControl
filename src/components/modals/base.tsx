import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import { GeneralModalStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';

interface DataProps {
    children: any,
    open: boolean,
    onClose: () => void,
    onOpen?: () => void,
}

class ModalBase extends React.Component<ReduxThemeType & DataProps> {
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
                onModalWillShow={this.props.onOpen}
                propagateSwipe={true}
                swipeDirection='down'
            >
                <View style={GeneralModalStyles.basePositioning}>
                    <View style={{ ...GeneralModalStyles.topbar, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                        <TouchableOpacity onPress={this.props.onClose} style={{ ...GeneralModalStyles.closeBtn, backgroundColor: this.props.theme.dynamic.modal.closeBarC }} />
                    </View>
                    <View style={{ ...GeneralModalStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(ModalBase);
