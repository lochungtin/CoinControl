import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/home';
import SubHeader from '../components/headers/sub';
import InputModal from '../components/modals/input';

import { ScreenStyles } from './styles';

import { defaultData } from '../data/default';
import { ScreenProps } from '../types/ui';
import { ReduxPropType } from '../types/redux';
import category from '../components/modals/category';
import { CategoryType } from '../types/data';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        imOpen: false,
    }

    render() {
        return (
            <>
                <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                    <Header
                        navigation={this.props.navigation}
                        onFilterDate={(date: string) => console.log(date)}
                        onFilterCategory={(category: CategoryType) => console.log(category)}
                        onPressSync={() => { }}
                    />
                </View>
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
