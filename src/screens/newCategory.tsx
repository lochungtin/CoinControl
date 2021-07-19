import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/headers/selector';
import SubHeader from '../components/headers/sub';

import { NewCatScreenStyles, ScreenStyles } from './styles';

import { icons } from '../data/icons';
import { Categories, CategoryType } from '../types/data';
import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { groupBy } from '../utils/array';
import { smallKeygen } from '../utils/keygen';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        category: this.props.route.params,
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header
                    backMode
                    name='new categories'
                    navigation={this.props.navigation}
                    onToggle={(category: Categories) => this.setState({ category })}
                    selected={this.state.category}
                />
                <SubHeader label='select an icon' />
                <ScrollView>
                    <View style={ScreenStyles.scrollView}>
                        {Object.keys(icons).map((group: string) => {
                            let grpIcons: Array<string> = icons[group];

                            return (
                                <View key={smallKeygen()}>
                                    <SubHeader highlight label={group} />
                                    {groupBy(grpIcons, 5).map((row: Array<string | null>) => {
                                        return (
                                            <View key={smallKeygen()} style={NewCatScreenStyles.row}>
                                                {row.map((elem: string | null) => {
                                                    if (elem === null)
                                                        return <View key={smallKeygen()} style={{ width: 50 }} />

                                                    return (
                                                        <TouchableOpacity key={smallKeygen()} onPress={() => { }}>
                                                            <Icon
                                                                color={this.props.theme.dynamic.text.mainC}
                                                                name={elem}
                                                                size={50}
                                                            />
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
