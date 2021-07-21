import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Numpad from '../numpad';
import MultiPicker from '../pickers/multi';
import ModalBase from './base';
import Selector from './selector';

import { GoalConfigType, GoalType } from '../../types/data';
import { ReduxPropType } from '../../types/redux';
import { goals } from '../../data/goal';
import { GoalModalStyles } from './styles';

interface DataProps {
    config: GoalConfigType,
    onClose: () => void,
    onConfirm: (config: GoalConfigType) => void,
    open: boolean,
}

class Modal extends React.Component<ReduxPropType & DataProps & DataProps> {

    state = {
        goal: this.props.config.type,
        msOpen: false,
    }

    render() {
        let goalList: Array<GoalType> = Object.keys(goals).map((key: string) => goals[key]);
        return (
            <>
                <ModalBase
                    onClose={this.props.onClose}
                    onOpen={() => this.setState({ goal: this.props.config.type })}
                    open={this.props.open}
                >
                    <Selector
                        icon={'shield-check-outline'}
                        label='Goal'
                        onPress={() => this.setState({ msOpen: true })}
                        text={this.state.goal.name}
                    />
                    <Numpad
                        disableOps
                        onConfirm={(max: number) => this.props.onConfirm({ max, type: this.state.goal, })}
                        value={this.props.config.max}
                    />
                </ModalBase>
                <MultiPicker
                    items={goalList}
                    onClose={() => this.setState({ msOpen: false })}
                    onSelect={(goal: GoalType) => this.setState({ goal, msOpen: false })}
                    open={this.state.msOpen}
                    render={(goal: GoalType) => {
                        return (
                            <View style={GoalModalStyles.selectionRoot}>
                                <Icon
                                    color={this.props.theme.static.accentC}
                                    name={`shield-${goal.key === 'goalN' ? 'off-' : ''}outline`}
                                    size={25}
                                />
                                <Text style={{ ...GoalModalStyles.selectionText, color: this.props.theme.dynamic.text.mainC }}>
                                    {goal.name}
                                </Text>
                            </View>
                        );
                    }}
                    selectedIndices={[Object.keys(goals).indexOf(this.state.goal.key)]}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Modal);
