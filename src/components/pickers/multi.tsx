import React, { ReactElement } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import BaseModal from './base';

import { GeneralModalStyles } from '../modals/styles';
import { MultiPickerStyles } from './styles';

import { ReduxPropType } from '../../types/redux';
import { smallKeygen } from '../../utils/keygen';

interface DataProps {
    items: Array<any>,
    onClose: () => void,
    onSelect: (obj: any) => void,
    open: boolean,
    render: (obj: any) => ReactElement,
    selectedIndices: Array<number>,
}

class Picker extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <BaseModal open={this.props.open} onClose={this.props.onClose}>
                <View style={{ ...MultiPickerStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                    <TouchableOpacity onPress={this.props.onClose} style={{ ...GeneralModalStyles.closeBtn, backgroundColor: this.props.theme.dynamic.modal.closeBarC }} />
                    <ScrollView style={MultiPickerStyles.scrollview}>
                        {this.props.items.map((obj: any, index: number) => {
                            return (
                                <TouchableOpacity
                                    key={smallKeygen()}
                                    onPress={() => this.props.onSelect(obj)}
                                    style={{
                                        ...MultiPickerStyles.itemContainer,
                                        ...(this.props.selectedIndices.includes(index) ? {
                                            borderColor: this.props.theme.static.accentC,
                                            borderWidth: 2,
                                        } : {}),
                                    }}
                                >
                                    {this.props.render(obj)}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Picker);
