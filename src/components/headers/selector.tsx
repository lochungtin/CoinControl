import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Selector from '../selector';

import { GeneralHeaderStyles, SelectorHeaderStyles } from './styles';

import { Categories } from '../../types/data';
import { ReduxPropType } from '../../types/redux';
import { ScreenProps } from '../../types/ui';

interface DataProps {
    backMode?: boolean,
    name: string,
    onPressRight?: () => void,
    onToggle: (category: Categories) => void,
    right?: string,
    selected: Categories,
}

class Header extends React.Component<ReduxPropType & ScreenProps & DataProps> {

    onPress = () => {
        if (this.props.backMode)
            this.props.navigation.goBack();
        else
            this.props.navigation.toggleDrawer();
    }

    render() {
        return (
            <View style={{ ...GeneralHeaderStyles.root, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                <StatusBar backgroundColor={this.props.theme.dynamic.screen.secondaryBgC} />
                <View style={GeneralHeaderStyles.contentPositioner}>
                    <TouchableOpacity onPress={this.onPress}>
                        <Icon
                            color={this.props.theme.static.icon.drawerC}
                            name={this.props.backMode ? 'chevron-left' : 'menu-open'}
                            size={40}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...GeneralHeaderStyles.label, color: this.props.theme.dynamic.text.labelC }}>
                        {this.props.name.toUpperCase()}
                    </Text>
                    <TouchableOpacity onPress={this.props.onPressRight}>
                        <View style={SelectorHeaderStyles.rightPositioner}>
                            <Icon
                                color={this.props.right ? this.props.theme.static.accentC : 'transparent'}
                                name={this.props.right || 'blank'}
                                size={30}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 10 }} />
                <Selector
                    onToggle={this.props.onToggle}
                    selected={this.props.selected}
                    width={0.9}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
