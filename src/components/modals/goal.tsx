import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Numpad from '../numpad';
import DatePicker from '../pickers/date';
import MultiPicker from '../pickers/multi';
import ModalBase from './base';
import Selector from './selector';

import { CategoryType } from '../../types/data';
import { ReduxPropType } from '../../types/redux';

interface DataProps {
    onClose: () => void,
    open: boolean,
}

class Modal extends React.Component<ReduxPropType & DataProps> {

    state = {
        goal: '', 
        msOpen: false,
    }

    onConfirm = (value: number) => {
        console.log({
            value,
        });
    }

    render() {
        return (
            <>
                <ModalBase onClose={this.props.onClose} open={this.props.open}>
                    <Selector
                        icon={'shield-check-outline'}
                        label='Goal'
                        onPress={() => this.setState({ msOpen: true })}
                        text={'Daily'}
                    />
                    <Numpad disableOps onConfirm={this.onConfirm} />
                </ModalBase>
                <MultiPicker
                    items={[]}
                    onClose={() => this.setState({ msOpen: false })}
                    onSelect={(category: CategoryType) => this.setState({ category, msOpen: false })}
                    open={this.state.msOpen}
                    render={(category: CategoryType) => {
                        return (
                            <View>

                            </View>
                        );
                    }}
                    selectedIndex={[{}].indexOf(this.state.goal)}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Modal);
