import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import ModalBase from './base';

import { ReduxPropType } from '../../types/redux';

interface DataProps {
    onClose: () => void,
    onConfirm: (obj: any) => void,
    open: boolean,
}

class Modal extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <ModalBase onClose={this.props.onClose} open={this.props.open}>

            </ModalBase>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Modal);
