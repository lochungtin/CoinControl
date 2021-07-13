import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ReduxPropType } from '../types/redux';

import PromptModal from '../components/modals/prompt';
import { Prompt } from '../data/prompts';

class AppNav extends React.Component<ReduxPropType> {

    render() {
        return (
            <View style={{backgroundColor: this.props.settings.theme.dynamic.screen.bgC, flex: 1,}}>
                <PromptModal
                    onClose={() => {}}
                    onConfirm={() => {}}
                    open={true}
                    prompt={Prompt.CLEAR_DATA}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
