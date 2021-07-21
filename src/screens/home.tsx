import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/home';
import SubHeader from '../components/headers/sub';
import GoalModal from '../components/modals/goal';
import InputModal from '../components/modals/input';

import { ScreenStyles } from './styles';

import { defaultData } from '../data/default';
import { GoalConfigType } from '../types/data';
import { store } from '../redux/store';
import { setGoal } from '../redux/action';
import { ScreenProps } from '../types/ui';
import { ReduxPropType } from '../types/redux';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        gmOpen: false,
        imOpen: false,
    }

    onConfirmGoal = (config: GoalConfigType) => {
        if (config.type.key === 'goalN')
            config.max = 0;

        store.dispatch(setGoal(config));
        this.setState({ gmOpen: false });
    }

    render() {
        return (
            <>
                <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                    <Header
                        navigation={this.props.navigation}
                        onPressGoal={() => this.setState({ gmOpen: true })}
                        onPressSync={() => { }}
                    />
                </View>
                <GoalModal
                    onClose={() => this.setState({ gmOpen: false })}
                    onConfirm={this.onConfirmGoal}
                    open={this.state.gmOpen}
                    config={(this.props.data || defaultData)?.stats.goal.config}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    data: state.data,
    display: state.display,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
