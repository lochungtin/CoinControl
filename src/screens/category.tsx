import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/selector';

import { ScreenStyles } from './styles';

import { Categories } from '../types/data';
import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/ui';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        category: Categories.EXPENSE,
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header
                    name='categories'
                    navigation={this.props.navigation}
                    onPressRight={() => this.props.navigation.navigate('newCategory')}
                    onToggle={(category: Categories) => this.setState({ category })}
                    right='pen'
                    selected={this.state.category}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
